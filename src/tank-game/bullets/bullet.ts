import { BaseBullet } from "./base-bullet";
import { Colors } from "../game-framework";

export class Bullet extends BaseBullet {
    public damage: number;
    constructor(startPositionX: any, startPositionY: any) {
        super(startPositionX, startPositionY, 3, 20);
        this.damage = 10;
    }

    _drawBullet(ctx: any, deviceRatio: any) {
        ctx.fillStyle = Colors.red;

        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this._radius * deviceRatio, 0, 2 * Math.PI);
        ctx.fill();
    }
}