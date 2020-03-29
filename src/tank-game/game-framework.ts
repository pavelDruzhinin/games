import { List } from "../common/list";
import GameEnvironment from "./game-framework.env";
import { BaseBullet } from './bullets/base-bullet';
import { IDamagable, TankDirections } from "./tank/tank";
import Session from "./realtime-server/session";
// import { Session } from "@heroiclabs/nakama-js";

export class GameStorage {
    private _ls: Storage;

    constructor() {
        this._ls = localStorage;
    }

    get userId() {
        return parseInt(this._ls.getItem('userId'));
    }
    set userId(value: number) {
        this._ls.setItem('userId', value.toString());
    }

    get session(): Session {
        return JSON.parse(this._ls.getItem('session'));
    }

    set session(value: Session) {
        this._ls.setItem('session', JSON.stringify(value));
    }

    get matchId(): number {
        return parseInt(this._ls.getItem('matchId'));
    }

    set matchId(value: number) {
        this._ls.setItem('matchId', value.toString());
    }
}

export class MathLib {
    static getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static getAngleRadians(angle: number) {
        return angle / 180.0 * Math.PI;
    }

    static getTurnPoint(x: number, y: number, angle: number) {
        if (isNaN(angle))
            return null;

        var angleRadians = this.getAngleRadians(angle);

        var x1 = x * Math.cos(angleRadians) + y * Math.sin(angleRadians);
        var y1 = - x * Math.sin(angleRadians) + y * Math.cos(angleRadians);

        return { x: Math.round(x1), y: Math.round(y1) };
    }
}

export class Colors {
    static black = "#000000";
    static green = '#66ff66';
    static orange = '#ff6600';
    static purple = '#ff0066';
    static blue = "#3366ff";
    static red = "#ff1a1a";
    static violet = '#6666ff';

    static getRandomColor() {
        var colors = [this.green, this.orange, this.purple, this.blue];
        var randomColorNumber = MathLib.getRandomInt(colors.length);
        return colors[randomColorNumber];
    }
}

export interface BasePhysicEvent {
    fire(scene: Scene): void;
}

export class ClashPhysicEvent implements BasePhysicEvent {
    fromObject: BaseBullet;
    toObjects: List<any>;
    animation: BaseAnimation;

    private _isCancelled = false;

    constructor(fromObject: BaseBullet, toObjects: List<any>, animation: BaseAnimation) {
        this.fromObject = fromObject;
        this.toObjects = toObjects;
        this.animation = animation;
    }

    fire(scene: Scene) {
        if (this._isCancelled) {
            return;
        }

        let fromWidth = this.fromObject.width * scene.devicePixelRatio;
        let fromHeight = this.fromObject.height * scene.devicePixelRatio;
        let fromPositionX = this.fromObject.positionX;
        let fromPositionY = this.fromObject.positionY;

        for (let toObject of this.toObjects) {
            let toWidth = toObject.width * scene.devicePixelRatio;
            let toHeight = toObject.height * scene.devicePixelRatio;
            let toPositionX = toObject.positionX;
            let toPositionY = toObject.positionY;

            if ((fromPositionY + fromHeight >= toPositionY - toHeight || fromPositionY + fromWidth >= toPositionY - toWidth)
                && (fromPositionY - fromHeight <= toPositionY + toHeight || fromPositionY - fromWidth <= toPositionY + toWidth)
                && (fromPositionX - fromHeight <= toPositionX + toHeight || fromPositionX - fromWidth <= toPositionX + toWidth)
                && (fromPositionX + fromHeight >= toPositionX - toHeight || fromPositionX + fromWidth >= toPositionX - toWidth)
            ) {
                this._isCancelled = true;
                scene.removeDrawObject(this.fromObject);

                const damageObject: IDamagable = <IDamagable>toObject;

                if (damageObject && !damageObject.damage.isLastDamage(this.fromObject.damage)) {
                    damageObject.damage.remove(this.fromObject.damage);
                } else {
                    scene.removeDrawObject(toObject);
                    this.toObjects.remove(toObject);
                }

                if (this.animation) {
                    this.animation.setPosition(fromPositionX, toPositionY + toHeight);
                    scene.addAnimation(this.animation);
                }

                scene.removeEvent(this);
                break;
            }
        }
    }
}

export class StrikingDistancePhysicEvent implements BasePhysicEvent {
    private _isCancelled = false;
    private _object: BaseBullet;
    private _strikingPosition: number;
    private _animation: BaseAnimation;

    constructor(object: BaseBullet, startPositionY: number, strikingDistance: number, animation: BaseAnimation) {
        this._object = object;
        this._strikingPosition = startPositionY - strikingDistance;
        this._animation = animation;
    }

