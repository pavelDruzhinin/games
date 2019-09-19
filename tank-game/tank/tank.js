class Damage extends BaseDrawObject {
    constructor(positionX, positionY) {
        super();
        this.health = 100;
        this.setPosition(positionX, positionY);
    }

    draw(ctx, deviceRatio) {
        ctx.rect(this.positionX, this.positionY, this.health, 10);
        ctx.fillStyle = Colors.green;
        ctx.fillRect(this.positionX, this.positionY, this.health, 10);
    }

    setPosition(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    remove(damage) {
        this.health -= damage;
    }

    isLastDamage(damage) {
        return this.health - damage < 0;
    }
}

class Tank extends BaseDrawObject {
    _currentDirection = 'up';
    _bumberHeight = 40;
    _bumberWidth = 30;
    _ammunition = new TankAmunnition();

    constructor(startPositionX, startPositionY, speed) {
        super();

        this.positionX = startPositionX;
        this.positionY = startPositionY;
        this.speed = speed;
        this._bumber = new SimpleTankBumber(startPositionX, startPositionY);
        this._towers = [
            new SimpleTankTower(startPositionX, startPositionY),
            new DoubleBarreledTankTower(startPositionX, startPositionY)
        ];
        this.tower = this._towers[0];

        this._damage = new Damage(startPositionX - 50, startPositionY + 60);
    }

    addAmunnition(ammunition) {
        this._ammunition.add(ammunition);
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
                this.positionY -= this.speed * this.deviceRatio;
                break;
            case 'right':
                this.positionX += this.speed * this.deviceRatio;
                break;
            case 'left':
                this.positionX -= this.speed * this.deviceRatio;
                break;
            case 'down':
                this.positionY += this.speed * this.deviceRatio;
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
        // console.log('previous current direction', this._currentDirection);
        this._currentDirection = directions[currentDirectionIndex];
        // console.log('next', this._currentDirection);
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
        return this.tower.fire(this._ammunition);
    }

    draw(ctx, deviceRatio) {
        this.deviceRatio = deviceRatio;
        this._bumber.setPosition(this.positionX, this.positionY);
        this._bumber.draw(ctx, deviceRatio);
        this.tower.setPosition(this.positionX, this.positionY);
        this.tower.draw(ctx, deviceRatio);
        this._damage.setPosition(this.positionX - 50, this.positionY + 60);
        this._damage.draw(ctx, deviceRatio);
    }
}

