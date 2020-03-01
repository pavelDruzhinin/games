import { MathLib, GameImage } from "../game-framework";

export class SimpleTankBumber extends BaseTankBumber {
    _bumberHeight = 55;
    _bumberWidth = 40;
    _angle = 0;
    _image: any;
    positionX: number;
    positionY: number;

    constructor(positionX: number, positionY: number) {
        super(positionX, positionY);

        this._image = new GameImage("/assets/img/tank bumper.png");
    }

    draw(ctx: any, deviceRatio: number) {
        ctx.setTransform(1, 0, 0, 1, this.positionX, this.positionY); // sets scale and origin
        ctx.rotate(MathLib.getAngleRadians(this._angle));
        var bumperWidth = this._bumberWidth * deviceRatio;
        var bumperHeight = this._bumberHeight * deviceRatio;

        ctx.drawImage(this._image, -bumperWidth / 2,
            -bumperHeight / 2,
            bumperWidth,
            bumperHeight);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    turn(isLeft: boolean = false) {
        var angle = isLeft ? -90 : 90;

        this._angle += angle;
    }
}