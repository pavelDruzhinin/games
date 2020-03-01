import { BaseAnimation, GameImage } from "../game-framework";

export class BangAnimation extends BaseAnimation {
    private _bangImage: GameImage;
    private _increaseCoefEnd: number;
    private _increaseCoef: number;

    constructor() {
        super();

        this._bangImage = new GameImage("/assets/img/bang.png");
        this._increaseCoefEnd = 14;
        this._increaseCoef = 1;
    }

    get isDestroy() { return this._increaseCoef >= this._increaseCoefEnd; }

    _draw(ctx: any, deviceRatio: any) {
        if (this.isDestroy)
            return;

        var radius = 3 * deviceRatio * this._increaseCoef;

        ctx.drawImage(this._bangImage, this.positionX - radius / 2, this.positionY - radius / 2, radius, radius);
        this._increaseCoef += 1;
    }
}