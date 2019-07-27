class BaseTankBumber {
    constructor(positionX, positionY) {
        this.setPosition(positionX, positionY);
    }

    setPosition(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    draw(ctx, deviceRatio) { }

    turn(isLeft) {
        var angle = isLeft ? -90 : 90;

        var newPoint = MathLib.getTurnPoint(this._bumberWidth, this._bumberHeight, angle);

        this._bumberWidth = newPoint.x;
        this._bumberHeight = newPoint.y;
    }
}