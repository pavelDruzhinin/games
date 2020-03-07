import { BaseBullet } from "./base-bullet";
import { Colors } from "../game-framework";

export class Bullet extends BaseBullet {
    damage: number;

    constructor(startPositionX: number, startPositionY: number) {
        super(startPositionX, startPositionY, 3, 20);
        this.damage = 10;
    }

    _drawBullet(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        ctx.fillStyle = Colors.red;

        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this._radius * deviceRatio, 0, 2 * Math.PI);
        ctx.fill();
    }
}