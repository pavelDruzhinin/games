import { BaseDrawObject, BaseDrawObjectPart, MathLib, GameImage } from "../game-framework";
import { Bullet } from "../bullets/bullet";
import { Damage } from "../tank/tank";

export class Enemy extends BaseDrawObject {
    public positionX: number;
    public positionY: number;
    private _speedLevel: number;
    private _head: EnemyHead;
    private _gun1: EnemyGun;
    private _gun2: EnemyGun;
    private _damage: Damage;
    public width: number;
    public height: number;

    constructor(startPositionX: any, startPositionY: any, speedLevel: any) {
        super();

        this.positionX = startPositionX;
        this.positionY = startPositionY;
        this._speedLevel = speedLevel;

        this._head = new EnemyHead();
        this._gun1 = new EnemyGun();
        this._gun2 = new EnemyGun();
        this._damage = new Damage(startPositionX, startPositionY - 20);
        this.width = 30;
        this.height = 60;
    }

    draw(ctx: any, deviceRatio: any) {
        this._head.draw(ctx, deviceRatio, this.positionX, this.positionY);
        this._gun1.draw(ctx, deviceRatio, this.positionX - 12 * deviceRatio, this.positionY + 30 * deviceRatio);
        this._gun2.draw(ctx, deviceRatio, this.positionX + 50 * deviceRatio, this.positionY + 30 * deviceRatio);
        this._damage.setPosition(this.positionX, this.positionY - 20);
        this._damage.draw(ctx, deviceRatio);

        this.move(deviceRatio);
    }

    move(deviceRatio: any) {
        this.positionY += MathLib.getRandomInt(2) * this._speedLevel * deviceRatio;
    }

    fire() {
        return this._gun1.fire();
    }
}

class EnemyHead extends BaseDrawObjectPart {
    private _imageHead: GameImage;
    public width: number;
    public height: number;

    constructor() {
        super();

        this._imageHead = new GameImage("/assets/img/enemy head.png");
        this.width = 50;
        this.height = 75;
    }

    _drawPart(ctx: any, deviceRatio: any) {
        ctx.drawImage(this._imageHead,
            this.positionX,
            this.positionY,
            this.width * deviceRatio,
            this.height * deviceRatio);
    }
}

class EnemyGun extends BaseDrawObjectPart {
    private _imageGun: GameImage;
    public width: number;
    public height: number;
    private _pistols: EnemyGunPistol[];

    constructor() {
        super();

        this._imageGun = new GameImage("/assets/img/enemy gun.png");


        this.width = 12;
        this.height = 12;
        this._pistols = [
            new EnemyGunPistol(),
            new EnemyGunPistol(),
            new EnemyGunPistol(),
            new EnemyGunPistol()
        ];
    }

    _drawPart(ctx: any, deviceRatio: any) {
        ctx.drawImage(this._imageGun, this.positionX, this.positionY, this.width * deviceRatio, this.height * deviceRatio);
        for (var i = 0; i < this._pistols.length; i++) {
            this._pistols[i].draw(ctx, deviceRatio, this.positionX + this._pistols[i].width * deviceRatio * i, this.positionY + 10 * deviceRatio);
        }
    }

    fire() {
        return [new Bullet(this.positionX, this.positionY)];
    }
}

class EnemyGunPistol extends BaseDrawObjectPart {
    private _imageGunPistol: GameImage;
    public width: number;
    public height: number;

    constructor() {
        super();

        this._imageGunPistol = new GameImage("/assets/img/enemy gun pistol.png");

        this.width = 3;
        this.height = 20;
    }

    _drawPart(ctx: any, deviceRatio: any) {
        ctx.drawImage(this._imageGunPistol, this.positionX, this.positionY, this.width * deviceRatio, this.height * deviceRatio);
    }
}

