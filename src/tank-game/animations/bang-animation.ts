import { BaseAnimation } from "../game-framework";


export class BangAnimation extends BaseAnimation {
    constructor() {
        super();

        this._bangImage = new GameImage("/assets/img/bang.png");
        this._increaseCoefEnd = 14;
        this._increaseCoef = 1;
    }

    get isDestroy() { return this._increaseCoef >= this._increaseCoefEnd; }

    _draw(ctx, deviceRatio) {
        if (this.isDestroy)
            return;

        var radius = 3 * deviceRatio * this._increaseCoef;

        ctx.drawImage(this._bangImage, this.positionX - radius / 2, this.positionY - radius / 2, radius, radius);
        this._increaseCoef += 1;
    }
}