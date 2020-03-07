import { List } from "../common/list";
import GameEnvironment from "./game-framework.env";

export class MathLib {
    static getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static getAngleRadians(angle: number) {
        return angle / 180.0 * Math.PI;
    }

    static getTurnPoint(x: number, y: number, angle: number) {
        if (typeof angle == 'string')
            angle = parseInt(angle);

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

export class BasePhysicEvent {
    fire(scene: any) { }
}

export class ClashPhysicEvent extends BasePhysicEvent {
    private _isCancelled = false;
    fromObject: any;
    toObjects: any;
    animation: any;

    constructor(fromObject: any, toObjects: any, animation: any) {
        super();
        this.fromObject = fromObject;
        this.toObjects = toObjects;
        this.animation = animation;
    }

    public fire(scene: any): void {
        if (this._isCancelled) {
            return;
        }

        var fromWidth = this.fromObject.width / 2 * scene.devicePixelRatio;
        var fromHeight = this.fromObject.height / 2 * scene.devicePixelRatio;
        var fromPositionX = this.fromObject.positionX;
        var fromPositionY = this.fromObject.positionY;

        for (var toObject of this.toObjects) {
            var toWidth = toObject.width / 2 * scene.devicePixelRatio;
            var toHeight = toObject.height / 2 * scene.devicePixelRatio;
            var toPositionX = toObject.positionX;
            var toPositionY = toObject.positionY;

            if (fromWidth + fromPositionY >= toPositionY - toWidth && fromPositionY - fromWidth <= toPositionY + toWidth &&
                fromPositionX - fromHeight <= toHeight + toPositionX && fromPositionX + fromHeight >= toPositionX - toHeight) {
                this._isCancelled = true;
                scene.removeDrawObject(this.fromObject);
                if (toObject.hasOwnProperty("_damage") && !toObject._damage.isLastDamage(this.fromObject.damage)) {
                    toObject._damage.remove(this.fromObject.damage);
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

export class StrikingDistancePhysicEvent extends BasePhysicEvent {
    private _isCancelled = false;
    private _object: any;
    private _strikingPosition: number;
    private _animation: BaseAnimation;

    constructor(object: any, startPositionY: number, strikingDistance: number, animation: BaseAnimation) {
        super();

        this._object = object;
        this._strikingPosition = startPositionY - strikingDistance;
        this._animation = animation;
    }

    fire(scene: any) {
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

export class BaseDrawObject {
    draw(ctx: any, deviceRatio: any) { }

    toString() {
        return "DrawObject";
    }
}

export class BaseDrawObjectPart {
    positionX: number;
    positionY: number;
    setPosition(parentPositionX: number, parentPositionY: number) {
        this.positionX = parentPositionX;
        this.positionY = parentPositionY;
    }

    draw(ctx: any, devicePixelRatio: number, positionX: number, positionY: number) {
        this.setPosition(positionX, positionY);
        this._drawPart(ctx, devicePixelRatio);
    }

    _drawPart(ctx: any, devicePixelRatio: number) {

    }
}


export class BaseAnimation {
    positionX: number;
    positionY: number;
    constructor() {
    }

    get isDestroy(): boolean { return false; }

    animate(ctx: any, scene: any) {
        if (this.isDestroy) {
            this.destroy(scene);
            return;
        }

        this._draw(ctx, scene.devicePixelRatio);
    }

    _draw(ctx: any, devicePixelRatio: any) { }

    setPosition(positionX: number, positionY: number) {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    destroy(scene: any) {
        scene.removeAnimation(this);
    }
}


export class Scene {
    _drawObjects: List<BaseDrawObject> = new List<BaseDrawObject>();
    _events: List<BasePhysicEvent> = new List<BasePhysicEvent>();
    _animations: List<BaseAnimation> = new List<BaseAnimation>();
    _ctx: any;
    width: number;
    height: number;

    constructor(canvasId: string, width: number, height: number) {

        let scene: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(canvasId);
        height -= 20;

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

    addPhysicEvent(event: any) {
        this._events.push(event);
    }

    removeEvent(event: any) {
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
    public scene: Scene;
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

    registerKeyBoardEvents(keyboardEvents: any) {
        document.addEventListener('keydown', function (event) {
            if (!keyboardEvents.hasOwnProperty(event.code))
                return;

            var keyboardEvent = keyboardEvents[event.code];
            if (typeof keyboardEvent != 'function') {
                console.warn(`Event for key ${event.code} is not a function`);
                return;
            }

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