import { TankTower } from "./tank-tower";
import { Shrapnel } from "../bullets/shrapnel";
import { GameImage } from "../game-framework";
import { RechargeTankTower } from "../game";
import { TankAmunnition } from "./ammunition";

export class SimpleTankTower extends TankTower {
    deviceRatio: number;

    protected _towerImage: GameImage;
    protected _towerRiffleImage: GameImage;
    private _recharge: RechargeTankTower;

    constructor(positionX: number, positionY: number) {
        super(positionX, positionY);

        this._towerImage = new GameImage("/assets/img/tank tower.png");
        this._towerRiffleImage = new GameImage("/assets/img/tank riffle.png");

        this._recharge = new RechargeTankTower(6, 1);
    }

    draw(ctx: CanvasRenderingContext2D, deviceRatio: number) {
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

    fire(ammunition: TankAmunnition) {
        if (this._recharge.inProccess)
            return [];

        if (!ammunition.shrapnels)
            return;

        this._recharge.start(this.deviceRatio);

        return [new Shrapnel((this.positionX), (this.positionY - 50 * this.deviceRatio))];
    }
}