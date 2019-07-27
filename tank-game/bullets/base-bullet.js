class BaseBullet extends BaseDrawObject {
    constructor(positionX, positionY, radius, speed) {
        super();
        this.positionX = positionX;
        this.positionY = positionY;

        this._radius = radius;
        this._speed = speed;
    }

    get width() { return this._radius * 2; }
    get height() { return this._radius * 2; }

    draw(ctx, deviceRatio) {
        this._drawBullet(ctx, deviceRatio);
        this.move(deviceRatio);
    }

    _drawBullet(ctx, deviceRatio) {

    }

    move(deviceRatio) {
        this.positionY -= this._speed * deviceRatio;
    }
}