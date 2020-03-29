import { TankTower } from "./tank-tower";
import { GameImage, MathLib } from "../game-framework";
import { RechargeTankTower } from "../game";
import { Bullet } from "../bullets/bullet";
import { BaseBullet } from "../bullets/base-bullet";
import { TankAmunnition } from "./ammunition";
import { TankDirections } from "./tank";

export class DoubleBarreledTankTower extends TankTower {

    readonly rifle1Position: number;
    readonly rifle2Position: number;
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

    public draw(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        this._recharge.process();
        this.deviceRatio = deviceRatio;

        ctx.setTransform(1, 0, 0, 1, this.positionX, this.positionY);

        ctx.rotate(MathLib.getAngleRadians(this._angle));

        this._drawRifle(ctx, this.rifle1Position, deviceRatio);
        this._drawRifle(ctx, this.rifle2Position, deviceRatio);
        this._drawTower(ctx, deviceRatio);

        ctx.resetTransform();
    }

    public turn(isLeft: boolean): void {
        const angle = isLeft ? -90 : 90;
        this._angle += angle;
    }

    public fire(ammunition: TankAmunnition, direction: TankDirections): BaseBullet[] {
        if (this._recharge.inProccess)
            return [];

        if (!ammunition.bullets)
            return;

        this._recharge.start(this.deviceRatio);

        const xOffset = this.getBulletXPositionOffset(direction);
        const yOffset = this.getBulletYPositionOffset(direction);

        let x1 = this.positionX + xOffset;
        let x2 = this.positionX + xOffset;
        let y1 = this.positionY + yOffset;
        let y2 = this.positionY + yOffset;

        switch (direction) {
            case TankDirections.Down:
            case TankDirections.Up:
                x1 -= this.rifle1Position;
                x2 -= this.rifle2Position;
                break;

            case TankDirections.Right:
            case TankDirections.Left:
                y1 -= this.rifle1Position;
                y2 -= this.rifle2Position;
                break;
        }

        return [
            new Bullet(x1, y1, direction),
            new Bullet(x2, y2, direction)
        ];
    }

    private _drawTower(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        ctx.drawImage(this._towerImage,
            (-14 * deviceRatio),
            (-15 * deviceRatio),
            30 * deviceRatio,
            30 * deviceRatio);
    }

    private _drawRifle(ctx: CanvasRenderingContext2D, x: number, deviceRatio: number) {
        ctx.drawImage(this._towerRiffleImage,
            x * deviceRatio,
            this._recharge.startRifflePosition + this._correctPositionY * deviceRatio,
            3 * deviceRatio,
            15 * deviceRatio);
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