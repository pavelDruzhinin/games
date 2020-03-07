import { MathLib, GameImage } from "../game-framework";
import { BaseTankBumber } from "./base-tank-bumper";

export class SimpleTankBumber extends BaseTankBumber {
    protected _bumberHeight = 55;
    protected _bumberWidth = 40;
    private _angle = 0;
    private _image: GameImage;

    constructor(positionX: number, positionY: number) {
        super(positionX, positionY);

        this._image = new GameImage("/assets/img/tank bumper.png");
    }

    draw(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        ctx.setTransform(1, 0, 0, 1, this.positionX, this.positionY); // sets scale and origin
        ctx.rotate(MathLib.getAngleRadians(this._angle));
        const bumperWidth = this._bumberWidth * deviceRatio;
        const bumperHeight = this._bumberHeight * deviceRatio;

        ctx.drawImage(this._image, -bumperWidth / 2,
            -bumperHeight / 2,
            bumperWidth,
            bumperHeight);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    turn(isLeft: boolean = false) {
        const angle = isLeft ? -90 : 90;

        this._angle += angle;
    }
}