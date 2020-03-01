import { MathLib } from "../game-framework";

export class BaseTankBumber {
    positionY: number;
    positionX: number;
    _bumberWidth: number;
    _bumberHeight: number;
    constructor(positionX: any, positionY: any) {
        this.setPosition(positionX, positionY);
    }

    setPosition(positionX: number, positionY: number) {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    draw(ctx: any, deviceRatio: number) { }

    turn(isLeft: boolean) {
        var angle = isLeft ? -90 : 90;

        var newPoint = MathLib.getTurnPoint(this._bumberWidth, this._bumberHeight, angle);

        this._bumberWidth = newPoint.x;
        this._bumberHeight = newPoint.y;
    }
}