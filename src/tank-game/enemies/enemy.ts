import { BaseDrawObject, BaseDrawObjectPart, MathLib, GameImage } from "../game-framework";
import { Bullet } from "../bullets/bullet";
import { Damage, IDamagable } from "../tank/tank";
import { TankDirections } from "../tank/tank-directions";

export class Enemy extends BaseDrawObject implements IDamagable {
    positionX: number;
    positionY: number;
    damage: Damage;
    width: number;
    height: number;

    private _speedLevel: number;
    private _head: EnemyHead;
    private _gun1: EnemyGun;
    private _gun2: EnemyGun;

    constructor(startPositionX: number, startPositionY: number, speedLevel: number) {
        super();

        this.positionX = startPositionX;
        this.positionY = startPositionY;
        this._speedLevel = speedLevel;

        this._head = new EnemyHead();
        this._gun1 = new EnemyGun();
        this._gun2 = new EnemyGun();

        this.damage = new Damage(startPositionX, startPositionY - 20);
        this.width = 30;
        this.height = 60;
    }

    draw(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        this._head.draw(ctx, deviceRatio, this.positionX, this.positionY);
        this._gun1.draw(ctx, deviceRatio, this.positionX - 12 * deviceRatio, this.positionY + 30 * deviceRatio);
        this._gun2.draw(ctx, deviceRatio, this.positionX + 50 * deviceRatio, this.positionY + 30 * deviceRatio);

        this.damage.setPosition(this.positionX, this.positionY - 20);
        this.damage.draw(ctx, deviceRatio);

        this.move(deviceRatio);
    }

    move(deviceRatio: number) {
        this.positionY += MathLib.getRandomInt(2) * this._speedLevel * deviceRatio;
    }

    fire() {
        return this._gun1.fire();
    }
}

class EnemyHead extends BaseDrawObjectPart {
    width: number;
    height: number;

    private _imageHead: GameImage;

    constructor() {
        super();

        this._imageHead = new GameImage("/assets/img/enemy head.png");
        this.width = 50;
        this.height = 75;
    }

    protected _drawPart(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        ctx.drawImage(this._imageHead,
            this.positionX,
            this.positionY,
            this.width * deviceRatio,
            this.height * deviceRatio);
    }
}

class EnemyGun extends BaseDrawObjectPart {
    width: number;
    height: number;

    private _imageGun: GameImage;
    private _pistols: EnemyGunPistol[];

    constructor() {
        super();

        this.width = 12;
        this.height = 12;

        this._imageGun = new GameImage("/assets/img/enemy gun.png");
        this._pistols = [
            new EnemyGunPistol(),
            new EnemyGunPistol(),
            new EnemyGunPistol(),
            new EnemyGunPistol()
        ];
    }

    protected _drawPart(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        ctx.drawImage(this._imageGun, this.positionX, this.positionY, this.width * deviceRatio, this.height * deviceRatio);
        for (var i = 0; i < this._pistols.length; i++) {
            this._pistols[i].draw(ctx, deviceRatio, this.positionX + this._pistols[i].width * deviceRatio * i, this.positionY + 10 * deviceRatio);
        }
    }

    fire() {
        return [new Bullet(this.positionX, this.positionY, TankDirections.Up)];
    }
}

class EnemyGunPistol extends BaseDrawObjectPart {
    width: number;
    height: number;

    private _imageGunPistol: GameImage;

    constructor() {
        super();

        this._imageGunPistol = new GameImage("/assets/img/enemy gun pistol.png");

        this.width = 3;
        this.height = 20;
    }

    _drawPart(ctx: CanvasRenderingContext2D, deviceRatio: number) {
        ctx.drawImage(this._imageGunPistol, this.positionX, this.positionY, this.width * deviceRatio, this.height * deviceRatio);
    }
}

