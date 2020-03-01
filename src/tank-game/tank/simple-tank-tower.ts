import { TankTower } from "./tank-tower";

export class SimpleTankTower extends TankTower {
    constructor(positionX, positionY) {
        super(positionX, positionY);

        this._towerImage = new GameImage("/assets/img/tank tower.png");
        this._towerRiffleImage = new GameImage("/assets/img/tank riffle.png");

        this._recharge = new RechargeTankTower(6, 1);
    }

    draw(ctx, deviceRatio) {
        this._recharge.process();
        //ctx.imageSmoothingEnabled = false;
        this.deviceRatio = deviceRatio;
        ctx.drawImage(this._towerRiffleImage,
            this.positionX,
            (this.positionY - 45 * deviceRatio + this._recharge.startRifflePosition),
            3 * deviceRatio,
            30 * deviceRatio);
        ctx.drawImage(this._towerImage,
            (this.positionX - 14 * deviceRatio),
            (this.positionY - 15 * deviceRatio),
            30 * deviceRatio,
            30 * deviceRatio);
    }

    fire(ammunition) {
        if (this._recharge.inProccess)
            return [];

        if (!ammunition.shrapnels)
            return;

        this._recharge.start(this.deviceRatio);

        return [new Shrapnel((this.positionX), (this.positionY - 50 * this.deviceRatio))];
    }
}