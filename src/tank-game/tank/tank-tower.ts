import { TankAmunnition } from "./ammunition";
import { BaseBullet } from "../bullets/base-bullet";
import { TankDirections } from "./tank-directions";

export abstract class TankTower {
    positionX: number;
    positionY: number;
    protected _angle: number = 0;

    constructor(positionX: number, positionY: number) {
        this.setPosition(positionX, positionY);
    }

    abstract draw(ctx: CanvasRenderingContext2D, deviceRatio: number): void;

    abstract fire(ammunition: TankAmunnition, direction: TankDirections): BaseBullet[];

    public turn(direction: TankDirections): void {
        switch (direction) {
            case TankDirections.Up:
                this._angle = 0;
                break;
            case TankDirections.Right:
                this._angle = 90;
                break;
            case TankDirections.Down:
                this._angle = 180;
                break;
            case TankDirections.Left:
                this._angle = -90;
                break;
            default:
                break;
        }
    }
    
    public setPosition(positionX: number, positionY: number) {
        this.positionX = positionX;
        this.positionY = positionY;
    }
}