export class TankTower {
    positionX: any;
    positionY: any;

    constructor(positionX: any, positionY: any) {
        this.setPosition(positionX, positionY);
    }

    draw(ctx: any) { }

    fire() { }

    setPosition(positionX: any, positionY: any) {
        this.positionX = positionX;
        this.positionY = positionY;
    }
}