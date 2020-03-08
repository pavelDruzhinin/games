import { MathLib, GameImage } from "../game-framework";
import { BaseTankBumber } from "./base-tank-bumper";

export class SimpleTankBumber extends BaseTankBumber {
    protected _bumberHeight = 55;
    protected _bumberWidth = 40;
    private _image: GameImage;

    constructor(positionX: number, positionY: number) {
        super(positionX, positionY);

        this._image = new GameImage("/assets/img/tank bumper.png");
    }

    draw(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        
        const bumperWidth = this._bumberWidth * deviceRatio;
        const bumperHeight = this._bumberHeight * deviceRatio;

        ctx.setTransform(1, 0, 0, 1, this.positionX, this.positionY);

        ctx.rotate(MathLib.getAngleRadians(this._angle));

        ctx.drawImage(this._image, 
            -bumperWidth / 2,
            -bumperHeight / 2,
            bumperWidth,
            bumperHeight);
        
        ctx.resetTransform();
    }
}