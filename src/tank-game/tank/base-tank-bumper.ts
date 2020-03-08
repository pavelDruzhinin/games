import { MathLib } from "../game-framework";

export abstract class BaseTankBumber {
    positionY: number;
    positionX: number;
    protected _bumberWidth: number;
    protected _bumberHeight: number;

    constructor(positionX: number, positionY: number) {
        this.setPosition(positionX, positionY);
    }

    setPosition(positionX: number, positionY: number) {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    abstract draw(ctx: CanvasRenderingContext2D, deviceRatio: number): void;

    turn(isLeft: boolean) {
        const angle = isLeft ? -90 : 90;

        const newPoint = MathLib.getTurnPoint(this._bumberWidth, this._bumberHeight, angle);

        this._bumberWidth = newPoint.x;
        this._bumberHeight = newPoint.y;
    }
}