import { BaseDrawObject } from "../game-framework";

export abstract class BaseBullet extends BaseDrawObject {
    abstract damage: number;
    protected _radius: number;
    private _speed: number;
    constructor(public positionX: number, public positionY: number, radius: number, speed: number) {
        super();

        this._radius = radius;
        this._speed = speed;
    }

    get width() { return this._radius * 2; }
    get height() { return this._radius * 2; }

    draw(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        this._drawBullet(ctx, deviceRatio);
        this.move(deviceRatio);
    }

    protected abstract _drawBullet(ctx: CanvasRenderingContext2D, deviceRatio: number): void;

    move(deviceRatio: number) {
        this.positionY -= this._speed * deviceRatio;
    }
}