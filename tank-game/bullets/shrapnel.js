class Shrapnel extends BaseBullet {
    constructor(startPositionX, startPositionY) {
        super(startPositionX, startPositionY, 6, 40);

        this._shrapnelImage = new GameImage("/assets/img/bullet.png");
        this.strikingDistance = 500;
    }

    _drawBullet(ctx, devicePixelRatio) {
        ctx.drawImage(this._shrapnelImage, this.positionX, this.positionY, 3 * devicePixelRatio, 7 * devicePixelRatio);
    }

    createStrikeAnimation() {
        return new BangAnimation();
    }
}