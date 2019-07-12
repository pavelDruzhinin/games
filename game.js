class Bullet extends BaseDrawObject {
    constructor(startPositionX, startPositionY) {
        super();

        this.positionX = startPositionX;
        this.positionY = startPositionY;

        this._radius = 3;
        this._speed = 20;
    }

    get width() { return this._radius * 2; }
    get height() { return this._radius * 2; }

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
        this._bumber = new ImageTankBumber(startPositionX, startPositionY);
        this._towers = [
            new ImageTankTower(startPositionX, startPositionY),
            new SimpleTankTower(startPositionX, startPositionY),
            new DoubleBarreledTankTower(startPositionX, startPositionY)
        ];
        this.tower = this._towers[0];
    }

    changeTower() {
        var tankTower = this._towers.filter((el) => el != this.tower)[0];
        tankTower.setPosition(this.positionX, this.positionY);

        this.tower = tankTower;
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

        var currentDirectionIndex = directions.indexOf(this._currentDirection);

        var currentDirectionScope = this.getCurrentDirectionScope(directions, currentDirectionIndex);
        console.log(currentDirectionScope);

        var currentDirectionScopeIndex = currentDirectionScope.indexOf(this._currentDirection);
        var whereDirectionIndex = currentDirectionScope.indexOf(direction);

        if (whereDirectionIndex == -1) {
            whereDirectionIndex = 2;
        }

        if (whereDirectionIndex > currentDirectionScopeIndex) {
            currentDirectionIndex++;
            if (currentDirectionIndex > directions.length - 1)
                currentDirectionIndex = 0;

            this._bumber.turn();

        } else {
            currentDirectionIndex--;
            if (currentDirectionIndex < 0)
                currentDirectionIndex = directions.length - 1;

            this._bumber.turn(true);
        }
        console.log('previous current direction', this._currentDirection);
        this._currentDirection = directions[currentDirectionIndex];
        console.log('next', this._currentDirection);
    }

    getCurrentDirectionScope(directions, currentIndex) {
        var scope = [directions[currentIndex]];
        var nextIndex = currentIndex + 1;
        var prevIndex = currentIndex - 1;

        if (nextIndex > directions.length - 1) {
            nextIndex = 0;
        }

        if (prevIndex < 0) {
            prevIndex = directions.length - 1;
        }

        scope.unshift(directions[prevIndex]);
        scope.push(directions[nextIndex]);
        console.log('scope indexes', prevIndex, currentIndex, nextIndex);
        return scope;
    }

    fire() {
        return this.tower.fire();
    }

    draw(ctx) {
        this._bumber.setPosition(this.positionX, this.positionY);
        this._bumber.draw(ctx);
        this.tower.setPosition(this.positionX, this.positionY);
        this.tower.draw(ctx);
    }
}

class TankBumber {
    constructor(positionX, positionY) {
        this.setPosition(positionX, positionY);
    }

    setPosition(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    draw(ctx) { }

    turn(isLeft) {
        var angle = isLeft ? -90 : 90;

        var newPoint = MathLib.getTurnPoint(this._bumberWidth, this._bumberHeight, angle);

        this._bumberWidth = newPoint.x;
        this._bumberHeight = newPoint.y;
    }
}

class ImageTankBumber extends TankBumber {
    _bumberHeight = 55;
    _bumberWidth = 40;
    _angle = 0;

    constructor(positionX, positionY) {
        super(positionX, positionY);

        this._image = new Image();
        this._image.src = "https://raw.githubusercontent.com/pavelDruzhinin/games/master/assets/img/tank%20bumper.png";
    }

    draw(ctx) {
        ctx.setTransform(1, 0, 0, 1, this.positionX, this.positionY); // sets scale and origin
        ctx.rotate(MathLib.getAngleRadians(this._angle));

        ctx.drawImage(this._image, -this._bumberWidth / 2,
            -this._bumberHeight / 2,
            this._bumberWidth,
            this._bumberHeight);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    turn(isLeft) {
        var angle = isLeft ? -90 : 90;

        this._angle += angle;
    }
}

class SimpleTankBumber extends TankBumber {
    _bumberHeight = 40;
    _bumberWidth = 30;

