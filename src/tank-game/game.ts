import { Tank } from "./tank/tank";
import { TankDirections } from "./tank/tank-directions";
import { TankAmunnition } from "./tank/ammunition";
import { BaseDrawObject, MathLib, Colors, Game, ClashPhysicEvent, StrikingDistancePhysicEvent } from "./game-framework";
import { Enemy } from "./enemies/enemy";
// import NakamaClient from "./realtime-server/nakamaClient";
import { Shrapnel } from "./bullets/shrapnel";
import { List } from "../common/list";
import Client from "./realtime-server/client";
import MatchesComponent from "./components/MatchesComponent";

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

class TankGame {
    tankPanelAmmunition: TankPanelAmmunition;
    game: Game;
    matchId: string;
    constructor(public enemyCount: number, public enemySpeedLevel: number) {
    }

    get sceneWidth() { return 800; }
    get sceneHeight() { return window.innerHeight; }

    start() {
        var game = new Game("scene", this.sceneWidth, this.sceneHeight);
        var tank = new Tank(game.scene.width / 2, game.scene.height - 50 * game.scene.devicePixelRatio, 10);

        var startTankAmmunition = new TankAmunnition();
        startTankAmmunition.bullets = 20;
        startTankAmmunition.shrapnels = 30;

        tank.addAmunnition(startTankAmmunition);

        this.tankPanelAmmunition = new TankPanelAmmunition(tank.ammunition);

        // var ghosts = this.generateGhosts(this._enemyCount, this._enemySpeedLevel, game.scene.width);
        const enemies = this.generateEnemies(this.enemyCount, this.enemySpeedLevel, game.scene.width);

        const keyboardsEvents = new Map<string, Function>([
            ['ArrowUp', () => tank.move(TankDirections.Up)],
            ['ArrowDown', () => tank.move(TankDirections.Down)],
            ['ArrowRight', () => tank.move(TankDirections.Right)],
            ['ArrowLeft', () => tank.move(TankDirections.Left)],
            ['Space', () => tankFire()],
            ['KeyC', () => tank.changeTower()]
        ]);

        game.scene.addDrawObjects(enemies);
        game.scene.addDrawObject(tank);
        game.registerKeyBoardEvents(keyboardsEvents);
        game.run();

        function tankFire() {
            var bullets = tank.fire();
            for (var bullet of bullets) {
                game.scene.addDrawObject(bullet);

                const shrapnel: Shrapnel = <Shrapnel>bullet;
                const animation = typeof shrapnel.createStrikeAnimation == 'function' ? shrapnel.createStrikeAnimation() : null;

                let event = new ClashPhysicEvent(bullet, enemies, animation);
                game.scene.addPhysicEvent(event);

                if (shrapnel.strikingDistance && animation) {
                    let event = new StrikingDistancePhysicEvent(bullet, bullet.positionY, shrapnel.strikingDistance, animation);
                    game.scene.addPhysicEvent(event);
                }
            }
        }

        this.game = game;
    }

    restart() {
        this.game.destroy();
        this.start();
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
}

var tankGame = new TankGame(1, 1);
var matches = new MatchesComponent('matches', []);
var client = new Client();
client.addUser();

client.getMatches().then((response: any) => {
    matches.update(response.data);
});

tankGame.start();

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