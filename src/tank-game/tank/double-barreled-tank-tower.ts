class DoubleBarreledTankTower extends TankTower {
    constructor(positionX, positionY) {
        super(positionX, positionY);

        this._towerImage = new GameImage("/assets/img/tank tower.png");
        this._towerRiffleImage = new GameImage("/assets/img/tank riffle.png");

        this._recharge = new RechargeTankTower(4, 0.5);

        this.rifle1Position = 7;
        this.rifle2Position = -5;
        this._correctPositionY = -28;
    }

    draw(ctx, deviceRatio) {
        this._recharge.process();
        this.deviceRatio = deviceRatio;

        this._drawRifle(ctx, this.rifle1Position, deviceRatio);
        this._drawRifle(ctx, this.rifle2Position, deviceRatio);
        this._drawTower(ctx, deviceRatio);
    }

    _drawTower(ctx, deviceRatio) {
        ctx.drawImage(this._towerImage,
            this.positionX - 14 * deviceRatio,
            this.positionY - 15 * deviceRatio,
            30 * deviceRatio,
            30 * deviceRatio);
    }

    _drawRifle(ctx, x, deviceRatio) {
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