import { TankTower } from "./tank-tower";
import { Shrapnel } from "../bullets/shrapnel";
import { GameImage, MathLib } from "../game-framework";
import { RechargeTankTower } from "../game";
import { TankAmunnition } from "./ammunition";
import { TankDirections } from "./tank-directions";

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

    public draw(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        this._recharge.process();

        ctx.setTransform(1, 0, 0, 1, this.positionX, this.positionY);

        this.deviceRatio = deviceRatio;

        ctx.rotate(MathLib.getAngleRadians(this._angle));

        ctx.drawImage(this._towerRiffleImage,
            0,
            (-45 * deviceRatio + this._recharge.startRifflePosition),
            3 * deviceRatio,
            30 * deviceRatio);

        ctx.drawImage(this._towerImage,
            (-14 * deviceRatio),
            (-15 * deviceRatio),
            30 * deviceRatio,
            30 * deviceRatio);

        ctx.resetTransform();
    }

    public fire(ammunition: TankAmunnition, direction: TankDirections) {
        if (this._recharge.inProccess)
            return [];

        if (!ammunition.shrapnels)
            return;

        this._recharge.start(this.deviceRatio);

        const xOffset = this.getBulletXPositionOffset(direction);
        const yOffset = this.getBulletYPositionOffset(direction);

        return [new Shrapnel((this.positionX + xOffset), (this.positionY + yOffset), direction)];
    }

    private getBulletXPositionOffset(direction: TankDirections): number {
        switch (direction) {
            case TankDirections.Left:
                return -50;
            case TankDirections.Right:
                return 50;
            default:
                return 0;
        }
    }

    private getBulletYPositionOffset(direction: TankDirections): number {
        switch (direction) {
            case TankDirections.Up:
                return -50;
            case TankDirections.Down:
                return 50;
            default:
                return 0;
        }
    }
}