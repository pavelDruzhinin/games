import { TankAmunnition } from "./ammunition";
import { BaseBullet } from "../bullets/base-bullet";

export abstract class TankTower {
    positionX: number;
    positionY: number;

    constructor(positionX: number, positionY: number) {
        this.setPosition(positionX, positionY);
    }

    abstract draw(ctx: CanvasRenderingContext2D, deviceRatio: number): void;

    abstract fire(ammunition: TankAmunnition): BaseBullet[];

    setPosition(positionX: number, positionY: number) {
        this.positionX = positionX;
        this.positionY = positionY;
    }
}