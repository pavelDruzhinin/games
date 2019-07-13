Array.prototype.remove = function (obj) {
    var index = this.indexOf(obj);

    if (index == -1)
        return index;

    this.splice(index, 1);
    return index;
}

class MathLib {
    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static getAngleRadians(angle) {
        return angle / 180.0 * Math.PI;
    }

    static getTurnPoint(x, y, angle) {
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

class Colors {
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

class BasePhysicEvent {
    fire(scene) { }
}

class ClashPhysicEvent extends BasePhysicEvent {
    _isCancelled = false;
    constructor(fromObject, toObjects) {
        super();
        this.fromObject = fromObject;
        this.toObjects = toObjects;
    }

    fire(scene) {
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
                scene.removeDrawObject(toObject);
                this.toObjects.remove(toObject);

                scene.removeEvent(this);
                break;
            }
        }
    }
}

class BaseDrawObject {
    draw(ctx) { }

    toString() {
        return "DrawObject";
    }
}

class Scene {
    _drawObjects = [];
    _events = [];
    get devicePixelRatio() { return (('devicePixelRatio' in window) && (window.devicePixelRatio > 1)) ? window.devicePixelRatio : 1; }
    constructor(canvasId, width, height) {

        var scene = document.getElementById(canvasId);
        height -= 20;

        scene.height = height * this.devicePixelRatio;
        scene.width = width * this.devicePixelRatio;

        scene.style.width = width + 'px';
        scene.style.height = height + 'px';

        this._ctx = scene.getContext('2d');

        this.width = scene.width;
        this.height = scene.height;
    }

    addDrawObject(drawObject) {
        if (!drawObject.draw) {
            return;
        }

        this._drawObjects.push(drawObject);
    }

    addDrawObjects(drawObjects) {
        if (!drawObjects.push)
            return;

        for (var drawObject of drawObjects) {
            this.addDrawObject(drawObject);
        }
    }

    removeDrawObject(drawObject) {
        if (!drawObject.draw)
            return;

        this._drawObjects.remove(drawObject);
    }

    addPhysicEvent(event) {
        this._events.push(event);
    }

    removeEvent(event) {
        this._events.remove(event);
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
    }

    destroy() {
        this._ctx = null;
        this._drawObjects = [];
        this._events = [];
    }
}

class Game {
    constructor(canvasId, width, height) {
        this.scene = new Scene(canvasId, width, height);
    }

    run() {
        this._interval = setInterval(this.scene.update.bind(this.scene), 50);
    }

    stop() {
        clearInterval(this._interval);
    }

    registerKeyBoardEvents(keyboardEvents) {
        document.addEventListener('keydown', function (event) {
            console.log(event);
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

class GameContext {
    static getFullPath(path) {
        var context = GameEnvironment.context;
        return `${context}${path}`;
    }
}

class GameImage extends Image {
    constructor(path) {
        super();
        this.src = GameContext.getFullPath(path);
    }
}