    fire(scene: Scene) {
        if (this._isCancelled)
            return;

        if (this._object.positionY <= this._strikingPosition) {
            if (this._animation) {
                this._animation.setPosition(this._object.positionX, this._strikingPosition);
                scene.addAnimation(this._animation);
            }

            scene.removeDrawObject(this._object);
            scene.removeEvent(this);
        }
    }
}

export abstract class BaseDrawObject {
    abstract draw(ctx: CanvasRenderingContext2D, deviceRatio: number): void;
}

export abstract class BaseDrawObjectPart {
    positionX: number;
    positionY: number;
    setPosition(parentPositionX: number, parentPositionY: number) {
        this.positionX = parentPositionX;
        this.positionY = parentPositionY;
    }

    draw(ctx: CanvasRenderingContext2D, devicePixelRatio: number, positionX: number, positionY: number) {
        this.setPosition(positionX, positionY);
        this._drawPart(ctx, devicePixelRatio);
    }

    protected abstract _drawPart(ctx: CanvasRenderingContext2D, devicePixelRatio: number): void;
}


export abstract class BaseAnimation {
    positionX: number;
    positionY: number;

    get isDestroy() { return false; }

    animate(ctx: CanvasRenderingContext2D, scene: Scene) {
        if (this.isDestroy) {
            this.destroy(scene);
            return;
        }

        this._draw(ctx, scene.devicePixelRatio);
    }

    protected abstract _draw(ctx: CanvasRenderingContext2D, devicePixelRatio: number): void;

    setPosition(positionX: number, positionY: number) {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    destroy(scene: Scene) {
        scene.removeAnimation(this);
    }
}

export class Scene {
    width: number;
    height: number;

    private _drawObjects: List<BaseDrawObject> = new List<BaseDrawObject>();
    private _events: List<BasePhysicEvent> = new List<BasePhysicEvent>();
    private _animations: List<BaseAnimation> = new List<BaseAnimation>();
    private _ctx: CanvasRenderingContext2D;

    constructor(canvasId: string, width: number, height: number) {

        let scene: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(canvasId);
        height -= 20; // <-- magic constant

        scene.height = height * this.devicePixelRatio;
        scene.width = width * this.devicePixelRatio;

        scene.style.width = width + 'px';
        scene.style.height = height + 'px';

        this._ctx = scene.getContext('2d');

        this.width = scene.width;
        this.height = scene.height;
    }

    get devicePixelRatio(): number {
        return (('devicePixelRatio' in window) && (window.devicePixelRatio > 1)) ? window.devicePixelRatio : 1;
    }

    addDrawObject(drawObject: BaseDrawObject) {
        if (!drawObject.draw) {
            return;
        }

        this._drawObjects.push(drawObject);
    }

    addDrawObjects(drawObjects: BaseDrawObject[]) {
        if (!drawObjects.push)
            return;

        for (var drawObject of drawObjects) {
            this.addDrawObject(drawObject);
        }
    }

    removeDrawObject(drawObject: BaseDrawObject) {
        if (!drawObject.draw)
            return;

        this._drawObjects.remove(drawObject);
    }

    addPhysicEvent(event: BasePhysicEvent) {
        this._events.push(event);
    }

    removeEvent(event: BasePhysicEvent) {
        this._events.remove(event);
    }

    addAnimation(animation: BaseAnimation) {
        this._animations.push(animation);
    }

    removeAnimation(animation: BaseAnimation) {
        this._animations.remove(animation);
    }

    clear() {
        this._ctx.clearRect(0, 0, this.width, this.height);
    }

    update() {
        this.clear();

        for (var drawObject of this._drawObjects) {
            drawObject.draw(this._ctx, this.devicePixelRatio);
        }

        for (var event of this._events) {
            event.fire(this);
        }

        for (var animation of this._animations) {
            animation.animate(this._ctx, this);
        }
    }

    destroy() {
        this._ctx = null;
        this._drawObjects = new List<BaseDrawObject>();
        this._events = new List<BasePhysicEvent>();
    }
}

export class Game {
    scene: Scene;
    private _interval: number;

    constructor(canvasId: string, width: number, height: number) {
        this.scene = new Scene(canvasId, width, height);
    }

    run() {
        this._interval = setInterval(this.scene.update.bind(this.scene), 60);
    }

    stop() {
        clearInterval(this._interval);
    }

    registerKeyBoardEvents(keyboardEvents: Map<string, Function>) {
        document.addEventListener('keydown', function (event) {
            if (!keyboardEvents.has(event.code))
                return;

            const keyboardEvent = keyboardEvents.get(event.code);
            keyboardEvent();
        });
    }

    destroy() {
        this.stop();
        this.scene.destroy();
    }
}

export class GameContext {
    static getFullPath(path: string) {
        var context = GameEnvironment.context;
        return `${context}${path}`;
    }
}

export class GameImage extends Image {
    constructor(path: string) {
        super();
        this.src = GameContext.getFullPath(path);
    }
}