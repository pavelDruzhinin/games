import { BaseDrawObject } from "../game-framework";
import { TankDirections } from "../tank/tank";

export abstract class BaseBullet extends BaseDrawObject {
    abstract damage: number;
    protected _radius: number;
    protected _direction: TankDirections;
    private _speed: number;

    constructor(public positionX: number, public positionY: number, radius: number, speed: number, direction: TankDirections) {
        super();

        this._radius = radius;
        this._speed = speed;
        this._direction = direction;
    }

    get width() { return this._radius * 2; }
    get height() { return this._radius * 2; }

    draw(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        this._drawBullet(ctx, deviceRatio);
        this.move(deviceRatio);
    }

    protected abstract _drawBullet(ctx: CanvasRenderingContext2D, deviceRatio: number): void;

    move(deviceRatio: number) {

        switch (this._direction) {
            case TankDirections.Up:
                this.positionY -= this._speed * deviceRatio;
                break;
            case TankDirections.Down:
                this.positionY += this._speed * deviceRatio;
                break;
            case TankDirections.Right:
                this.positionX += this._speed * deviceRatio;
                break;
            case TankDirections.Left:
                this.positionX -= this._speed * deviceRatio;
                break;
        }
    }
}