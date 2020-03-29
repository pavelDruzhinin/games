import { BaseBullet } from "./base-bullet";
import { Colors, MathLib } from "../game-framework";
import { TankDirections } from "../tank/tank-directions";

export class Bullet extends BaseBullet {
    damage: number;

    constructor(startPositionX: number, startPositionY: number, direction: TankDirections) {
        super(startPositionX, startPositionY, 3, 20, direction);
        this.damage = -10;
    }

    protected _drawBullet(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        ctx.fillStyle = Colors.red;

        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this._radius * deviceRatio, 0, 2 * Math.PI);
        ctx.fill();
    }
}