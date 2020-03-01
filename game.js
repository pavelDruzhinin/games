class TankTower {
    constructor(positionX, positionY) {
        this.setPosition(positionX, positionY);
    }

    draw(ctx) { }

    fire() { }

    setPosition(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
    }
}

class RechargeTankTower {
    constructor(endRifflePosition, step) {
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

    start(devicePixelRatio) {
        this.startRifflePosition = this.endRifflePosition * devicePixelRatio;
    }
}

class SimpleTankTower extends TankTower {
    constructor(positionX, positionY) {
        super(positionX, positionY);

        this._towerImage = new GameImage("/assets/img/tank tower.png");
        this._towerRiffleImage = new GameImage("/assets/img/tank riffle.png");

        this._recharge = new RechargeTankTower(6, 1);
    }

    draw(ctx, deviceRatio) {
        this._recharge.process();
        //ctx.imageSmoothingEnabled = false;
        this.deviceRatio = deviceRatio;
        ctx.drawImage(this._towerRiffleImage,
            this.positionX,
            (this.positionY - 45 * deviceRatio + this._recharge.startRifflePosition),
            3 * deviceRatio,
            30 * deviceRatio);
        ctx.drawImage(this._towerImage,
            (this.positionX - 14 * deviceRatio),
            (this.positionY - 15 * deviceRatio),
            30 * deviceRatio,
            30 * deviceRatio);
    }

    fire(ammunition) {
        if (this._recharge.inProccess)
            return [];

        if (!ammunition.shrapnels)
            return;

        this._recharge.start(this.deviceRatio);

        return [new Shrapnel((this.positionX), (this.positionY - 50 * this.deviceRatio))];
    }
}

class DoubleBarreledTankTower extends TankTower {
    constructor(positionX, positionY) {
        super(positionX, positionY);

        this._towerImage = new GameImage("/assets/img/tank tower.png");
        this._towerRiffleImage = new GameImage("/assets/img/tank riffle.png");

        this._recharge = new RechargeTankTower(4, 0.5);

        this.rifle1Position = 7;
        this.rifle2Position = -5;
        this._correctPositionY = -28;
    }

    draw(ctx, deviceRatio) {
        this._recharge.process();
        this.deviceRatio = deviceRatio;

        this._drawRifle(ctx, this.rifle1Position, deviceRatio);
        this._drawRifle(ctx, this.rifle2Position, deviceRatio);
        this._drawTower(ctx, deviceRatio);
    }

    _drawTower(ctx, deviceRatio) {
        ctx.drawImage(this._towerImage,
            this.positionX - 14 * deviceRatio,
            this.positionY - 15 * deviceRatio,
            30 * deviceRatio,
            30 * deviceRatio);
    }

    _drawRifle(ctx, x, deviceRatio) {
        ctx.drawImage(this._towerRiffleImage,
            this.positionX - x * deviceRatio,
            this.positionY + this._recharge.startRifflePosition + this._correctPositionY * deviceRatio,
            3 * deviceRatio,
            15 * deviceRatio);
    }

    fire() {
        if (this._recharge.inProccess)
            return [];

        this._recharge.start(this.deviceRatio);

        return [
            new Bullet(this.positionX - this.rifle1Position * this.deviceRatio + 1 * this.deviceRatio,
                this.positionY + this._correctPositionY * this.deviceRatio),
            new Bullet(this.positionX - this.rifle2Position * this.deviceRatio + 1 * this.deviceRatio,
                this.positionY + this._correctPositionY * this.deviceRatio)
        ];
    }
}

class Ghost extends BaseDrawObject {
    constructor(startPositionX, startPositionY, speedLevel) {
        super();

        this.positionX = startPositionX;
        this.positionY = startPositionY;

        this._radius = 10;

        this._ghostColor = Colors.getRandomColor();
        this._speedLevel = speedLevel;
    }

    get height() { return this._radius * 2; }
    get width() { return this._radius * 2; }

    draw(ctx, deviceRatio) {
        ctx.fillStyle = this._ghostColor;
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this._radius * deviceRatio, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = Colors.black;

        this.move(deviceRatio);
    }

    move(deviceRatio) {
        //this.positionX -= MathLib.getRandomInt(2);
        this.positionY += MathLib.getRandomInt(2) * this._speedLevel * deviceRatio;
    }
}

class TankPanelAmmunition {
    constructor(ammunition) {
        this._panel = document.getElementsByClassName('tank-ammunition-panel-inner')[0];
        this.init(ammunition);

        ammunition.onchange(this.change);
    }

    init(ammunition) {
        var sections = [];
        for (var shells of ammunition._ammunitions) {
            var section = this.drawPanelSection(shells[0], shells[1]);
            sections.push(section);
        }

        this._panel.innerHTML = sections.join('');
    }

    change(key, value) {
        document.getElementById(key).innerText = value;
    }

    drawPanelSection(key, value) {
        return '<div class="form-group">' +
            `<label>${key}</label>` +
            `<span id="${key}">${value}</span>` +
            '</div>';
    }
}

class TankGame {
    constructor(enemyCount, enemySpeedLevel) {
        this._enemyCount = enemyCount;
        this._enemySpeedLevel = enemySpeedLevel;
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

        this.tankPanelAmmunition = new TankPanelAmmunition(tank._ammunition);

        // var ghosts = this.generateGhosts(this._enemyCount, this._enemySpeedLevel, game.scene.width);
        var enemies = this.generateEnemies(this._enemyCount, this._enemySpeedLevel, game.scene.width);

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

    generateGhosts(enemyCount, enemySpeedLevel, sceneWidth) {
        var ghostArray = [];
        for (var i = 0; i < enemyCount; i++) {
            let randomX = Math.random();
            if (!randomX)
                randomX = 2;

            ghostArray.push(new Ghost(sceneWidth * randomX, 0, enemySpeedLevel));
        }
        return ghostArray;
    }

    generateEnemies(enemyCount, enemySpeedLevel, sceneWidth) {
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
            document.activeElement.blur();
        }
    });



function getIntValueFromInput(inputId, defaultValue) {
    var value = document.getElementById(inputId).value;
    var intValue = parseInt(value);
    return isNaN(intValue) ? defaultValue : intValue;
}

//old
class Wall extends BaseDrawObject {
    constructor(positionX, positionY, side) {
        super();

        this.positionX = positionX;
        this.positionY = positionY;
        this._side = side;
    }

    draw(ctx) {
        switch (this._side) {
            case 'right':
                ctx.fillRect(this.positionX, this.positionY, 1, 20);
                break;
            case 'left':
                ctx.fillRect(this.positionX, this.positionY, 20, 1);
                break;
            default:
                break;
        }
    }
}

function generateWalls() {
    var wallSize = 40;
    var wallsCount = sceneWidth / wallSize;
    var wallsArray = [];
    for (var i = 0; i < wallsCount; i++) {
        for (var j = 0; j < wallsCount; j++) {
            var rightWall = new Wall(wallSize * i, wallSize * j, 'right');
            var leftWall = new Wall(wallSize * i, wallSize * j, 'left');

            wallsArray.push(rightWall);
            wallsArray.push(leftWall);
        }
    }

    return wallsArray;
}