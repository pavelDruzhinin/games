import { TankTower } from "./tank-tower";
import { GameImage } from "../game-framework";
import { RechargeTankTower } from "../game";
import { Bullet } from "../bullets/bullet";

export class DoubleBarreledTankTower extends TankTower {
    rifle1Position: number;
    rifle2Position: number;
    deviceRatio: number;

    private _towerImage: GameImage;
    private _towerRiffleImage: GameImage;
    private _recharge: RechargeTankTower;
    private _correctPositionY: number;

    constructor(positionX: number, positionY: number) {
        super(positionX, positionY);

        this._towerImage = new GameImage("/assets/img/tank tower.png");
        this._towerRiffleImage = new GameImage("/assets/img/tank riffle.png");

        this._recharge = new RechargeTankTower(4, 0.5);

        this.rifle1Position = 7;
        this.rifle2Position = -5;
        this._correctPositionY = -28;
    }

    draw(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        this._recharge.process();
        this.deviceRatio = deviceRatio;

        this._drawRifle(ctx, this.rifle1Position, deviceRatio);
        this._drawRifle(ctx, this.rifle2Position, deviceRatio);
        this._drawTower(ctx, deviceRatio);
    }

    _drawTower(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        ctx.drawImage(this._towerImage,
            this.positionX - 14 * deviceRatio,
            this.positionY - 15 * deviceRatio,
            30 * deviceRatio,
            30 * deviceRatio);
    }

    _drawRifle(ctx: CanvasRenderingContext2D, x: number, deviceRatio: number) {
        ctx.drawImage(this._towerRiffleImage,
            this.positionX - x * deviceRatio,
            this.positionY + this._recharge.startRifflePosition + this._correctPositionY * deviceRatio,
            3 * deviceRatio,
            15 * deviceRatio);
    }

    fire() {
        if (this._recharge.inProccess)
            return [];

        this._recharge.start(this.deviceRatio);

        return [
            new Bullet(this.positionX - this.rifle1Position * this.deviceRatio + 1 * this.deviceRatio,
                this.positionY + this._correctPositionY * this.deviceRatio),
            new Bullet(this.positionX - this.rifle2Position * this.deviceRatio + 1 * this.deviceRatio,
                this.positionY + this._correctPositionY * this.deviceRatio)
        ];
    }
}