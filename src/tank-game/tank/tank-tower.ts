import { TankAmunnition } from "./ammunition";
import { BaseBullet } from "../bullets/base-bullet";
import { TankDirections } from "./tank";

export abstract class TankTower {
    positionX: number;
    positionY: number;
    protected _angle: number = 0;

    constructor(positionX: number, positionY: number) {
        this.setPosition(positionX, positionY);
    }

    abstract draw(ctx: CanvasRenderingContext2D, deviceRatio: number): void;

    abstract fire(ammunition: TankAmunnition, direction: TankDirections): BaseBullet[];

    abstract turn(isLeft: boolean): void;

    protected setPosition(positionX: number, positionY: number) {
        this.positionX = positionX;
        this.positionY = positionY;
    }
}