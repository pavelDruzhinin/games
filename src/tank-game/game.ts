import { Tank } from "./tank/tank";
import { TankAmunnition } from "./tank/ammunition";
import { BaseDrawObject, MathLib, Colors, Game, ClashPhysicEvent, StrikingDistancePhysicEvent } from "./game-framework";
import { Enemy } from "./enemies/enemy";

export class RechargeTankTower {
    startRifflePosition: number;
    endRifflePosition: any;
    _step: any;

    constructor(endRifflePosition: any, step: any) {
        this.startRifflePosition = 0;
        this.endRifflePosition = endRifflePosition;
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
    public positionX: number;
    public positionY: number;
    private _radius: number;
    private _ghostColor: string;
    private _speedLevel: any;

    constructor(startPositionX: number, startPositionY: number, speedLevel: any) {
        super();

        this.positionX = startPositionX;
        this.positionY = startPositionY;

        this._radius = 10;

        this._ghostColor = Colors.getRandomColor();
        this._speedLevel = speedLevel;
    }

    get height() { return this._radius * 2; }
    get width() { return this._radius * 2; }

    draw(ctx: any, deviceRatio: any) {
        ctx.fillStyle = this._ghostColor;
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this._radius * deviceRatio, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = Colors.black;

        this.move(deviceRatio);
    }

    move(deviceRatio: any) {
        //this.positionX -= MathLib.getRandomInt(2);
        this.positionY += MathLib.getRandomInt(2) * this._speedLevel * deviceRatio;
    }
}

class TankPanelAmmunition {
    private _panel: any;
    constructor(ammunition: any) {
        this._panel = document.getElementsByClassName('tank-ammunition-panel-inner')[0];
        this.init(ammunition);

        ammunition.onchange(this.change);
    }

    init(ammunition: any) {
        var sections = [];
        for (var shells of ammunition._ammunitions) {
            var section = this.drawPanelSection(shells[0], shells[1]);
            sections.push(section);
        }

        this._panel.innerHTML = sections.join('');
    }

    change(key: any, value: any) {
        document.getElementById(key).innerText = value;
    }

    drawPanelSection(key: any, value: any) {
        return '<div class="form-group">' +
            `<label>${key}</label>` +
            `<span id="${key}">${value}</span>` +
            '</div>';
    }
}

class TankGame {
    public enemyCount: any;
    public enemySpeedLevel: any;
    tankPanelAmmunition: TankPanelAmmunition;
    game: Game;
    constructor(enemyCount: any, enemySpeedLevel: any) {
        this.enemyCount = enemyCount;
        this.enemySpeedLevel = enemySpeedLevel;
    }

    get sceneWidth() { return 800; }
    get sceneHeight() { return window.innerHeight; }

    start() {
        var game = new Game("scene", this.sceneWidth, this.sceneHeight);
        var tank = new Tank(game.scene.width / 2, game.scene.height - 50 * game.scene.devicePixelRatio, 10);
        var client = new NakamaClient();

        var startTankAmmunition = new TankAmunnition();
        startTankAmmunition.bullets = 20;
        startTankAmmunition.shrapnels = 30;

        tank.addAmunnition(startTankAmmunition);

        this.tankPanelAmmunition = new TankPanelAmmunition(tank._ammunition);

        // var ghosts = this.generateGhosts(this._enemyCount, this._enemySpeedLevel, game.scene.width);
        var enemies = this.generateEnemies(this.enemyCount, this.enemySpeedLevel, game.scene.width);

        var keyboardsEvents = {
            'ArrowUp': () => tank.move('up'),
            'ArrowDown': () => tank.move('down'),
            'ArrowRight': () => tank.move('right'),
            'ArrowLeft': () => tank.move('left'),
            'Space': () => tankFire(),
            'KeyC': () => tank.changeTower()
        };

        game.scene.addDrawObjects(enemies);
        game.scene.addDrawObject(tank);
        game.registerKeyBoardEvents(keyboardsEvents);
        game.run();

        function tankFire() {
            var bullets = tank.fire();
            for (var bullet of bullets) {
                game.scene.addDrawObject(bullet);
                var animation = typeof bullet.createStrikeAnimation == 'function' ? bullet.createStrikeAnimation() : null;
                let event = new ClashPhysicEvent(bullet, enemies, animation);
                game.scene.addPhysicEvent(event);

                if (bullet.strikingDistance && animation) {
                    let event = new StrikingDistancePhysicEvent(bullet, bullet.positionY, bullet.strikingDistance, animation);
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

    generateGhosts(enemyCount: any, enemySpeedLevel: any, sceneWidth: any) {
        var ghostArray = [];
        for (var i = 0; i < enemyCount; i++) {
            let randomX = Math.random();
            if (!randomX)
                randomX = 2;

            ghostArray.push(new Ghost(sceneWidth * randomX, 0, enemySpeedLevel));
        }
        return ghostArray;
    }

    generateEnemies(enemyCount: any, enemySpeedLevel: any, sceneWidth: any) {
        var enemies = [];
        for (var i = 0; i < enemyCount; i++) {
            let randomX = Math.random();
            if (!randomX)
                randomX = 2;

            enemies.push(new Enemy(sceneWidth * randomX, 0, enemySpeedLevel));
        }
        return enemies;
    }
}

var tankGame = new TankGame(1, 1);

tankGame.start();

document.getElementById('startNewGame')
    .addEventListener('click', function (event) {
        tankGame.enemyCount = getIntValueFromInput('enemyCount', 1);
        tankGame.enemySpeedLevel = getIntValueFromInput('enemySpeedLevel', 1);
        tankGame.restart();
        window.focus();

        // Remove focus from any focused element
        if (document.activeElement) {
            (<HTMLElement>document.activeElement).blur();
        }
    });



function getIntValueFromInput(inputId: any, defaultValue: any) {
    var value = (<HTMLInputElement>document.getElementById(inputId)).value;
    var intValue = parseInt(value);
    return isNaN(intValue) ? defaultValue : intValue;
}

//old
// class Wall extends BaseDrawObject {

//     constructor(positionX: any, positionY: any, side: any) {
//         super();

//         this.positionX = positionX;
//         this.positionY = positionY;
//         this._side = side;
//     }

//     draw(ctx) {
//         switch (this._side) {
//             case 'right':
//                 ctx.fillRect(this.positionX, this.positionY, 1, 20);
//                 break;
//             case 'left':
//                 ctx.fillRect(this.positionX, this.positionY, 20, 1);
//                 break;
//             default:
//                 break;
//         }
//     }
// }

// function generateWalls() {
//     var wallSize = 40;
//     var wallsCount = sceneWidth / wallSize;
//     var wallsArray = [];
//     for (var i = 0; i < wallsCount; i++) {
//         for (var j = 0; j < wallsCount; j++) {
//             var rightWall = new Wall(wallSize * i, wallSize * j, 'right');
//             var leftWall = new Wall(wallSize * i, wallSize * j, 'left');

//             wallsArray.push(rightWall);
//             wallsArray.push(leftWall);
//         }
//     }

//     return wallsArray;
// }