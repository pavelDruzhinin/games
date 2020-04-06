import { Tank } from "./tank/tank";
import { TankDirections } from "./tank/tank-directions";
import { TankAmunnition } from "./tank/ammunition";
import { BaseDrawObject, MathLib, Colors, Game, ClashPhysicEvent, StrikingDistancePhysicEvent, GameStorage } from "./game-framework";
import { Enemy } from "./enemies/enemy";
// import NakamaClient from "./realtime-server/nakamaClient";
import { Shrapnel } from "./bullets/shrapnel";
import { List } from "../common/list";
import Client from "./realtime-server/client";
import MatchesComponent from "./components/MatchesComponent";
import { GameEventType, GameData } from "./realtime-server/GameData";

export class RechargeTankTower {
    startRifflePosition = 0;
    private _step: number;

    constructor(public endRifflePosition: number, step: number) {
        this._step = step;
    }

    get inProccess() { return this.startRifflePosition > 0; }

    process() {
        if (this.inProccess) {
            this.startRifflePosition -= this._step;
        }
    }

    start(devicePixelRatio: number) {
        this.startRifflePosition = this.endRifflePosition * devicePixelRatio;
    }
}

class Ghost extends BaseDrawObject {
    positionX: number;
    positionY: number;
    private _radius: number;
    private _ghostColor: string;
    private _speedLevel: number;

    constructor(startPositionX: number, startPositionY: number, speedLevel: number) {
        super();

        this.positionX = startPositionX;
        this.positionY = startPositionY;

        this._radius = 10;

        this._ghostColor = Colors.getRandomColor();
        this._speedLevel = speedLevel;
    }

    get height() { return this._radius * 2; }
    get width() { return this._radius * 2; }

    draw(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        ctx.fillStyle = this._ghostColor;
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this._radius * deviceRatio, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = Colors.black;

        this.move(deviceRatio);
    }

    move(deviceRatio: number) {
        this.positionY += MathLib.getRandomInt(2) * this._speedLevel * deviceRatio;
    }
}

class TankPanelAmmunition {
    private _panel: Element;
    constructor(ammunition: TankAmunnition) {
        this._panel = document.getElementsByClassName('tank-ammunition-panel-inner')[0];
        this.init(ammunition);

        ammunition.onchange(this.change);
    }

    init(ammunition: TankAmunnition) {
        var sections = [];
        for (var shells of ammunition.ammunitions) {
            var section = this.drawPanelSection(shells[0], shells[1]);
            sections.push(section);
        }

        this._panel.innerHTML = sections.join('');
    }

    change(key: string, value: number) {
        document.getElementById(key).innerText = value.toString();
    }

    drawPanelSection(key: string, value: number) {
        return '<div class="form-group">' +
            `<label>${key}</label>` +
            `<span id="${key}">${value}</span>` +
            '</div>';
    }
}

class MatchState {
    players: any;
}

class TankGame {
    tankPanelAmmunition: TankPanelAmmunition;
    game: Game;
    matchId: string;
    private _enemies: List<Tank> = new List<Tank>();

    constructor(public enemyCount: number, public enemySpeedLevel: number) {
    }

    get sceneWidth() { return 800; }
    get sceneHeight() { return window.innerHeight; }

    start(state?: MatchState) {
        let game = new Game("scene", this.sceneWidth, this.sceneHeight);
        let position = state == null ? { positionX: game.scene.width / 2, positionY: game.scene.height - 50 * game.scene.devicePixelRatio } : state.players[GameStorage.instance.userId].position;

        let tank = new Tank(position.positionX, position.positionY, 10);

        if (state != null)
            tank._currentDirection = position.direction;

        let startTankAmmunition = new TankAmunnition();
        startTankAmmunition.bullets = 20;
        startTankAmmunition.shrapnels = 30;

        tank.addAmunnition(startTankAmmunition);

        this.tankPanelAmmunition = new TankPanelAmmunition(tank.ammunition);

        // var ghosts = this.generateGhosts(this._enemyCount, this._enemySpeedLevel, game.scene.width);
        //const enemies = this.generateEnemies(this.enemyCount, this.enemySpeedLevel, game.scene.width);

        const keyboardsEvents = new Map<string, Function>([
            ['ArrowUp', () => tank.move(TankDirections.Up)],
            ['ArrowDown', () => tank.move(TankDirections.Down)],
            ['ArrowRight', () => tank.move(TankDirections.Right)],
            ['ArrowLeft', () => tank.move(TankDirections.Left)],
            ['Space', () => tankFire()],
            ['KeyC', () => tank.changeTower()]
        ]);

        if (state !== null) {
            Object.keys(state.players).forEach((key) => {
                if (key != GameStorage.instance.userId.toString()) {
                    const position = state.players[key].position;
                    this._addEnemyWithoutDraw(parseInt(key), position.positionX, position.positionY, position.direction);
                }
            });
        }

        game.scene.addDrawObjects(this._enemies);
        game.scene.addDrawObject(tank);
        game.registerKeyBoardEvents(keyboardsEvents);
        game.run();

        let selfEnemies = this._enemies;

        function tankFire() {
            var bullets = tank.fire();
            for (var bullet of bullets) {
                game.scene.addDrawObject(bullet);

                const shrapnel: Shrapnel = <Shrapnel>bullet;
                const animation = typeof shrapnel.createStrikeAnimation == 'function' ? shrapnel.createStrikeAnimation() : null;

                let event = new ClashPhysicEvent(bullet, selfEnemies, animation);
                game.scene.addPhysicEvent(event);

                if (shrapnel.strikingDistance && animation) {
                    let event = new StrikingDistancePhysicEvent(bullet, bullet.positionY, shrapnel.strikingDistance, animation);
                    game.scene.addPhysicEvent(event);
                }
            }
        }

        this.game = game;
    }

