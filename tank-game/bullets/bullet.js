class Bullet extends BaseBullet {
    constructor(startPositionX, startPositionY) {
        super(startPositionX, startPositionY, 3, 20);
        this.damage = 10;
    }

    _drawBullet(ctx, deviceRatio) {
        ctx.fillStyle = Colors.red;

        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this._radius * deviceRatio, 0, 2 * Math.PI);
        ctx.fill();
    }
}