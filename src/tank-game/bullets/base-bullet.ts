import { BaseDrawObject } from "../game-framework";

export class BaseBullet extends BaseDrawObject {
    protected _radius: number;
    private _speed: number;
    constructor(public positionX: any, public positionY: any, radius: any, speed: any) {
        super();
        this.positionX = positionX;
        this.positionY = positionY;

        this._radius = radius;
        this._speed = speed;
    }

    get width() { return this._radius * 2; }
    get height() { return this._radius * 2; }

    draw(ctx: any, deviceRatio: any) {
        this._drawBullet(ctx, deviceRatio);
        this.move(deviceRatio);
    }

    _drawBullet(ctx: any, deviceRatio: any) {

    }

    move(deviceRatio: any) {
        this.positionY -= this._speed * deviceRatio;
    }
}