import { BaseBullet } from "./base-bullet";
import { BangAnimation } from "../animations/bang-animation";
import { GameImage, MathLib } from "../game-framework";
import { TankDirections } from "../tank/tank";

export class Shrapnel extends BaseBullet {
    strikingDistance: number;
    damage: number;

    private _shrapnelImage: GameImage;

    constructor(startPositionX: number, startPositionY: number, direction: TankDirections) {
        super(startPositionX, startPositionY, 6, 40, direction);

        this._shrapnelImage = new GameImage("/assets/img/bullet.png");
        this.strikingDistance = 500;
        this.damage = 30;
    }

    protected _drawBullet(ctx: CanvasRenderingContext2D, devicePixelRatio: number) {
        ctx.setTransform(1, 0, 0, 1, this.positionX, this.positionY);
        ctx.rotate(this.getAngel());
        ctx.drawImage(this._shrapnelImage, 0, -130, 3 * devicePixelRatio, 7 * devicePixelRatio);
        ctx.resetTransform();
    }

    private getAngel(): number {
        switch (this._direction) {
            case TankDirections.Up:
                return MathLib.getAngleRadians(0);
            case TankDirections.Down:
                return MathLib.getAngleRadians(180);
            case TankDirections.Left:
                return MathLib.getAngleRadians(-90);
            case TankDirections.Right:
                return MathLib.getAngleRadians(90);
        }
    }

    createStrikeAnimation() {
        return new BangAnimation();
    }
}