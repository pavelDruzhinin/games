class Bullet extends BaseDrawObject {
    constructor(startPositionX, startPositionY) {
        super();

        this.positionX = startPositionX;
        this.positionY = startPositionY;

        this._radius = 3;
        this.width = this._radius * 2;
        this.height = this._radius * 2;
        this._speed = 20;
    }

    draw(ctx) {
        ctx.fillStyle = Colors.red;

        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this._radius, 0, 2 * Math.PI);
        ctx.fill();
        this.move();
    }

    move() {
        this.positionY -= this._speed;
    }
}

class Tank extends BaseDrawObject {
    _currentDirection = 'up';
    _bumberHeight = 40;
    _bumberWidth = 30;

    constructor(startPositionX, startPositionY, speed) {
        super();

        this.positionX = startPositionX;
        this.positionY = startPositionY;
        this.speed = speed;
    }

    move(direction) {
        if (this._currentDirection != direction) {
            this._turn(direction);
            return;
        }

        switch (direction) {
            case 'up':
                this.positionY -= this.speed;
                break;
            case 'right':
                this.positionX += this.speed;
                break;
            case 'left':
                this.positionX -= this.speed;
                break;
            case 'down':
                this.positionY += this.speed;
                break;
        }
    }

    _turn(direction) {
        var directions = ['up', 'right', 'down', 'left'];

        var whereDirectionIndex = directions.indexOf(direction);

        if (whereDirectionIndex == -1)
            return;

        var currentDirectionIndex = directions.indexOf(this._currentDirection);

        if (whereDirectionIndex > currentDirectionIndex) {
            currentDirectionIndex++;
            if (currentDirectionIndex > directions.length)
                currentDirectionIndex = 0;

            this._turnBumper();
        } else {
            currentDirectionIndex--;
            if (currentDirectionIndex < 0)
                currentDirectionIndex = directions.length;

            this._turnBumper(true);
        }

        this._currentDirection = directions[currentDirectionIndex];
    }

    _turnBumper(isLeft) {
        var angle = isLeft ? -90 : 90;

        var newPoint = MathLib.getTurnDot(this._bumberWidth, this._bumberHeight, angle);

        this._bumberWidth = newPoint.x;
        this._bumberHeight = newPoint.y;
    }

    fire() {
        return new Bullet(this.positionX, this.positionY - 20);
    }

    draw(ctx) {
        this._drawBumper(ctx);
        this._drawTower(ctx);
        this._drawRifle(ctx);
    }

    _drawBumper(ctx) {
        ctx.fillStyle = Colors.violet;
        ctx.fillRect(this.positionX - this._bumberWidth / 2,
            this.positionY - this._bumberHeight / 2,
            this._bumberWidth,
            this._bumberHeight);
    }

    _drawTower(ctx) {
        ctx.fillStyle = Colors.red;

        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, 10, 0, 2 * Math.PI);
        ctx.fill();
    }

    _drawRifle(ctx) {
        ctx.fillStyle = Colors.black;
        ctx.fillRect(this.positionX - 1, this.positionY - 21, 3, 12);
    }
}

class Ghost extends BaseDrawObject {
    constructor(startPositionX, startPositionY, speedLevel) {
        super();

        this.positionX = startPositionX;
        this.positionY = startPositionY;
        this._radius = 10;
        this.height = this._radius * 2;
        this.width = this._radius * 2;

        this._ghostColor = Colors.getRandomColor();
        this.speedLevel = speedLevel;
    }

    draw(ctx) {
        ctx.fillStyle = this._ghostColor;
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this._radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = Colors.black;

        this.move();
    }

    move() {
        //this.positionX -= MathLib.getRandomInt(2);
        this.positionY += MathLib.getRandomInt(2) * this.speedLevel;
    }
}

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

class TankGame {
    constructor(ghostCount, ghostSpeedLevel) {
        this.sceneWidth = 800;
        this.sceneHeight = window.innerHeight;
        this.ghostCount = ghostCount;
        this.ghostSpeedLevel = ghostSpeedLevel;
    }

    start() {
        var game = new Game("scene", this.sceneWidth, this.sceneHeight);
        var tank = new Tank(this.sceneWidth / 2, this.sceneHeight - 50, 10);
        var ghosts = this.generateGhosts(this.ghostCount);

        game.scene.addDrawObjects(ghosts);
        game.scene.addDrawObject(tank);

        game.run();

        function tankFire() {
            console.log('fire');
            var bullet = tank.fire();
            game.scene.addDrawObject(bullet);
            var event = new ClashPhysicEvent(bullet, ghosts);
            game.scene.addPhysicEvent(event);
        }

        document.addEventListener('keydown', function (event) {

            switch (event.code) {
                case 'ArrowUp':
                    tank.move('up');
                    break;
                case 'ArrowDown':
                    tank.move('down');
                    break;
                case 'ArrowRight':
                    tank.move('right');
                    break;
                case 'ArrowLeft':
                    tank.move('left');
                    break;
                case 'Space':
                    tankFire();
                    break;
                default:
                    break;
            }
        });

        this.game = game;
    }

    restart() {
        this.game.destroy();
        this.start();
    }

    generateGhosts(ghostCount) {
        var ghostArray = [];
        for (var i = 0; i < ghostCount; i++) {
            let randomX = Math.random();
            if (!randomX)
                randomX = 2;

            ghostArray.push(new Ghost(this.sceneWidth * randomX, 0, this.ghostSpeedLevel));
        }
        return ghostArray;
    }
}

var tankGame = new TankGame(10, 1);

tankGame.start();

document.getElementById('startNewGame').addEventListener('click', function (event) {
    tankGame.ghostCount = getIntValueFromInput('ghostCount', 10);
    tankGame.ghostSpeedLevel = getIntValueFromInput('ghostSpeedLevel', 1);
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