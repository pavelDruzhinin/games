import { BaseBullet } from "./base-bullet";
import { BangAnimation } from "../animations/bang-animation";
import { GameImage } from "../game-framework";

export class Shrapnel extends BaseBullet {
    strikingDistance: number;
    damage: number;

    private _shrapnelImage: GameImage;

    constructor(startPositionX: number, startPositionY: number) {
        super(startPositionX, startPositionY, 6, 40);

        this._shrapnelImage = new GameImage("/assets/img/bullet.png");
        this.strikingDistance = 500;
        this.damage = 30;
    }

    _drawBullet(ctx: CanvasRenderingContext2D, devicePixelRatio: number) {
        ctx.drawImage(this._shrapnelImage, this.positionX, this.positionY, 3 * devicePixelRatio, 7 * devicePixelRatio);
    }

    createStrikeAnimation() {
        return new BangAnimation();
    }
}