    constructor(positionX, positionY) {
        super(positionX, positionY);
    }

    draw(ctx) {
        ctx.fillStyle = Colors.violet;
        ctx.fillRect(this.positionX - this._bumberWidth / 2,
            this.positionY - this._bumberHeight / 2,
            this._bumberWidth,
            this._bumberHeight);
    }
}



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

class ImageTankTower extends TankTower {
    constructor(positionX, positionY) {
        super(positionX, positionY);

        this._image = new Image(100, 200);
        this._image.src = "https://raw.githubusercontent.com/pavelDruzhinin/games/master/assets/img/tank%20tower.png";
    }

    draw(ctx) {
        ctx.drawImage(this._image, this.positionX - 15, this.positionY - 45, 30, 60);
    }

    fire(ctx) {
        return [new Bullet(this.positionX, this.positionY - 45)];
    }
}

class DoubleBarreledTankTower extends TankTower {
    constructor(positionX, positionY) {
        super(positionX, positionY);

        this.rifle1Position = 7;
        this.rifle2Position = -5;
        this._correctPositionY = -20;
    }

    draw(ctx) {
        this._drawTower(ctx);
        this._drawRifle(ctx, this.rifle1Position);
        this._drawRifle(ctx, this.rifle2Position);
    }

    _drawTower(ctx) {
        ctx.fillStyle = Colors.green;

        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, 10, 0, 2 * Math.PI);
        ctx.fill();
    }

    _drawRifle(ctx, x) {
        ctx.fillStyle = Colors.black;
        ctx.fillRect(this.positionX - x, this.positionY + this._correctPositionY, 3, 12);
    }

    fire() {
        return [
            new Bullet(this.positionX - this.rifle1Position, this.positionY + this._correctPositionY),
            new Bullet(this.positionX - this.rifle2Position, this.positionY + this._correctPositionY)
        ];
    }
}

class SimpleTankTower extends TankTower {
    constructor(positionX, positionY) {
        super(positionX, positionY);
    }

    draw(ctx) {
        this._drawTower(ctx);
        this._drawRifle(ctx);
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

    fire() {
        return [new Bullet(this.positionX, this.positionY - 20)];
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
        this.positionY += MathLib.getRandomInt(2) * this._speedLevel;
    }
}

class TankGame {
    constructor(ghostCount, ghostSpeedLevel) {
        this._ghostCount = ghostCount;
        this._ghostSpeedLevel = ghostSpeedLevel;
    }

    get sceneWidth() { return 800; }
    get sceneHeight() { return window.innerHeight; }


    start() {
        var game = new Game("scene", this.sceneWidth, this.sceneHeight);
        var tank = new Tank(this.sceneWidth / 2, this.sceneHeight - 50, 10);
        var ghosts = this.generateGhosts(this._ghostCount, this._ghostSpeedLevel, this.sceneWidth);

        var keyboardsEvents = {
            'ArrowUp': () => tank.move('up'),
            'ArrowDown': () => tank.move('down'),
            'ArrowRight': () => tank.move('right'),
            'ArrowLeft': () => tank.move('left'),
            'Space': () => tankFire(),
            'KeyC': () => tank.changeTower()
        };

        game.scene.addDrawObjects(ghosts);
        game.scene.addDrawObject(tank);
        game.registerKeyBoardEvents(keyboardsEvents);
        game.run();

        function tankFire() {
            var bullets = tank.fire();
            for (var bullet of bullets) {
                game.scene.addDrawObject(bullet);
                var event = new ClashPhysicEvent(bullet, ghosts);
                game.scene.addPhysicEvent(event);
            }
        }

        this.game = game;
    }

    restart() {
        this.game.destroy();
        this.start();
    }

    generateGhosts(ghostCount, ghostSpeedLevel, sceneWidth) {
        var ghostArray = [];
        for (var i = 0; i < ghostCount; i++) {
            let randomX = Math.random();
            if (!randomX)
                randomX = 2;

            ghostArray.push(new Ghost(sceneWidth * randomX, 0, ghostSpeedLevel));
        }
        return ghostArray;
    }
}

var tankGame = new TankGame(10, 1);

tankGame.start();

document.getElementById('startNewGame')
    .addEventListener('click', function (event) {
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