import { BaseDrawObject, Colors } from "../game-framework";
import { DoubleBarreledTankTower } from "./double-barreled-tank-tower"
import { SimpleTankTower } from "./simple-tank-tower"
import { SimpleTankBumber } from "./simple-tank-bumper";
import { TankAmunnition } from "./ammunition";
import { TankTower } from "./tank-tower";

export class Damage extends BaseDrawObject {
    health: number;
    positionX: number;
    positionY: number;

    constructor(positionX: number, positionY: number) {
        super();
        this.health = 100;
        this.setPosition(positionX, positionY);
    }

    draw(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        ctx.rect(this.positionX, this.positionY, this.health, 10);
        ctx.fillStyle = Colors.green;
        ctx.fillRect(this.positionX, this.positionY, this.health, 10);
    }

    setPosition(positionX: number, positionY: number) {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    remove(damage: number) {
        this.health -= damage;
    }

    isLastDamage(damage: number) {
        return this.health - damage < 0;
    }
}

export interface IDamagable {
    damage: Damage;
}

export enum TankDirections {
    Up,
    Down,
    Right,
    Left
}

export class Tank extends BaseDrawObject implements IDamagable {
    positionX: number;
    positionY: number;
    speed: number;
    tower: TankTower;
    damage: Damage;
    deviceRatio: number;
    ammunition = new TankAmunnition();

    private _currentDirection: TankDirections = TankDirections.Up;

    private _bumber: SimpleTankBumber;
    private _towers: TankTower[];

    constructor(startPositionX: number, startPositionY: number, speed: number) {
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

        this.damage = new Damage(startPositionX - 50, startPositionY + 60);
    }

    addAmunnition(ammunition: TankAmunnition) {
        this.ammunition.add(ammunition);
    }

    changeTower() {
        var tankTower = this._towers.filter((el) => el != this.tower)[0];
        tankTower.setPosition(this.positionX, this.positionY);

        this.tower = tankTower;
    }

    move(direction: TankDirections) {
        if (this._currentDirection != direction) {
            this._turn(direction);
            return;
        }

        switch (direction) {
            case TankDirections.Up:
                this.positionY -= this.speed * this.deviceRatio;
                break;
            case TankDirections.Down:
                this.positionY += this.speed * this.deviceRatio;
                break;
            case TankDirections.Right:
                this.positionX += this.speed * this.deviceRatio;
                break;
            case TankDirections.Left:
                this.positionX -= this.speed * this.deviceRatio;
                break;
        }
    }

    _turn(direction: TankDirections) {
        var directions = [TankDirections.Up, TankDirections.Right, TankDirections.Down, TankDirections.Left];

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

            this._bumber.turn(false);
            this.tower.turn(false);

        } else {
            currentDirectionIndex--;
            if (currentDirectionIndex < 0)
                currentDirectionIndex = directions.length - 1;

            this._bumber.turn(true);
            this.tower.turn(true);
        }
        this._currentDirection = directions[currentDirectionIndex];
    }

    getCurrentDirectionScope(directions: TankDirections[], currentIndex: number) {
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
        return this.tower.fire(this.ammunition, this._currentDirection);
    }

    draw(ctx: CanvasRenderingContext2D, deviceRatio: number): void {
        this.deviceRatio = deviceRatio;
        this._bumber.setPosition(this.positionX, this.positionY);
        this._bumber.draw(ctx, deviceRatio);
        this.tower.setPosition(this.positionX, this.positionY);
        this.tower.draw(ctx, deviceRatio);
        this.damage.setPosition(this.positionX - 50, this.positionY + 60);
        this.damage.draw(ctx, deviceRatio);
    }
}