    restart(state?: MatchState) {
        this.game.destroy();
        this.start(state);
    }

    generateGhosts(enemyCount: number, enemySpeedLevel: number, sceneWidth: number) {
        let ghostArray = [];
        for (let i = 0; i < enemyCount; i++) {
            let randomX = Math.random();
            if (!randomX)
                randomX = 2;

            ghostArray.push(new Ghost(sceneWidth * randomX, 0, enemySpeedLevel));
        }
        return ghostArray;
    }

    generateEnemies(enemyCount: number, enemySpeedLevel: number, sceneWidth: number): List<any> {
        let enemies = new List<any>();
        for (let i = 0; i < enemyCount; i++) {
            let randomX = Math.random();
            if (!randomX)
                randomX = 2;

            enemies.push(new Enemy(sceneWidth * randomX, 0, enemySpeedLevel));
        }
        return enemies;
    }

    _addEnemyWithoutDraw(enemyId: number, startPositionX: number, startPositionY: number, direction: TankDirections) {
        let enemyTank = new Tank(startPositionX, startPositionY, 10);

        enemyTank._currentDirection = direction;
        enemyTank.userId = enemyId;

        this._enemies.push(enemyTank);
        return enemyTank;
    }

    addEnemy(enemyId: number, startPositionX: number, startPositionY: number, direction: TankDirections) {
        const enemyTank = this._addEnemyWithoutDraw(enemyId, startPositionX, startPositionY, direction);

        this.game.scene.addDrawObject(enemyTank);
    }

    changePositionEnemy(enemyId: number, positionX: number, positionY: number, direction: TankDirections) {
        const enemyTanks = this._enemies.filter(x => x.userId == enemyId);
        if (!enemyTanks || enemyTanks.length == 0)
            return;

        const enemyTank = enemyTanks[0];
        enemyTank.positionX = positionX;
        enemyTank.positionY = positionY;
        enemyTank._turn(direction);
    }
}

var tankGame = new TankGame(1, 1);

const client = Client.instance;

client.addUser();

client.addSocketListener(GameEventType.JoinPlayer, (gameData: GameData) => {
    if (gameData.userId == GameStorage.instance.userId)
        return;

    tankGame.addEnemy(gameData.userId, gameData.data.positionX, gameData.data.positionY, gameData.data.direction);
    console.log('addEnemy');
});

client.addSocketListener(GameEventType.ChangePosition, (gameData: GameData) => {
    if (gameData.userId == GameStorage.instance.userId)
        return;

    tankGame.changePositionEnemy(gameData.userId, gameData.data.positionX, gameData.data.positionY, gameData.data.direction);
    console.log('changePositionEnemy');
});

function joinMatch(matchId: number) {
    client.getMatchState(matchId).then((response: any) => {
        console.log('match state', matchId, response.data);
        if (tankGame.game == null) {
            tankGame.start(response.data);
            client.connectToWebSocket();
        } else {
            tankGame.restart(response.data);
        }

        window.focus();

        // Remove focus from any focused element
        if (document.activeElement) {
            (<HTMLElement>document.activeElement).blur();
        }
    });

    if (tankGame.game == null)
        return null;

    return { direction: TankDirections.Down, positionX: tankGame.game.scene.width / 2, positionY: 50 * tankGame.game.scene.devicePixelRatio };
};

var matches = new MatchesComponent('matches', [], joinMatch);

client.getMatches().then((response: any) => {
    matches.update(response.data);
});

if (GameStorage.instance.matchId > 0) {
    joinMatch(GameStorage.instance.matchId);
} else {
    tankGame.start();
}

document.getElementById('startNewGame')
    .addEventListener('click', function (event) {
        tankGame.enemyCount = getIntValueFromInput('enemyCount', 1);
        tankGame.enemySpeedLevel = getIntValueFromInput('enemySpeedLevel', 1);

        client.getMatches().then((response: any) => {
            matches.update(response.data);
        });

        tankGame.restart();
        window.focus();

        // Remove focus from any focused element
        if (document.activeElement) {
            (<HTMLElement>document.activeElement).blur();
        }
    });

document.getElementById('add-match')
    .addEventListener('click', (event) => {
        const matchName = getValueFromInput('match-name');

        client.addMatch(matchName).then((response: any) => {
            matches.add(response.data);
        });
    });

function getValueFromInput(inputId: string) {
    return (<HTMLInputElement>document.getElementById(inputId)).value;
}

function getIntValueFromInput(inputId: string, defaultValue: number) {
    var value = (<HTMLInputElement>document.getElementById(inputId)).value;
    var intValue = parseInt(value);
    return isNaN(intValue) ? defaultValue : intValue;
}