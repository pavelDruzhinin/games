// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/common/list.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var List = /*#__PURE__*/function (_Array) {
  _inherits(List, _Array);

  function List() {
    _classCallCheck(this, List);

    return _possibleConstructorReturn(this, _getPrototypeOf(List).apply(this, arguments));
  }

  _createClass(List, [{
    key: "any",
    value: function any(func) {
      if (func == null) return this.length > 0;
      return this.filter(func).length > 0;
    }
  }, {
    key: "firstIndex",
    value: function firstIndex(func) {
      var index = -1;

      for (var i = 0; i < this.length; i++) {
        var bool = func(this[i]);

        if (bool) {
          index = i;
          break;
        }
      }

      return index;
    }
  }, {
    key: "remove",
    value: function remove(obj) {
      var index = typeof obj == "function" ? this.firstIndex(obj) : this.indexOf(obj);
      if (index == -1) return;
      this.splice(index, 1);
    }
  }, {
    key: "last",
    value: function last() {
      if (!this.length) return null;
      return this[this.length - 1];
    }
  }]);

  return List;
}( /*#__PURE__*/_wrapNativeSuper(Array));

exports.List = List;
},{}],"src/tank-game/game-framework.env.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameEnvironment = /*#__PURE__*/function () {
  function GameEnvironment() {
    _classCallCheck(this, GameEnvironment);
  }

  _createClass(GameEnvironment, null, [{
    key: "context",
    get: function get() {
      return 'https://raw.githubusercontent.com/pavelDruzhinin/games/master';
    }
  }]);

  return GameEnvironment;
}();

exports.default = GameEnvironment;
},{}],"src/tank-game/game-framework.ts":[function(require,module,exports) {
"use strict";

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var list_1 = require("../common/list");

var game_framework_env_1 = __importDefault(require("./game-framework.env"));

var MathLib = /*#__PURE__*/function () {
  function MathLib() {
    _classCallCheck(this, MathLib);
  }

  _createClass(MathLib, null, [{
    key: "getRandomInt",
    value: function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }, {
    key: "getAngleRadians",
    value: function getAngleRadians(angle) {
      return angle / 180.0 * Math.PI;
    }
  }, {
    key: "getTurnPoint",
    value: function getTurnPoint(x, y, angle) {
      if (typeof angle == 'string') angle = parseInt(angle);
      if (isNaN(angle)) return null;
      var angleRadians = this.getAngleRadians(angle);
      var x1 = x * Math.cos(angleRadians) + y * Math.sin(angleRadians);
      var y1 = -x * Math.sin(angleRadians) + y * Math.cos(angleRadians);
      return {
        x: Math.round(x1),
        y: Math.round(y1)
      };
    }
  }]);

  return MathLib;
}();

exports.MathLib = MathLib;

var Colors = /*#__PURE__*/function () {
  function Colors() {
    _classCallCheck(this, Colors);
  }

  _createClass(Colors, null, [{
    key: "getRandomColor",
    value: function getRandomColor() {
      var colors = [this.green, this.orange, this.purple, this.blue];
      var randomColorNumber = MathLib.getRandomInt(colors.length);
      return colors[randomColorNumber];
    }
  }]);

  return Colors;
}();

exports.Colors = Colors;
Colors.black = "#000000";
Colors.green = '#66ff66';
Colors.orange = '#ff6600';
Colors.purple = '#ff0066';
Colors.blue = "#3366ff";
Colors.red = "#ff1a1a";
Colors.violet = '#6666ff';

var BasePhysicEvent = /*#__PURE__*/function () {
  function BasePhysicEvent() {
    _classCallCheck(this, BasePhysicEvent);
  }

  _createClass(BasePhysicEvent, [{
    key: "fire",
    value: function fire(scene) {}
  }]);

  return BasePhysicEvent;
}();

exports.BasePhysicEvent = BasePhysicEvent;

var ClashPhysicEvent = /*#__PURE__*/function (_BasePhysicEvent) {
  _inherits(ClashPhysicEvent, _BasePhysicEvent);

  function ClashPhysicEvent(fromObject, toObjects, animation) {
    var _this;

    _classCallCheck(this, ClashPhysicEvent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ClashPhysicEvent).call(this));
    _this._isCancelled = false;
    _this.fromObject = fromObject;
    _this.toObjects = toObjects;
    _this.animation = animation;
    return _this;
  }

  _createClass(ClashPhysicEvent, [{
    key: "fire",
    value: function fire(scene) {
      if (this._isCancelled) {
        return;
      }

      var fromWidth = this.fromObject.width / 2 * scene.devicePixelRatio;
      var fromHeight = this.fromObject.height / 2 * scene.devicePixelRatio;
      var fromPositionX = this.fromObject.positionX;
      var fromPositionY = this.fromObject.positionY;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.toObjects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var toObject = _step.value;
          var toWidth = toObject.width / 2 * scene.devicePixelRatio;
          var toHeight = toObject.height / 2 * scene.devicePixelRatio;
          var toPositionX = toObject.positionX;
          var toPositionY = toObject.positionY;

          if (fromWidth + fromPositionY >= toPositionY - toWidth && fromPositionY - fromWidth <= toPositionY + toWidth && fromPositionX - fromHeight <= toHeight + toPositionX && fromPositionX + fromHeight >= toPositionX - toHeight) {
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
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return ClashPhysicEvent;
}(BasePhysicEvent);

exports.ClashPhysicEvent = ClashPhysicEvent;

var StrikingDistancePhysicEvent = /*#__PURE__*/function (_BasePhysicEvent2) {
  _inherits(StrikingDistancePhysicEvent, _BasePhysicEvent2);

  function StrikingDistancePhysicEvent(object, startPositionY, strikingDistance, animation) {
    var _this2;

    _classCallCheck(this, StrikingDistancePhysicEvent);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(StrikingDistancePhysicEvent).call(this));
    _this2._isCancelled = false;
    _this2._object = object;
    _this2._strikingPosition = startPositionY - strikingDistance;
    _this2._animation = animation;
    return _this2;
  }

  _createClass(StrikingDistancePhysicEvent, [{
    key: "fire",
    value: function fire(scene) {
      if (this._isCancelled) return;

      if (this._object.positionY <= this._strikingPosition) {
        if (this._animation) {
          this._animation.setPosition(this._object.positionX, this._strikingPosition);

          scene.addAnimation(this._animation);
        }

        scene.removeDrawObject(this._object);
        scene.removeEvent(this);
      }
    }
  }]);

  return StrikingDistancePhysicEvent;
}(BasePhysicEvent);

exports.StrikingDistancePhysicEvent = StrikingDistancePhysicEvent;

var BaseDrawObject = /*#__PURE__*/function () {
  function BaseDrawObject() {
    _classCallCheck(this, BaseDrawObject);
  }

  _createClass(BaseDrawObject, [{
    key: "draw",
    value: function draw(ctx, deviceRatio) {}
  }, {
    key: "toString",
    value: function toString() {
      return "DrawObject";
    }
  }]);

  return BaseDrawObject;
}();

exports.BaseDrawObject = BaseDrawObject;

var BaseDrawObjectPart = /*#__PURE__*/function () {
  function BaseDrawObjectPart() {
    _classCallCheck(this, BaseDrawObjectPart);
  }

  _createClass(BaseDrawObjectPart, [{
    key: "setPosition",
    value: function setPosition(parentPositionX, parentPositionY) {
      this.positionX = parentPositionX;
      this.positionY = parentPositionY;
    }
  }, {
    key: "draw",
    value: function draw(ctx, devicePixelRatio, positionX, positionY) {
      this.setPosition(positionX, positionY);

      this._drawPart(ctx, devicePixelRatio);
    }
  }, {
    key: "_drawPart",
    value: function _drawPart(ctx, devicePixelRatio) {}
  }]);

  return BaseDrawObjectPart;
}();

exports.BaseDrawObjectPart = BaseDrawObjectPart;

var BaseAnimation = /*#__PURE__*/function () {
  function BaseAnimation() {
    _classCallCheck(this, BaseAnimation);
  }

  _createClass(BaseAnimation, [{
    key: "animate",
    value: function animate(ctx, scene) {
      if (this.isDestroy) {
        this.destroy(scene);
        return;
      }

      this._draw(ctx, scene.devicePixelRatio);
    }
  }, {
    key: "_draw",
    value: function _draw(ctx, devicePixelRatio) {}
  }, {
    key: "setPosition",
    value: function setPosition(positionX, positionY) {
      this.positionX = positionX;
      this.positionY = positionY;
    }
  }, {
    key: "destroy",
    value: function destroy(scene) {
      scene.removeAnimation(this);
    }
  }, {
    key: "isDestroy",
    get: function get() {
      return false;
    }
  }]);

  return BaseAnimation;
}();

exports.BaseAnimation = BaseAnimation;

var Scene = /*#__PURE__*/function () {
  function Scene(canvasId, width, height) {
    _classCallCheck(this, Scene);

    this._drawObjects = new list_1.List();
    this._events = new list_1.List();
    this._animations = new list_1.List();
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

  _createClass(Scene, [{
    key: "addDrawObject",
    value: function addDrawObject(drawObject) {
      if (!drawObject.draw) {
        return;
      }

      this._drawObjects.push(drawObject);
    }
  }, {
    key: "addDrawObjects",
    value: function addDrawObjects(drawObjects) {
      if (!drawObjects.push) return;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = drawObjects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var drawObject = _step2.value;
          this.addDrawObject(drawObject);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "removeDrawObject",
    value: function removeDrawObject(drawObject) {
      if (!drawObject.draw) return;

      this._drawObjects.remove(drawObject);
    }
  }, {
    key: "addPhysicEvent",
    value: function addPhysicEvent(event) {
      this._events.push(event);
    }
  }, {
    key: "removeEvent",
    value: function removeEvent(event) {
      this._events.remove(event);
    }
  }, {
    key: "addAnimation",
    value: function addAnimation(animation) {
      this._animations.push(animation);
    }
  }, {
    key: "removeAnimation",
    value: function removeAnimation(animation) {
      this._animations.remove(animation);
    }
  }, {
    key: "clear",
    value: function clear() {
      this._ctx.clearRect(0, 0, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update() {
      this.clear();
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._drawObjects[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var drawObject = _step3.value;
          drawObject.draw(this._ctx, this.devicePixelRatio);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this._events[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var event = _step4.value;
          event.fire(this);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this._animations[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var animation = _step5.value;
          animation.animate(this._ctx, this);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._ctx = null;
      this._drawObjects = new list_1.List();
      this._events = new list_1.List();
    }
  }, {
    key: "devicePixelRatio",
    get: function get() {
      return 'devicePixelRatio' in window && window.devicePixelRatio > 1 ? window.devicePixelRatio : 1;
    }
  }]);

  return Scene;
}();

exports.Scene = Scene;

var Game = /*#__PURE__*/function () {
  function Game(canvasId, width, height) {
    _classCallCheck(this, Game);

    this.scene = new Scene(canvasId, width, height);
  }

  _createClass(Game, [{
    key: "run",
    value: function run() {
      this._interval = setInterval(this.scene.update.bind(this.scene), 60);
    }
  }, {
    key: "stop",
    value: function stop() {
      clearInterval(this._interval);
    }
  }, {
    key: "registerKeyBoardEvents",
    value: function registerKeyBoardEvents(keyboardEvents) {
      document.addEventListener('keydown', function (event) {
        if (!keyboardEvents.hasOwnProperty(event.code)) return;
        var keyboardEvent = keyboardEvents[event.code];

        if (typeof keyboardEvent != 'function') {
          console.warn("Event for key ".concat(event.code, " is not a function"));
          return;
        }

        keyboardEvent();
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.stop();
      this.scene.destroy();
    }
  }]);

  return Game;
}();

exports.Game = Game;

var GameContext = /*#__PURE__*/function () {
  function GameContext() {
    _classCallCheck(this, GameContext);
  }

  _createClass(GameContext, null, [{
    key: "getFullPath",
    value: function getFullPath(path) {
      var context = game_framework_env_1.default.context;
      return "".concat(context).concat(path);
    }
  }]);

  return GameContext;
}();

exports.GameContext = GameContext;

var GameImage = /*#__PURE__*/function (_Image) {
  _inherits(GameImage, _Image);

  function GameImage(path) {
    var _this3;

    _classCallCheck(this, GameImage);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(GameImage).call(this));
    _this3.src = GameContext.getFullPath(path);
    return _this3;
  }

  return GameImage;
}( /*#__PURE__*/_wrapNativeSuper(Image));

exports.GameImage = GameImage;
},{"../common/list":"src/common/list.ts","./game-framework.env":"src/tank-game/game-framework.env.ts"}],"src/tank-game/tank/tank-tower.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var TankTower = /*#__PURE__*/function () {
  function TankTower(positionX, positionY) {
    _classCallCheck(this, TankTower);

    this.setPosition(positionX, positionY);
  }

  _createClass(TankTower, [{
    key: "draw",
    value: function draw(ctx, deviceRatio) {}
  }, {
    key: "fire",
    value: function fire(ammunition) {}
  }, {
    key: "setPosition",
    value: function setPosition(positionX, positionY) {
      this.positionX = positionX;
      this.positionY = positionY;
    }
  }]);

  return TankTower;
}();

exports.TankTower = TankTower;
},{}],"src/tank-game/bullets/base-bullet.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_framework_1 = require("../game-framework");

var BaseBullet = /*#__PURE__*/function (_game_framework_1$Bas) {
  _inherits(BaseBullet, _game_framework_1$Bas);

  function BaseBullet(positionX, positionY, radius, speed) {
    var _this;

    _classCallCheck(this, BaseBullet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseBullet).call(this));
    _this.positionX = positionX;
    _this.positionY = positionY;
    _this.positionX = positionX;
    _this.positionY = positionY;
    _this._radius = radius;
    _this._speed = speed;
    return _this;
  }

  _createClass(BaseBullet, [{
    key: "draw",
    value: function draw(ctx, deviceRatio) {
      this._drawBullet(ctx, deviceRatio);

      this.move(deviceRatio);
    }
  }, {
    key: "_drawBullet",
    value: function _drawBullet(ctx, deviceRatio) {}
  }, {
    key: "move",
    value: function move(deviceRatio) {
      this.positionY -= this._speed * deviceRatio;
    }
  }, {
    key: "width",
    get: function get() {
      return this._radius * 2;
    }
  }, {
    key: "height",
    get: function get() {
      return this._radius * 2;
    }
  }]);

  return BaseBullet;
}(game_framework_1.BaseDrawObject);

exports.BaseBullet = BaseBullet;
},{"../game-framework":"src/tank-game/game-framework.ts"}],"src/tank-game/bullets/bullet.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var base_bullet_1 = require("./base-bullet");

var game_framework_1 = require("../game-framework");

var Bullet = /*#__PURE__*/function (_base_bullet_1$BaseBu) {
  _inherits(Bullet, _base_bullet_1$BaseBu);

  function Bullet(startPositionX, startPositionY) {
    var _this;

    _classCallCheck(this, Bullet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bullet).call(this, startPositionX, startPositionY, 3, 20));
    _this.damage = 10;
    return _this;
  }

  _createClass(Bullet, [{
    key: "_drawBullet",
    value: function _drawBullet(ctx, deviceRatio) {
      ctx.fillStyle = game_framework_1.Colors.red;
      ctx.beginPath();
      ctx.arc(this.positionX, this.positionY, this._radius * deviceRatio, 0, 2 * Math.PI);
      ctx.fill();
    }
  }]);

  return Bullet;
}(base_bullet_1.BaseBullet);

exports.Bullet = Bullet;
},{"./base-bullet":"src/tank-game/bullets/base-bullet.ts","../game-framework":"src/tank-game/game-framework.ts"}],"src/tank-game/tank/double-barreled-tank-tower.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tank_tower_1 = require("./tank-tower");

var game_framework_1 = require("../game-framework");

var game_1 = require("../game");

var bullet_1 = require("../bullets/bullet");

var DoubleBarreledTankTower = /*#__PURE__*/function (_tank_tower_1$TankTow) {
  _inherits(DoubleBarreledTankTower, _tank_tower_1$TankTow);

  function DoubleBarreledTankTower(positionX, positionY) {
    var _this;

    _classCallCheck(this, DoubleBarreledTankTower);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DoubleBarreledTankTower).call(this, positionX, positionY));
    _this._towerImage = new game_framework_1.GameImage("/assets/img/tank tower.png");
    _this._towerRiffleImage = new game_framework_1.GameImage("/assets/img/tank riffle.png");
    _this._recharge = new game_1.RechargeTankTower(4, 0.5);
    _this.rifle1Position = 7;
    _this.rifle2Position = -5;
    _this._correctPositionY = -28;
    return _this;
  }

  _createClass(DoubleBarreledTankTower, [{
    key: "draw",
    value: function draw(ctx, deviceRatio) {
      this._recharge.process();

      this.deviceRatio = deviceRatio;

      this._drawRifle(ctx, this.rifle1Position, deviceRatio);

      this._drawRifle(ctx, this.rifle2Position, deviceRatio);

      this._drawTower(ctx, deviceRatio);
    }
  }, {
    key: "_drawTower",
    value: function _drawTower(ctx, deviceRatio) {
      ctx.drawImage(this._towerImage, this.positionX - 14 * deviceRatio, this.positionY - 15 * deviceRatio, 30 * deviceRatio, 30 * deviceRatio);
    }
  }, {
    key: "_drawRifle",
    value: function _drawRifle(ctx, x, deviceRatio) {
      ctx.drawImage(this._towerRiffleImage, this.positionX - x * deviceRatio, this.positionY + this._recharge.startRifflePosition + this._correctPositionY * deviceRatio, 3 * deviceRatio, 15 * deviceRatio);
    }
  }, {
    key: "fire",
    value: function fire() {
      if (this._recharge.inProccess) return [];

      this._recharge.start(this.deviceRatio);

      return [new bullet_1.Bullet(this.positionX - this.rifle1Position * this.deviceRatio + 1 * this.deviceRatio, this.positionY + this._correctPositionY * this.deviceRatio), new bullet_1.Bullet(this.positionX - this.rifle2Position * this.deviceRatio + 1 * this.deviceRatio, this.positionY + this._correctPositionY * this.deviceRatio)];
    }
  }]);

  return DoubleBarreledTankTower;
}(tank_tower_1.TankTower);

exports.DoubleBarreledTankTower = DoubleBarreledTankTower;
},{"./tank-tower":"src/tank-game/tank/tank-tower.ts","../game-framework":"src/tank-game/game-framework.ts","../game":"src/tank-game/game.ts","../bullets/bullet":"src/tank-game/bullets/bullet.ts"}],"src/tank-game/animations/bang-animation.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_framework_1 = require("../game-framework");

var BangAnimation = /*#__PURE__*/function (_game_framework_1$Bas) {
  _inherits(BangAnimation, _game_framework_1$Bas);

  function BangAnimation() {
    var _this;

    _classCallCheck(this, BangAnimation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BangAnimation).call(this));
    _this._bangImage = new game_framework_1.GameImage("/assets/img/bang.png");
    _this._increaseCoefEnd = 14;
    _this._increaseCoef = 1;
    return _this;
  }

  _createClass(BangAnimation, [{
    key: "_draw",
    value: function _draw(ctx, deviceRatio) {
      if (this.isDestroy) return;
      var radius = 3 * deviceRatio * this._increaseCoef;
      ctx.drawImage(this._bangImage, this.positionX - radius / 2, this.positionY - radius / 2, radius, radius);
      this._increaseCoef += 1;
    }
  }, {
    key: "isDestroy",
    get: function get() {
      return this._increaseCoef >= this._increaseCoefEnd;
    }
  }]);

  return BangAnimation;
}(game_framework_1.BaseAnimation);

exports.BangAnimation = BangAnimation;
},{"../game-framework":"src/tank-game/game-framework.ts"}],"src/tank-game/bullets/shrapnel.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var base_bullet_1 = require("./base-bullet");

var bang_animation_1 = require("../animations/bang-animation");

var game_framework_1 = require("../game-framework");

var Shrapnel = /*#__PURE__*/function (_base_bullet_1$BaseBu) {
  _inherits(Shrapnel, _base_bullet_1$BaseBu);

  function Shrapnel(startPositionX, startPositionY) {
    var _this;

    _classCallCheck(this, Shrapnel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Shrapnel).call(this, startPositionX, startPositionY, 6, 40));
    _this._shrapnelImage = new game_framework_1.GameImage("/assets/img/bullet.png");
    _this.strikingDistance = 500;
    _this.damage = 30;
    return _this;
  }

  _createClass(Shrapnel, [{
    key: "_drawBullet",
    value: function _drawBullet(ctx, devicePixelRatio) {
      ctx.drawImage(this._shrapnelImage, this.positionX, this.positionY, 3 * devicePixelRatio, 7 * devicePixelRatio);
    }
  }, {
    key: "createStrikeAnimation",
    value: function createStrikeAnimation() {
      return new bang_animation_1.BangAnimation();
    }
  }]);

  return Shrapnel;
}(base_bullet_1.BaseBullet);

exports.Shrapnel = Shrapnel;
},{"./base-bullet":"src/tank-game/bullets/base-bullet.ts","../animations/bang-animation":"src/tank-game/animations/bang-animation.ts","../game-framework":"src/tank-game/game-framework.ts"}],"src/tank-game/tank/simple-tank-tower.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tank_tower_1 = require("./tank-tower");

var shrapnel_1 = require("../bullets/shrapnel");

var game_framework_1 = require("../game-framework");

var game_1 = require("../game");

var SimpleTankTower = /*#__PURE__*/function (_tank_tower_1$TankTow) {
  _inherits(SimpleTankTower, _tank_tower_1$TankTow);

  function SimpleTankTower(positionX, positionY) {
    var _this;

    _classCallCheck(this, SimpleTankTower);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SimpleTankTower).call(this, positionX, positionY));
    _this._towerImage = new game_framework_1.GameImage("/assets/img/tank tower.png");
    _this._towerRiffleImage = new game_framework_1.GameImage("/assets/img/tank riffle.png");
    _this._recharge = new game_1.RechargeTankTower(6, 1);
    return _this;
  }

  _createClass(SimpleTankTower, [{
    key: "draw",
    value: function draw(ctx, deviceRatio) {
      this._recharge.process();

      this.deviceRatio = deviceRatio;
      ctx.drawImage(this._towerRiffleImage, this.positionX, this.positionY - 45 * deviceRatio + this._recharge.startRifflePosition, 3 * deviceRatio, 30 * deviceRatio);
      ctx.drawImage(this._towerImage, this.positionX - 14 * deviceRatio, this.positionY - 15 * deviceRatio, 30 * deviceRatio, 30 * deviceRatio);
    }
  }, {
    key: "fire",
    value: function fire(ammunition) {
      if (this._recharge.inProccess) return [];
      if (!ammunition.shrapnels) return;

      this._recharge.start(this.deviceRatio);

      return [new shrapnel_1.Shrapnel(this.positionX, this.positionY - 50 * this.deviceRatio)];
    }
  }]);

  return SimpleTankTower;
}(tank_tower_1.TankTower);

exports.SimpleTankTower = SimpleTankTower;
},{"./tank-tower":"src/tank-game/tank/tank-tower.ts","../bullets/shrapnel":"src/tank-game/bullets/shrapnel.ts","../game-framework":"src/tank-game/game-framework.ts","../game":"src/tank-game/game.ts"}],"src/tank-game/tank/base-tank-bumper.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_framework_1 = require("../game-framework");

var BaseTankBumber = /*#__PURE__*/function () {
  function BaseTankBumber(positionX, positionY) {
    _classCallCheck(this, BaseTankBumber);

    this.setPosition(positionX, positionY);
  }

  _createClass(BaseTankBumber, [{
    key: "setPosition",
    value: function setPosition(positionX, positionY) {
      this.positionX = positionX;
      this.positionY = positionY;
    }
  }, {
    key: "draw",
    value: function draw(ctx, deviceRatio) {}
  }, {
    key: "turn",
    value: function turn(isLeft) {
      var angle = isLeft ? -90 : 90;
      var newPoint = game_framework_1.MathLib.getTurnPoint(this._bumberWidth, this._bumberHeight, angle);
      this._bumberWidth = newPoint.x;
      this._bumberHeight = newPoint.y;
    }
  }]);

  return BaseTankBumber;
}();

exports.BaseTankBumber = BaseTankBumber;
},{"../game-framework":"src/tank-game/game-framework.ts"}],"src/tank-game/tank/simple-tank-bumper.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_framework_1 = require("../game-framework");

var base_tank_bumper_1 = require("./base-tank-bumper");

var SimpleTankBumber = /*#__PURE__*/function (_base_tank_bumper_1$B) {
  _inherits(SimpleTankBumber, _base_tank_bumper_1$B);

  function SimpleTankBumber(positionX, positionY) {
    var _this;

    _classCallCheck(this, SimpleTankBumber);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SimpleTankBumber).call(this, positionX, positionY));
    _this._bumberHeight = 55;
    _this._bumberWidth = 40;
    _this._angle = 0;
    _this._image = new game_framework_1.GameImage("/assets/img/tank bumper.png");
    return _this;
  }

  _createClass(SimpleTankBumber, [{
    key: "draw",
    value: function draw(ctx, deviceRatio) {
      ctx.setTransform(1, 0, 0, 1, this.positionX, this.positionY);
      ctx.rotate(game_framework_1.MathLib.getAngleRadians(this._angle));
      var bumperWidth = this._bumberWidth * deviceRatio;
      var bumperHeight = this._bumberHeight * deviceRatio;
      ctx.drawImage(this._image, -bumperWidth / 2, -bumperHeight / 2, bumperWidth, bumperHeight);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }, {
    key: "turn",
    value: function turn() {
      var isLeft = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var angle = isLeft ? -90 : 90;
      this._angle += angle;
    }
  }]);

  return SimpleTankBumber;
}(base_tank_bumper_1.BaseTankBumber);

exports.SimpleTankBumber = SimpleTankBumber;
},{"../game-framework":"src/tank-game/game-framework.ts","./base-tank-bumper":"src/tank-game/tank/base-tank-bumper.ts"}],"src/tank-game/tank/ammunition.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var TankAmunnition = /*#__PURE__*/function () {
  function TankAmunnition() {
    _classCallCheck(this, TankAmunnition);

    this._ammunitions = new Map();
    this._observables = [];
    this.bullets = false;
    this.shrapnels = false;
  }

  _createClass(TankAmunnition, [{
    key: "add",
    value: function add(ammunition) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = ammunition._ammunitions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var addShell = _step.value;

          var shells = this._ammunitions.get(addShell[0]);

          if (shells == undefined) {
            console.warn("Nonknown shells in ammunitions: ".concat(addShell[0]));
            continue;
          }

          var addShells = parseInt(addShell[1]);

          this._ammunitions.set(addShell[0], shells + addShells);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "_give",
    value: function _give(key) {
      var shells = this._ammunitions.get(key);

      if (!shells) return false;
      shells--;
      this.fireChangeEvent(key, shells);

      this._ammunitions.set(key, shells);

      return true;
    }
  }, {
    key: "onchange",
    value: function onchange(observable) {
      this._observables.push(observable);
    }
  }, {
    key: "fireChangeEvent",
    value: function fireChangeEvent(key, value) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._observables[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var observable = _step2.value;
          if (typeof observable == 'function') observable(key, value);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "bullets",
    get: function get() {
      return this._give('bullets');
    },
    set: function set(value) {
      this._ammunitions.set('bullets', value);
    }
  }, {
    key: "shrapnels",
    get: function get() {
      return this._give('shrapnels');
    },
    set: function set(value) {
      this._ammunitions.set('shrapnels', value);
    }
  }]);

  return TankAmunnition;
}();

exports.TankAmunnition = TankAmunnition;
},{}],"src/tank-game/tank/tank.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_framework_1 = require("../game-framework");

var double_barreled_tank_tower_1 = require("./double-barreled-tank-tower");

var simple_tank_tower_1 = require("./simple-tank-tower");

var simple_tank_bumper_1 = require("./simple-tank-bumper");

var ammunition_1 = require("./ammunition");

var Damage = /*#__PURE__*/function (_game_framework_1$Bas) {
  _inherits(Damage, _game_framework_1$Bas);

  function Damage(positionX, positionY) {
    var _this;

    _classCallCheck(this, Damage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Damage).call(this));
    _this.health = 100;

    _this.setPosition(positionX, positionY);

    return _this;
  }

  _createClass(Damage, [{
    key: "draw",
    value: function draw(ctx, deviceRatio) {
      ctx.rect(this.positionX, this.positionY, this.health, 10);
      ctx.fillStyle = game_framework_1.Colors.green;
      ctx.fillRect(this.positionX, this.positionY, this.health, 10);
    }
  }, {
    key: "setPosition",
    value: function setPosition(positionX, positionY) {
      this.positionX = positionX;
      this.positionY = positionY;
    }
  }, {
    key: "remove",
    value: function remove(damage) {
      this.health -= damage;
    }
  }, {
    key: "isLastDamage",
    value: function isLastDamage(damage) {
      return this.health - damage < 0;
    }
  }]);

  return Damage;
}(game_framework_1.BaseDrawObject);

exports.Damage = Damage;

var Tank = /*#__PURE__*/function (_game_framework_1$Bas2) {
  _inherits(Tank, _game_framework_1$Bas2);

  function Tank(startPositionX, startPositionY, speed) {
    var _this2;

    _classCallCheck(this, Tank);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Tank).call(this));
    _this2._currentDirection = 'up';
    _this2._bumberHeight = 40;
    _this2._bumberWidth = 30;
    _this2._ammunition = new ammunition_1.TankAmunnition();
    _this2.positionX = startPositionX;
    _this2.positionY = startPositionY;
    _this2.speed = speed;
    _this2._bumber = new simple_tank_bumper_1.SimpleTankBumber(startPositionX, startPositionY);
    _this2._towers = [new simple_tank_tower_1.SimpleTankTower(startPositionX, startPositionY), new double_barreled_tank_tower_1.DoubleBarreledTankTower(startPositionX, startPositionY)];
    _this2.tower = _this2._towers[0];
    _this2._damage = new Damage(startPositionX - 50, startPositionY + 60);
    return _this2;
  }

  _createClass(Tank, [{
    key: "addAmunnition",
    value: function addAmunnition(ammunition) {
      this._ammunition.add(ammunition);
    }
  }, {
    key: "changeTower",
    value: function changeTower() {
      var _this3 = this;

      var tankTower = this._towers.filter(function (el) {
        return el != _this3.tower;
      })[0];

      tankTower.setPosition(this.positionX, this.positionY);
      this.tower = tankTower;
    }
  }, {
    key: "move",
    value: function move(direction) {
      if (this._currentDirection != direction) {
        this._turn(direction);

        return;
      }

      switch (direction) {
        case 'up':
          this.positionY -= this.speed * this.deviceRatio;
          break;

        case 'right':
          this.positionX += this.speed * this.deviceRatio;
          break;

        case 'left':
          this.positionX -= this.speed * this.deviceRatio;
          break;

        case 'down':
          this.positionY += this.speed * this.deviceRatio;
          break;
      }
    }
  }, {
    key: "_turn",
    value: function _turn(direction) {
      var directions = ['up', 'right', 'down', 'left'];
      var currentDirectionIndex = directions.indexOf(this._currentDirection);
      var currentDirectionScope = this.getCurrentDirectionScope(directions, currentDirectionIndex);
      console.log(currentDirectionScope);
      var currentDirectionScopeIndex = currentDirectionScope.indexOf(this._currentDirection);
      var whereDirectionIndex = currentDirectionScope.indexOf(direction);

      if (whereDirectionIndex == -1) {
        whereDirectionIndex = 2;
      }

      if (whereDirectionIndex > currentDirectionScopeIndex) {
        currentDirectionIndex++;
        if (currentDirectionIndex > directions.length - 1) currentDirectionIndex = 0;

        this._bumber.turn();
      } else {
        currentDirectionIndex--;
        if (currentDirectionIndex < 0) currentDirectionIndex = directions.length - 1;

        this._bumber.turn(true);
      }

      this._currentDirection = directions[currentDirectionIndex];
    }
  }, {
    key: "getCurrentDirectionScope",
    value: function getCurrentDirectionScope(directions, currentIndex) {
      var scope = [directions[currentIndex]];
      var nextIndex = currentIndex + 1;
      var prevIndex = currentIndex - 1;

      if (nextIndex > directions.length - 1) {
        nextIndex = 0;
      }

      if (prevIndex < 0) {
        prevIndex = directions.length - 1;
      }

      scope.unshift(directions[prevIndex]);
      scope.push(directions[nextIndex]);
      console.log('scope indexes', prevIndex, currentIndex, nextIndex);
      return scope;
    }
  }, {
    key: "fire",
    value: function fire() {
      return this.tower.fire(this._ammunition);
    }
  }, {
    key: "draw",
    value: function draw(ctx, deviceRatio) {
      this.deviceRatio = deviceRatio;

      this._bumber.setPosition(this.positionX, this.positionY);

      this._bumber.draw(ctx, deviceRatio);

      this.tower.setPosition(this.positionX, this.positionY);
      this.tower.draw(ctx, deviceRatio);

      this._damage.setPosition(this.positionX - 50, this.positionY + 60);

      this._damage.draw(ctx, deviceRatio);
    }
  }]);

  return Tank;
}(game_framework_1.BaseDrawObject);

exports.Tank = Tank;
},{"../game-framework":"src/tank-game/game-framework.ts","./double-barreled-tank-tower":"src/tank-game/tank/double-barreled-tank-tower.ts","./simple-tank-tower":"src/tank-game/tank/simple-tank-tower.ts","./simple-tank-bumper":"src/tank-game/tank/simple-tank-bumper.ts","./ammunition":"src/tank-game/tank/ammunition.ts"}],"src/tank-game/enemies/enemy.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_framework_1 = require("../game-framework");

var bullet_1 = require("../bullets/bullet");

var tank_1 = require("../tank/tank");

var Enemy = /*#__PURE__*/function (_game_framework_1$Bas) {
  _inherits(Enemy, _game_framework_1$Bas);

  function Enemy(startPositionX, startPositionY, speedLevel) {
    var _this;

    _classCallCheck(this, Enemy);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Enemy).call(this));
    _this.positionX = startPositionX;
    _this.positionY = startPositionY;
    _this._speedLevel = speedLevel;
    _this._head = new EnemyHead();
    _this._gun1 = new EnemyGun();
    _this._gun2 = new EnemyGun();
    _this._damage = new tank_1.Damage(startPositionX, startPositionY - 20);
    _this.width = 30;
    _this.height = 60;
    return _this;
  }

  _createClass(Enemy, [{
    key: "draw",
    value: function draw(ctx, deviceRatio) {
      this._head.draw(ctx, deviceRatio, this.positionX, this.positionY);

      this._gun1.draw(ctx, deviceRatio, this.positionX - 12 * deviceRatio, this.positionY + 30 * deviceRatio);

      this._gun2.draw(ctx, deviceRatio, this.positionX + 50 * deviceRatio, this.positionY + 30 * deviceRatio);

      this._damage.setPosition(this.positionX, this.positionY - 20);

      this._damage.draw(ctx, deviceRatio);

      this.move(deviceRatio);
    }
  }, {
    key: "move",
    value: function move(deviceRatio) {
      this.positionY += game_framework_1.MathLib.getRandomInt(2) * this._speedLevel * deviceRatio;
    }
  }, {
    key: "fire",
    value: function fire() {
      return this._gun1.fire();
    }
  }]);

  return Enemy;
}(game_framework_1.BaseDrawObject);

exports.Enemy = Enemy;

var EnemyHead = /*#__PURE__*/function (_game_framework_1$Bas2) {
  _inherits(EnemyHead, _game_framework_1$Bas2);

  function EnemyHead() {
    var _this2;

    _classCallCheck(this, EnemyHead);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(EnemyHead).call(this));
    _this2._imageHead = new game_framework_1.GameImage("/assets/img/enemy head.png");
    _this2.width = 50;
    _this2.height = 75;
    return _this2;
  }

  _createClass(EnemyHead, [{
    key: "_drawPart",
    value: function _drawPart(ctx, deviceRatio) {
      ctx.drawImage(this._imageHead, this.positionX, this.positionY, this.width * deviceRatio, this.height * deviceRatio);
    }
  }]);

  return EnemyHead;
}(game_framework_1.BaseDrawObjectPart);

var EnemyGun = /*#__PURE__*/function (_game_framework_1$Bas3) {
  _inherits(EnemyGun, _game_framework_1$Bas3);

  function EnemyGun() {
    var _this3;

    _classCallCheck(this, EnemyGun);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(EnemyGun).call(this));
    _this3._imageGun = new game_framework_1.GameImage("/assets/img/enemy gun.png");
    _this3.width = 12;
    _this3.height = 12;
    _this3._pistols = [new EnemyGunPistol(), new EnemyGunPistol(), new EnemyGunPistol(), new EnemyGunPistol()];
    return _this3;
  }

  _createClass(EnemyGun, [{
    key: "_drawPart",
    value: function _drawPart(ctx, deviceRatio) {
      ctx.drawImage(this._imageGun, this.positionX, this.positionY, this.width * deviceRatio, this.height * deviceRatio);

      for (var i = 0; i < this._pistols.length; i++) {
        this._pistols[i].draw(ctx, deviceRatio, this.positionX + this._pistols[i].width * deviceRatio * i, this.positionY + 10 * deviceRatio);
      }
    }
  }, {
    key: "fire",
    value: function fire() {
      return [new bullet_1.Bullet(this.positionX, this.positionY)];
    }
  }]);

  return EnemyGun;
}(game_framework_1.BaseDrawObjectPart);

var EnemyGunPistol = /*#__PURE__*/function (_game_framework_1$Bas4) {
  _inherits(EnemyGunPistol, _game_framework_1$Bas4);

  function EnemyGunPistol() {
    var _this4;

    _classCallCheck(this, EnemyGunPistol);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(EnemyGunPistol).call(this));
    _this4._imageGunPistol = new game_framework_1.GameImage("/assets/img/enemy gun pistol.png");
    _this4.width = 3;
    _this4.height = 20;
    return _this4;
  }

  _createClass(EnemyGunPistol, [{
    key: "_drawPart",
    value: function _drawPart(ctx, deviceRatio) {
      ctx.drawImage(this._imageGunPistol, this.positionX, this.positionY, this.width * deviceRatio, this.height * deviceRatio);
    }
  }]);

  return EnemyGunPistol;
}(game_framework_1.BaseDrawObjectPart);
},{"../game-framework":"src/tank-game/game-framework.ts","../bullets/bullet":"src/tank-game/bullets/bullet.ts","../tank/tank":"src/tank-game/tank/tank.ts"}],"node_modules/@heroiclabs/nakama-js/dist/nakama-js.umd.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.nakamajs = {})));
}(this, (function (exports) { 'use strict';

(function () {

  var object =
    typeof exports != 'undefined' ? exports :
    typeof self != 'undefined' ? self : // #8: web workers
    $.global; // #31: ExtendScript

  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  function InvalidCharacterError(message) {
    this.message = message;
  }
  InvalidCharacterError.prototype = new Error;
  InvalidCharacterError.prototype.name = 'InvalidCharacterError';

  // encoder
  // [https://gist.github.com/999166] by [https://github.com/nignag]
  object.btoa || (
  object.btoa = function (input) {
    var str = String(input);
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars, output = '';
      // if the next str index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      str.charAt(idx | 0) || (map = '=', idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
    ) {
      charCode = str.charCodeAt(idx += 3/4);
      if (charCode > 0xFF) {
        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }
      block = block << 8 | charCode;
    }
    return output;
  });

  // decoder
  // [https://gist.github.com/1020396] by [https://github.com/atk]
  object.atob || (
  object.atob = function (input) {
    var str = String(input).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=
    if (str.length % 4 == 1) {
      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      // initialize result and counters
      var bc = 0, bs, buffer, idx = 0, output = '';
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  });

}());

(function(self) {
  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    };

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue+','+value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) { items.push(name); });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) { items.push(value); });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) { items.push([name, value]); });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = 'status' in options ? options.status : 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : window);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

















function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var BASE_PATH = "http://127.0.0.1:80";
var NakamaApi = function (configuration) {
    if (configuration === void 0) { configuration = {
        basePath: BASE_PATH,
        bearerToken: "",
        password: "",
        username: "",
        timeoutMs: 5000,
    }; }
    return {
        healthcheck: function (options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/healthcheck";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        getAccount: function (options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/account";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        updateAccount: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "PUT" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        authenticateCustom: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/authenticate/custom";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        authenticateDevice: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/authenticate/device";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        authenticateEmail: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/authenticate/email";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        authenticateFacebook: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/authenticate/facebook";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        authenticateGameCenter: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/authenticate/gamecenter";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        authenticateGoogle: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/authenticate/google";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        authenticateSteam: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/authenticate/steam";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        linkCustom: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/link/custom";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        linkDevice: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/link/device";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        linkEmail: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/link/email";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        linkFacebook: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/link/facebook";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        linkGameCenter: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/link/gamecenter";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        linkGoogle: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/link/google";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        linkSteam: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/link/steam";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        unlinkCustom: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/unlink/custom";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        unlinkDevice: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/unlink/device";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        unlinkEmail: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/unlink/email";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        unlinkFacebook: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/unlink/facebook";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        unlinkGameCenter: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/unlink/gamecenter";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        unlinkGoogle: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/unlink/google";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        unlinkSteam: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/account/unlink/steam";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        listChannelMessages: function (channelId, limit, forward, cursor, options) {
            if (options === void 0) { options = {}; }
            if (channelId === null || channelId === undefined) {
                throw new Error("'channelId' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/channel/{channel_id}"
                .replace("{channel_id}", encodeURIComponent(String(channelId)));
            var queryParams = {
                limit: limit,
                forward: forward,
                cursor: cursor,
            };
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        deleteFriends: function (ids, usernames, options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/friend";
            var queryParams = {
                ids: ids,
                usernames: usernames,
            };
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "DELETE" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        listFriends: function (options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/friend";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        addFriends: function (options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/friend";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        blockFriends: function (options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/friend/block";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        importFacebookFriends: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/friend/facebook";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        listGroups: function (name, cursor, limit, options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/group";
            var queryParams = {
                name: name,
                cursor: cursor,
                limit: limit,
            };
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        createGroup: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/group";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        deleteGroup: function (groupId, options) {
            if (options === void 0) { options = {}; }
            if (groupId === null || groupId === undefined) {
                throw new Error("'groupId' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/group/{group_id}"
                .replace("{group_id}", encodeURIComponent(String(groupId)));
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "DELETE" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        updateGroup: function (groupId, body, options) {
            if (options === void 0) { options = {}; }
            if (groupId === null || groupId === undefined) {
                throw new Error("'groupId' is a required parameter but is null or undefined.");
            }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/group/{group_id}"
                .replace("{group_id}", encodeURIComponent(String(groupId)));
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "PUT" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        addGroupUsers: function (groupId, options) {
            if (options === void 0) { options = {}; }
            if (groupId === null || groupId === undefined) {
                throw new Error("'groupId' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/group/{group_id}/add"
                .replace("{group_id}", encodeURIComponent(String(groupId)));
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        joinGroup: function (groupId, options) {
            if (options === void 0) { options = {}; }
            if (groupId === null || groupId === undefined) {
                throw new Error("'groupId' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/group/{group_id}/join"
                .replace("{group_id}", encodeURIComponent(String(groupId)));
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        kickGroupUsers: function (groupId, options) {
            if (options === void 0) { options = {}; }
            if (groupId === null || groupId === undefined) {
                throw new Error("'groupId' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/group/{group_id}/kick"
                .replace("{group_id}", encodeURIComponent(String(groupId)));
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        leaveGroup: function (groupId, options) {
            if (options === void 0) { options = {}; }
            if (groupId === null || groupId === undefined) {
                throw new Error("'groupId' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/group/{group_id}/leave"
                .replace("{group_id}", encodeURIComponent(String(groupId)));
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        promoteGroupUsers: function (groupId, options) {
            if (options === void 0) { options = {}; }
            if (groupId === null || groupId === undefined) {
                throw new Error("'groupId' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/group/{group_id}/promote"
                .replace("{group_id}", encodeURIComponent(String(groupId)));
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        listGroupUsers: function (groupId, options) {
            if (options === void 0) { options = {}; }
            if (groupId === null || groupId === undefined) {
                throw new Error("'groupId' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/group/{group_id}/user"
                .replace("{group_id}", encodeURIComponent(String(groupId)));
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        deleteLeaderboardRecord: function (leaderboardId, options) {
            if (options === void 0) { options = {}; }
            if (leaderboardId === null || leaderboardId === undefined) {
                throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/leaderboard/{leaderboard_id}"
                .replace("{leaderboard_id}", encodeURIComponent(String(leaderboardId)));
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "DELETE" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        listLeaderboardRecords: function (leaderboardId, ownerIds, limit, cursor, options) {
            if (options === void 0) { options = {}; }
            if (leaderboardId === null || leaderboardId === undefined) {
                throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/leaderboard/{leaderboard_id}"
                .replace("{leaderboard_id}", encodeURIComponent(String(leaderboardId)));
            var queryParams = {
                owner_ids: ownerIds,
                limit: limit,
                cursor: cursor,
            };
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        writeLeaderboardRecord: function (leaderboardId, body, options) {
            if (options === void 0) { options = {}; }
            if (leaderboardId === null || leaderboardId === undefined) {
                throw new Error("'leaderboardId' is a required parameter but is null or undefined.");
            }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/leaderboard/{leaderboard_id}"
                .replace("{leaderboard_id}", encodeURIComponent(String(leaderboardId)));
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        listMatches: function (limit, authoritative, label, minSize, maxSize, options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/match";
            var queryParams = {
                limit: limit,
                authoritative: authoritative,
                label: label,
                min_size: minSize,
                max_size: maxSize,
            };
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        deleteNotifications: function (ids, options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/notification";
            var queryParams = {
                ids: ids,
            };
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "DELETE" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        listNotifications: function (limit, cacheableCursor, options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/notification";
            var queryParams = {
                limit: limit,
                cacheable_cursor: cacheableCursor,
            };
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        rpcFunc2: function (id, payload, httpKey, options) {
            if (options === void 0) { options = {}; }
            if (id === null || id === undefined) {
                throw new Error("'id' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/rpc/{id}"
                .replace("{id}", encodeURIComponent(String(id)));
            var queryParams = {
                payload: payload,
                http_key: httpKey,
            };
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        rpcFunc: function (id, body, options) {
            if (options === void 0) { options = {}; }
            if (id === null || id === undefined) {
                throw new Error("'id' is a required parameter but is null or undefined.");
            }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/rpc/{id}"
                .replace("{id}", encodeURIComponent(String(id)));
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        readStorageObjects: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/storage";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "POST" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        writeStorageObjects: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/storage";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "PUT" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        deleteStorageObjects: function (body, options) {
            if (options === void 0) { options = {}; }
            if (body === null || body === undefined) {
                throw new Error("'body' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/storage/delete";
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "PUT" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            fetchOptions.body = JSON.stringify(body || {});
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        listStorageObjects: function (collection, userId, limit, cursor, options) {
            if (options === void 0) { options = {}; }
            if (collection === null || collection === undefined) {
                throw new Error("'collection' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/storage/{collection}"
                .replace("{collection}", encodeURIComponent(String(collection)));
            var queryParams = {
                user_id: userId,
                limit: limit,
                cursor: cursor,
            };
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        listStorageObjects2: function (collection, userId, limit, cursor, options) {
            if (options === void 0) { options = {}; }
            if (collection === null || collection === undefined) {
                throw new Error("'collection' is a required parameter but is null or undefined.");
            }
            if (userId === null || userId === undefined) {
                throw new Error("'userId' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/storage/{collection}/{user_id}"
                .replace("{collection}", encodeURIComponent(String(collection)))
                .replace("{user_id}", encodeURIComponent(String(userId)));
            var queryParams = {
                limit: limit,
                cursor: cursor,
            };
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        getUsers: function (ids, usernames, facebookIds, options) {
            if (options === void 0) { options = {}; }
            var urlPath = "/v2/user";
            var queryParams = {
                ids: ids,
                usernames: usernames,
                facebook_ids: facebookIds,
            };
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
        listUserGroups: function (userId, options) {
            if (options === void 0) { options = {}; }
            if (userId === null || userId === undefined) {
                throw new Error("'userId' is a required parameter but is null or undefined.");
            }
            var urlPath = "/v2/user/{user_id}/group"
                .replace("{user_id}", encodeURIComponent(String(userId)));
            var queryParams = {};
            var urlQuery = "?" + Object.keys(queryParams)
                .map(function (k) {
                if (queryParams[k] instanceof Array) {
                    return queryParams[k].reduce(function (prev, curr) {
                        return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                    }, "");
                }
                else {
                    if (queryParams[k] != null) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                    }
                }
            })
                .join("");
            var fetchOptions = __assign({ method: "GET" }, options);
            var headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            };
            if (configuration.bearerToken) {
                headers["Authorization"] = "Bearer " + configuration.bearerToken;
            }
            else if (configuration.username) {
                headers["Authorization"] = "Basic " + btoa(configuration.username + ":" + configuration.password);
            }
            fetchOptions.headers = __assign({}, headers, options.headers);
            return Promise.race([
                fetch(configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                }),
                new Promise(function (_, reject) {
                    return setTimeout(reject, configuration.timeoutMs, "Request timed out.");
                }),
            ]);
        },
    };
};

var Session = (function () {
    function Session(token, created_at, expires_at, username, user_id) {
        this.token = token;
        this.created_at = created_at;
        this.expires_at = expires_at;
        this.username = username;
        this.user_id = user_id;
    }
    Session.prototype.isexpired = function (currenttime) {
        return (this.expires_at - currenttime) < 0;
    };
    Session.restore = function (jwt) {
        var createdAt = Math.floor(new Date().getTime() / 1000);
        var parts = jwt.split('.');
        if (parts.length != 3) {
            throw 'jwt is not valid.';
        }
        var decoded = JSON.parse(atob(parts[1]));
        var expiresAt = Math.floor(parseInt(decoded['exp']));
        return new Session(jwt, createdAt, expiresAt, decoded['usn'], decoded['uid']);
    };
    return Session;
}());

var DefaultSocket = (function () {
    function DefaultSocket(host, port, useSSL, verbose) {
        if (useSSL === void 0) { useSSL = false; }
        if (verbose === void 0) { verbose = false; }
        this.host = host;
        this.port = port;
        this.useSSL = useSSL;
        this.verbose = verbose;
        this.cIds = {};
    }
    DefaultSocket.prototype.generatecid = function () {
        return __spread(Array(30)).map(function () { return Math.random().toString(36)[3]; }).join('');
    };
    DefaultSocket.prototype.connect = function (session, createStatus) {
        var _this = this;
        if (createStatus === void 0) { createStatus = false; }
        if (this.socket != undefined) {
            return Promise.resolve(session);
        }
        var scheme = (this.useSSL) ? "wss://" : "ws://";
        var url = "" + scheme + this.host + ":" + this.port + "/ws?lang=en&status=" + encodeURIComponent(createStatus.toString()) + "&token=" + encodeURIComponent(session.token);
        var socket = new WebSocket(url);
        this.socket = socket;
        socket.onclose = function (evt) {
            _this.ondisconnect(evt);
            _this.socket = undefined;
        };
        socket.onerror = function (evt) {
            _this.onerror(evt);
        };
        socket.onmessage = function (evt) {
            var message = JSON.parse(evt.data);
            if (_this.verbose && window && window.console) {
                console.log("Response: %o", message);
            }
            if (message.cid == undefined) {
                if (message.notifications) {
                    message.notifications.notifications.forEach(function (n) {
                        var notification = {
                            code: n.code,
                            create_time: n.create_time,
                            id: n.id,
                            persistent: n.persistent,
                            sender_id: n.sender_id,
                            subject: n.subject,
                            content: n.content ? JSON.parse(n.content) : undefined
                        };
                        _this.onnotification(notification);
                    });
                }
                else if (message.match_data) {
                    message.match_data.data = message.match_data.data != null ? JSON.parse(atob(message.match_data.data)) : null;
                    message.match_data.op_code = parseInt(message.match_data.op_code);
                    _this.onmatchdata(message.match_data);
                }
                else if (message.match_presence_event) {
                    _this.onmatchpresence(message.match_presence_event);
                }
                else if (message.matchmaker_matched) {
                    _this.onmatchmakermatched(message.matchmaker_matched);
                }
                else if (message.status_presence_event) {
                    _this.onstatuspresence(message.status_presence_event);
                }
                else if (message.stream_presence_event) {
                    _this.onstreampresence(message.stream_presence_event);
                }
                else if (message.stream_data) {
                    _this.onstreamdata(message.stream_data);
                }
                else if (message.channel_message) {
                    message.channel_message.content = JSON.parse(message.channel_message.content);
                    _this.onchannelmessage(message.channel_message);
                }
                else if (message.channel_presence_event) {
                    _this.onchannelpresence(message.channel_presence_event);
                }
                else {
                    if (_this.verbose && window && window.console) {
                        console.log("Unrecognized message received: %o", message);
                    }
                }
            }
            else {
                var executor = _this.cIds[message.cid];
                if (!executor) {
                    if (_this.verbose && window && window.console) {
                        console.error("No promise executor for message: %o", message);
                    }
                    return;
                }
                delete _this.cIds[message.cid];
                if (message.error) {
                    executor.reject(message.error);
                }
                else {
                    executor.resolve(message);
                }
            }
        };
        return new Promise(function (resolve, reject) {
            socket.onopen = function (evt) {
                if (_this.verbose && window && window.console) {
                    console.log(evt);
                }
                resolve(session);
            };
            socket.onerror = function (evt) {
                reject(evt);
                socket.close();
                _this.socket = undefined;
            };
        });
    };
    DefaultSocket.prototype.disconnect = function (fireDisconnectEvent) {
        if (fireDisconnectEvent === void 0) { fireDisconnectEvent = true; }
        if (this.socket != undefined) {
            this.socket.close();
        }
        if (fireDisconnectEvent) {
            this.ondisconnect({});
        }
    };
    DefaultSocket.prototype.ondisconnect = function (evt) {
        if (this.verbose && window && window.console) {
            console.log(evt);
        }
    };
    DefaultSocket.prototype.onerror = function (evt) {
        if (this.verbose && window && window.console) {
            console.log(evt);
        }
    };
    DefaultSocket.prototype.onchannelmessage = function (channelMessage) {
        if (this.verbose && window && window.console) {
            console.log(channelMessage);
        }
    };
    DefaultSocket.prototype.onchannelpresence = function (channelPresence) {
        if (this.verbose && window && window.console) {
            console.log(channelPresence);
        }
    };
    DefaultSocket.prototype.onnotification = function (notification) {
        if (this.verbose && window && window.console) {
            console.log(notification);
        }
    };
    DefaultSocket.prototype.onmatchdata = function (matchData) {
        if (this.verbose && window && window.console) {
            console.log(matchData);
        }
    };
    DefaultSocket.prototype.onmatchpresence = function (matchPresence) {
        if (this.verbose && window && window.console) {
            console.log(matchPresence);
        }
    };
    DefaultSocket.prototype.onmatchmakermatched = function (matchmakerMatched) {
        if (this.verbose && window && window.console) {
            console.log(matchmakerMatched);
        }
    };
    DefaultSocket.prototype.onstatuspresence = function (statusPresence) {
        if (this.verbose && window && window.console) {
            console.log(statusPresence);
        }
    };
    DefaultSocket.prototype.onstreampresence = function (streamPresence) {
        if (this.verbose && window && window.console) {
            console.log(streamPresence);
        }
    };
    DefaultSocket.prototype.onstreamdata = function (streamData) {
        if (this.verbose && window && window.console) {
            console.log(streamData);
        }
    };
    DefaultSocket.prototype.send = function (message) {
        var _this = this;
        var m = message;
        return new Promise(function (resolve, reject) {
            if (_this.socket == undefined) {
                reject("Socket connection has not been established yet.");
            }
            else {
                if (m.match_data_send) {
                    m.match_data_send.data = btoa(JSON.stringify(m.match_data_send.data));
                    m.match_data_send.op_code = m.match_data_send.op_code.toString();
                    _this.socket.send(JSON.stringify(m));
                    resolve();
                }
                else {
                    if (m.channel_message_send) {
                        m.channel_message_send.content = JSON.stringify(m.channel_message_send.content);
                    }
                    else if (m.channel_message_update) {
                        m.channel_message_update.content = JSON.stringify(m.channel_message_update.content);
                    }
                    var cid = _this.generatecid();
                    _this.cIds[cid] = {
                        resolve: resolve,
                        reject: reject
                    };
                    m.cid = cid;
                    _this.socket.send(JSON.stringify(m));
                }
            }
            if (_this.verbose && window && window.console) {
                console.log("Sent message: %o", m);
            }
        });
    };
    return DefaultSocket;
}());

var DEFAULT_HOST = "127.0.0.1";
var DEFAULT_PORT = "7350";
var DEFAULT_SERVER_KEY = "defaultkey";
var DEFAULT_TIMEOUT_MS = 7000;
var Client = (function () {
    function Client(serverkey, host, port, useSSL, timeout, verbose) {
        if (serverkey === void 0) { serverkey = DEFAULT_SERVER_KEY; }
        if (host === void 0) { host = DEFAULT_HOST; }
        if (port === void 0) { port = DEFAULT_PORT; }
        if (useSSL === void 0) { useSSL = false; }
        if (timeout === void 0) { timeout = DEFAULT_TIMEOUT_MS; }
        if (verbose === void 0) { verbose = false; }
        this.serverkey = serverkey;
        this.host = host;
        this.port = port;
        this.useSSL = useSSL;
        this.timeout = timeout;
        this.verbose = verbose;
        var scheme = (useSSL) ? "https://" : "http://";
        var basePath = "" + scheme + host + ":" + port;
        this.configuration = {
            basePath: basePath,
            username: serverkey,
            password: "",
            timeoutMs: timeout,
        };
        this.apiClient = NakamaApi(this.configuration);
    }
    Client.prototype.addGroupUsers = function (session, groupId, ids) {
        var _this = this;
        this.configuration.bearerToken = (session && session.token);
        var urlPath = "/v2/group/" + groupId + "/add";
        var queryParams = {
            user_ids: ids
        };
        var urlQuery = "?" + Object.keys(queryParams)
            .map(function (k) {
            if (queryParams[k] instanceof Array) {
                return queryParams[k].reduce(function (prev, curr) {
                    return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                }, "");
            }
            else {
                if (queryParams[k] != null) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            }
        })
            .join("");
        var fetchOptions = __assign({ method: "POST" });
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        if (this.configuration.bearerToken) {
            headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
        }
        else if (this.configuration.username) {
            headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        fetchOptions.headers = __assign({}, headers);
        return Promise.race([
            fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            }),
            new Promise(function (_, reject) {
                return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
            }),
        ]).then(function (response) {
            return Promise.resolve(response != undefined);
        });
    };
    Client.prototype.addFriends = function (session, ids, usernames) {
        var _this = this;
        this.configuration.bearerToken = (session && session.token);
        var urlPath = "/v2/friend";
        var queryParams = {
            ids: ids,
            usernames: usernames
        };
        var urlQuery = "?" + Object.keys(queryParams)
            .map(function (k) {
            if (queryParams[k] instanceof Array) {
                return queryParams[k].reduce(function (prev, curr) {
                    return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                }, "");
            }
            else {
                if (queryParams[k] != null) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            }
        })
            .join("");
        var fetchOptions = __assign({ method: "POST" });
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        if (this.configuration.bearerToken) {
            headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
        }
        else if (this.configuration.username) {
            headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        fetchOptions.headers = __assign({}, headers);
        return Promise.race([
            fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            }),
            new Promise(function (_, reject) {
                return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
            }),
        ]).then(function (response) {
            return Promise.resolve(response != undefined);
        });
    };
    Client.prototype.authenticateCustom = function (request) {
        var _this = this;
        var urlPath = "/v2/account/authenticate/custom";
        var queryParams = {
            username: request.username,
            create: request.create
        };
        var urlQuery = "?" + Object.keys(queryParams)
            .map(function (k) {
            if (queryParams[k] instanceof Array) {
                return queryParams[k].reduce(function (prev, curr) {
                    return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                }, "");
            }
            else {
                if (queryParams[k] != null) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            }
        })
            .join("");
        var fetchOptions = __assign({ method: "POST" });
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        if (this.configuration.bearerToken) {
            headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
        }
        else if (this.configuration.username) {
            headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        fetchOptions.headers = __assign({}, headers);
        fetchOptions.body = JSON.stringify({
            id: request.id
        });
        console.log;
        return Promise.race([
            fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            }),
            new Promise(function (_, reject) {
                return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
            }),
        ]).then(function (apiSession) {
            return Session.restore(apiSession.token || "");
        });
    };
    Client.prototype.authenticateDevice = function (request) {
        var _this = this;
        var urlPath = "/v2/account/authenticate/device";
        var queryParams = {
            username: request.username,
            create: request.create
        };
        var urlQuery = "?" + Object.keys(queryParams)
            .map(function (k) {
            if (queryParams[k] instanceof Array) {
                return queryParams[k].reduce(function (prev, curr) {
                    return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                }, "");
            }
            else {
                if (queryParams[k] != null) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            }
        })
            .join("");
        var fetchOptions = __assign({ method: "POST" });
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        if (this.configuration.bearerToken) {
            headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
        }
        else if (this.configuration.username) {
            headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        fetchOptions.headers = __assign({}, headers);
        fetchOptions.body = JSON.stringify({
            id: request.id
        });
        return Promise.race([
            fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            }),
            new Promise(function (_, reject) {
                return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
            }),
        ]).then(function (apiSession) {
            return Session.restore(apiSession.token || "");
        });
    };
    Client.prototype.authenticateEmail = function (request) {
        var _this = this;
        var urlPath = "/v2/account/authenticate/email";
        var queryParams = {
            username: request.username,
            create: request.create
        };
        var urlQuery = "?" + Object.keys(queryParams)
            .map(function (k) {
            if (queryParams[k] instanceof Array) {
                return queryParams[k].reduce(function (prev, curr) {
                    return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                }, "");
            }
            else {
                if (queryParams[k] != null) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            }
        })
            .join("");
        var fetchOptions = __assign({ method: "POST" });
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        if (this.configuration.bearerToken) {
            headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
        }
        else if (this.configuration.username) {
            headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        fetchOptions.headers = __assign({}, headers);
        fetchOptions.body = JSON.stringify({
            email: request.email,
            password: request.password
        });
        return Promise.race([
            fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            }),
            new Promise(function (_, reject) {
                return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
            }),
        ]).then(function (apiSession) {
            return Session.restore(apiSession.token || "");
        });
    };
    Client.prototype.authenticateFacebook = function (request) {
        var _this = this;
        var urlPath = "/v2/account/authenticate/facebook";
        var queryParams = {
            username: request.username,
            create: request.create
        };
        var urlQuery = "?" + Object.keys(queryParams)
            .map(function (k) {
            if (queryParams[k] instanceof Array) {
                return queryParams[k].reduce(function (prev, curr) {
                    return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                }, "");
            }
            else {
                if (queryParams[k] != null) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            }
        })
            .join("");
        var fetchOptions = __assign({ method: "POST" });
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        if (this.configuration.bearerToken) {
            headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
        }
        else if (this.configuration.username) {
            headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        fetchOptions.headers = __assign({}, headers);
        fetchOptions.body = JSON.stringify({
            token: request.token
        });
        return Promise.race([
            fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            }),
            new Promise(function (_, reject) {
                return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
            }),
        ]).then(function (apiSession) {
            return Session.restore(apiSession.token || "");
        });
    };
    Client.prototype.authenticateGoogle = function (request) {
        var _this = this;
        var urlPath = "/v2/account/authenticate/google";
        var queryParams = {
            username: request.username,
            create: request.create
        };
        var urlQuery = "?" + Object.keys(queryParams)
            .map(function (k) {
            if (queryParams[k] instanceof Array) {
                return queryParams[k].reduce(function (prev, curr) {
                    return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                }, "");
            }
            else {
                if (queryParams[k] != null) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            }
        })
            .join("");
        var fetchOptions = __assign({ method: "POST" });
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        if (this.configuration.bearerToken) {
            headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
        }
        else if (this.configuration.username) {
            headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        fetchOptions.headers = __assign({}, headers);
        fetchOptions.body = JSON.stringify({
            token: request.token
        });
        return Promise.race([
            fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            }),
            new Promise(function (_, reject) {
                return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
            }),
        ]).then(function (apiSession) {
            return Session.restore(apiSession.token || "");
        });
    };
    Client.prototype.authenticateGameCenter = function (request) {
        var _this = this;
        var urlPath = "/v2/account/authenticate/gamecenter";
        var queryParams = {
            username: request.username,
            create: request.create
        };
        var urlQuery = "?" + Object.keys(queryParams)
            .map(function (k) {
            if (queryParams[k] instanceof Array) {
                return queryParams[k].reduce(function (prev, curr) {
                    return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                }, "");
            }
            else {
                if (queryParams[k] != null) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            }
        })
            .join("");
        var fetchOptions = __assign({ method: "POST" });
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        if (this.configuration.bearerToken) {
            headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
        }
        else if (this.configuration.username) {
            headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        fetchOptions.headers = __assign({}, headers);
        fetchOptions.body = JSON.stringify({
            bundle_id: request.bundle_id,
            player_id: request.player_id,
            public_key_url: request.public_key_url,
            salt: request.salt,
            signature: request.signature,
            timestamp_seconds: request.timestamp_seconds
        });
        return Promise.race([
            fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            }),
            new Promise(function (_, reject) {
                return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
            }),
        ]).then(function (apiSession) {
            return Session.restore(apiSession.token || "");
        });
    };
    Client.prototype.authenticateSteam = function (request) {
        var _this = this;
        var urlPath = "/v2/account/authenticate/steam";
        var queryParams = {
            username: request.username,
            create: request.create
        };
        var urlQuery = "?" + Object.keys(queryParams)
            .map(function (k) {
            if (queryParams[k] instanceof Array) {
                return queryParams[k].reduce(function (prev, curr) {
                    return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                }, "");
            }
            else {
                if (queryParams[k] != null) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            }
        })
            .join("");
        var fetchOptions = __assign({ method: "POST" });
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        if (this.configuration.bearerToken) {
            headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
        }
        else if (this.configuration.username) {
            headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        fetchOptions.headers = __assign({}, headers);
        fetchOptions.body = JSON.stringify({
            token: request.token
        });
        return Promise.race([
            fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            }),
            new Promise(function (_, reject) {
                return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
            }),
        ]).then(function (apiSession) {
            return Session.restore(apiSession.token || "");
        });
    };
    Client.prototype.blockFriends = function (session, ids, usernames) {
        var _this = this;
        this.configuration.bearerToken = (session && session.token);
        var urlPath = "/v2/friend/block";
        var queryParams = {
            ids: ids,
            usernames: usernames
        };
        var urlQuery = "?" + Object.keys(queryParams)
            .map(function (k) {
            if (queryParams[k] instanceof Array) {
                return queryParams[k].reduce(function (prev, curr) {
                    return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                }, "");
            }
            else {
                if (queryParams[k] != null) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            }
        })
            .join("");
        var fetchOptions = __assign({ method: "POST" });
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        if (this.configuration.bearerToken) {
            headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
        }
        else if (this.configuration.username) {
            headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        fetchOptions.headers = __assign({}, headers);
        return Promise.race([
            fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            }),
            new Promise(function (_, reject) {
                return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
            }),
        ]).then(function (response) {
            return Promise.resolve(response != undefined);
        });
    };
    Client.prototype.createGroup = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.createGroup(request).then(function (response) {
            return Promise.resolve({
                avatar_url: response.avatar_url,
                create_time: response.create_time,
                creator_id: response.creator_id,
                description: response.description,
                edge_count: response.edge_count,
                id: response.id,
                lang_tag: response.lang_tag,
                max_count: response.max_count,
                metadata: response.metadata ? JSON.parse(response.metadata) : null,
                name: response.name,
                open: response.open,
                update_time: response.update_time
            });
        });
    };
    Client.prototype.createSocket = function (useSSL, verbose) {
        if (useSSL === void 0) { useSSL = false; }
        if (verbose === void 0) { verbose = false; }
        return new DefaultSocket(this.host, this.port, useSSL, verbose);
    };
    Client.prototype.deleteFriends = function (session, ids, usernames) {
        var _this = this;
        this.configuration.bearerToken = (session && session.token);
        var urlPath = "/v2/friend";
        var queryParams = {
            ids: ids,
            usernames: usernames
        };
        var urlQuery = "?" + Object.keys(queryParams)
            .map(function (k) {
            if (queryParams[k] instanceof Array) {
                return queryParams[k].reduce(function (prev, curr) {
                    return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                }, "");
            }
            else {
                if (queryParams[k] != null) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            }
        })
            .join("");
        var fetchOptions = __assign({ method: "DELETE" });
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        if (this.configuration.bearerToken) {
            headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
        }
        else if (this.configuration.username) {
            headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        fetchOptions.headers = __assign({}, headers);
        return Promise.race([
            fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            }),
            new Promise(function (_, reject) {
                return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
            }),
        ]).then(function (response) {
            return Promise.resolve(response != undefined);
        });
    };
    Client.prototype.deleteGroup = function (session, groupId) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.deleteGroup(groupId).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.deleteNotifications = function (session, ids) {
        var _this = this;
        this.configuration.bearerToken = (session && session.token);
        var urlPath = "/v2/notification";
        var queryParams = {
            ids: ids
        };
        var urlQuery = "?" + Object.keys(queryParams)
            .map(function (k) {
            if (queryParams[k] instanceof Array) {
                return queryParams[k].reduce(function (prev, curr) {
                    return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                }, "");
            }
            else {
                if (queryParams[k] != null) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            }
        })
            .join("");
        var fetchOptions = __assign({ method: "DELETE" });
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        if (this.configuration.bearerToken) {
            headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
        }
        else if (this.configuration.username) {
            headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        fetchOptions.headers = __assign({}, headers);
        return Promise.race([
            fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            }),
            new Promise(function (_, reject) {
                return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
            }),
        ]).then(function (response) {
            return Promise.resolve(response != undefined);
        });
    };
    Client.prototype.deleteStorageObjects = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.deleteStorageObjects(request).then(function (response) {
            return Promise.resolve(response != undefined);
        });
    };
    Client.prototype.getAccount = function (session) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.getAccount();
    };
    Client.prototype.importFacebookFriends = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.importFacebookFriends(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.getUsers = function (session, ids, usernames, facebookIds) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.getUsers(ids, usernames, facebookIds).then(function (response) {
            var result = {
                users: []
            };
            if (response.users == null) {
                return Promise.resolve(result);
            }
            response.users.forEach(function (u) {
                result.users.push({
                    avatar_url: u.avatar_url,
                    create_time: u.create_time,
                    display_name: u.display_name,
                    edge_count: u.edge_count,
                    facebook_id: u.facebook_id,
                    gamecenter_id: u.gamecenter_id,
                    google_id: u.google_id,
                    id: u.id,
                    lang_tag: u.lang_tag,
                    location: u.location,
                    online: u.online,
                    steam_id: u.steam_id,
                    timezone: u.timezone,
                    update_time: u.update_time,
                    username: u.username,
                    metadata: u.metadata ? JSON.parse(u.metadata) : null
                });
            });
            return Promise.resolve(result);
        });
    };
    Client.prototype.joinGroup = function (session, groupId) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.joinGroup(groupId, {}).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.kickGroupUsers = function (session, groupId, ids) {
        var _this = this;
        this.configuration.bearerToken = (session && session.token);
        var urlPath = "/v2/group/" + groupId + "/kick";
        var queryParams = {
            user_ids: ids
        };
        var urlQuery = "?" + Object.keys(queryParams)
            .map(function (k) {
            if (queryParams[k] instanceof Array) {
                return queryParams[k].reduce(function (prev, curr) {
                    return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                }, "");
            }
            else {
                if (queryParams[k] != null) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            }
        })
            .join("");
        var fetchOptions = __assign({ method: "POST" });
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        if (this.configuration.bearerToken) {
            headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
        }
        else if (this.configuration.username) {
            headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        fetchOptions.headers = __assign({}, headers);
        return Promise.race([
            fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            }),
            new Promise(function (_, reject) {
                return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
            }),
        ]).then(function (response) {
            return Promise.resolve(response != undefined);
        });
    };
    Client.prototype.leaveGroup = function (session, groupId) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.leaveGroup(groupId, {}).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.listChannelMessages = function (session, channelId, limit, forward, cursor) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.listChannelMessages(channelId, limit, forward, cursor).then(function (response) {
            var result = {
                messages: [],
                next_cursor: response.next_cursor,
                prev_cursor: response.prev_cursor
            };
            if (response.messages == null) {
                return Promise.resolve(result);
            }
            response.messages.forEach(function (m) {
                result.messages.push({
                    channel_id: m.channel_id,
                    code: m.code,
                    create_time: m.create_time,
                    message_id: m.message_id,
                    persistent: m.persistent,
                    sender_id: m.sender_id,
                    update_time: m.update_time,
                    username: m.username,
                    content: m.content ? JSON.parse(m.content) : null
                });
            });
            return Promise.resolve(result);
        });
    };
    Client.prototype.listGroupUsers = function (session, groupId) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.listGroupUsers(groupId).then(function (response) {
            var result = {
                group_users: []
            };
            if (response.group_users == null) {
                return Promise.resolve(result);
            }
            response.group_users.forEach(function (gu) {
                result.group_users.push({
                    user: {
                        avatar_url: gu.user.avatar_url,
                        create_time: gu.user.create_time,
                        display_name: gu.user.display_name,
                        edge_count: gu.user.edge_count,
                        facebook_id: gu.user.facebook_id,
                        gamecenter_id: gu.user.gamecenter_id,
                        google_id: gu.user.google_id,
                        id: gu.user.id,
                        lang_tag: gu.user.lang_tag,
                        location: gu.user.location,
                        online: gu.user.online,
                        steam_id: gu.user.steam_id,
                        timezone: gu.user.timezone,
                        update_time: gu.user.update_time,
                        username: gu.user.username,
                        metadata: gu.user.metadata ? JSON.parse(gu.user.metadata) : null
                    },
                    state: gu.state
                });
            });
            return Promise.resolve(result);
        });
    };
    Client.prototype.listUserGroups = function (session, userId) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.listUserGroups(userId).then(function (response) {
            var result = {
                user_groups: []
            };
            if (response.user_groups == null) {
                return Promise.resolve(result);
            }
            response.user_groups.forEach(function (ug) {
                result.user_groups.push({
                    group: {
                        avatar_url: ug.group.avatar_url,
                        create_time: ug.group.create_time,
                        creator_id: ug.group.creator_id,
                        description: ug.group.description,
                        edge_count: ug.group.edge_count,
                        id: ug.group.id,
                        lang_tag: ug.group.lang_tag,
                        max_count: ug.group.max_count,
                        metadata: ug.group.metadata ? JSON.parse(ug.group.metadata) : null,
                        name: ug.group.name,
                        open: ug.group.open,
                        update_time: ug.group.update_time
                    },
                    state: ug.state
                });
            });
            return Promise.resolve(result);
        });
    };
    Client.prototype.listGroups = function (session, name, cursor, limit) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.listGroups(name, cursor, limit).then(function (response) {
            var result = {
                groups: []
            };
            if (response.groups == null) {
                return Promise.resolve(result);
            }
            result.cursor = response.cursor;
            response.groups.forEach(function (ug) {
                result.groups.push({
                    avatar_url: ug.avatar_url,
                    create_time: ug.create_time,
                    creator_id: ug.creator_id,
                    description: ug.description,
                    edge_count: ug.edge_count,
                    id: ug.id,
                    lang_tag: ug.lang_tag,
                    max_count: ug.max_count,
                    metadata: ug.metadata ? JSON.parse(ug.metadata) : null,
                    name: ug.name,
                    open: ug.open,
                    update_time: ug.update_time
                });
            });
            return Promise.resolve(result);
        });
    };
    Client.prototype.linkCustom = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.linkCustom(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.linkDevice = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.linkDevice(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.linkEmail = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.linkEmail(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.linkFacebook = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.linkFacebook(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.linkGoogle = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.linkGoogle(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.linkGameCenter = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.linkGameCenter(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.linkSteam = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.linkSteam(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.listFriends = function (session) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.listFriends().then(function (response) {
            var result = {
                friends: []
            };
            if (response.friends == null) {
                return Promise.resolve(result);
            }
            response.friends.forEach(function (f) {
                result.friends.push({
                    user: {
                        avatar_url: f.user.avatar_url,
                        create_time: f.user.create_time,
                        display_name: f.user.display_name,
                        edge_count: f.user.edge_count,
                        facebook_id: f.user.facebook_id,
                        gamecenter_id: f.user.gamecenter_id,
                        google_id: f.user.google_id,
                        id: f.user.id,
                        lang_tag: f.user.lang_tag,
                        location: f.user.location,
                        online: f.user.online,
                        steam_id: f.user.steam_id,
                        timezone: f.user.timezone,
                        update_time: f.user.update_time,
                        username: f.user.username,
                        metadata: f.user.metadata ? JSON.parse(f.user.metadata) : null
                    },
                    state: f.state
                });
            });
            return Promise.resolve(result);
        });
    };
    Client.prototype.listLeaderboardRecords = function (session, leaderboardId, ownerIds, limit, cursor) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.listLeaderboardRecords(leaderboardId, ownerIds, limit, cursor).then(function (response) {
            var list = {
                next_cursor: response.next_cursor,
                prev_cursor: response.prev_cursor,
                owner_records: [],
                records: []
            };
            if (response.owner_records != null) {
                response.owner_records.forEach(function (o) {
                    list.owner_records.push({
                        expiry_time: o.expiry_time,
                        leaderboard_id: o.leaderboard_id,
                        metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
                        num_score: o.num_score,
                        owner_id: o.owner_id,
                        rank: Number(o.rank),
                        score: Number(o.score),
                        subscore: Number(o.subscore),
                        update_time: o.update_time,
                        username: o.username
                    });
                });
            }
            if (response.records != null) {
                response.records.forEach(function (o) {
                    list.records.push({
                        expiry_time: o.expiry_time,
                        leaderboard_id: o.leaderboard_id,
                        metadata: o.metadata ? JSON.parse(o.metadata) : undefined,
                        num_score: o.num_score,
                        owner_id: o.owner_id,
                        rank: Number(o.rank),
                        score: Number(o.score),
                        subscore: Number(o.subscore),
                        update_time: o.update_time,
                        username: o.username
                    });
                });
            }
            return Promise.resolve(list);
        });
    };
    Client.prototype.listMatches = function (session, limit, authoritative, label, minSize, maxSize) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.listMatches(limit, authoritative, label, minSize, maxSize);
    };
    Client.prototype.listNotifications = function (session, limit, cacheableCursor) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.listNotifications(limit, cacheableCursor).then(function (response) {
            var result = {
                cacheable_cursor: response.cacheable_cursor,
                notifications: [],
            };
            if (response.notifications == null) {
                return Promise.resolve(result);
            }
            response.notifications.forEach(function (n) {
                result.notifications.push({
                    code: n.code,
                    create_time: n.create_time,
                    id: n.id,
                    persistent: n.persistent,
                    sender_id: n.sender_id,
                    subject: n.subject,
                    content: n.content ? JSON.parse(n.content) : undefined
                });
            });
            return Promise.resolve(result);
        });
    };
    Client.prototype.listStorageObjects = function (session, collection, userId, limit, cursor) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.listStorageObjects(collection, userId, limit, cursor).then(function (response) {
            var result = {
                objects: [],
                cursor: response.cursor
            };
            if (response.objects == null) {
                return Promise.resolve(result);
            }
            response.objects.forEach(function (o) {
                result.objects.push({
                    collection: o.collection,
                    key: o.key,
                    permission_read: o.permission_read,
                    permission_write: o.permission_write,
                    value: o.value ? JSON.parse(o.value) : null,
                    version: o.version,
                    user_id: o.user_id,
                    create_time: o.create_time,
                    update_time: o.update_time
                });
            });
            return Promise.resolve(result);
        });
    };
    Client.prototype.promoteGroupUsers = function (session, groupId, ids) {
        var _this = this;
        this.configuration.bearerToken = (session && session.token);
        var urlPath = "/v2/group/" + groupId + "/promote";
        var queryParams = {
            user_ids: ids
        };
        var urlQuery = "?" + Object.keys(queryParams)
            .map(function (k) {
            if (queryParams[k] instanceof Array) {
                return queryParams[k].reduce(function (prev, curr) {
                    return prev + encodeURIComponent(k) + "=" + encodeURIComponent(curr) + "&";
                }, "");
            }
            else {
                if (queryParams[k] != null) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k]) + "&";
                }
            }
        })
            .join("");
        var fetchOptions = __assign({ method: "POST" });
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };
        if (this.configuration.bearerToken) {
            headers["Authorization"] = "Bearer " + this.configuration.bearerToken;
        }
        else if (this.configuration.username) {
            headers["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        fetchOptions.headers = __assign({}, headers);
        return Promise.race([
            fetch(this.configuration.basePath + urlPath + urlQuery, fetchOptions).then(function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                else {
                    throw response;
                }
            }),
            new Promise(function (_, reject) {
                return setTimeout(reject, _this.configuration.timeoutMs, "Request timed out.");
            }),
        ]).then(function (response) {
            return Promise.resolve(response != undefined);
        });
    };
    Client.prototype.readStorageObjects = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.readStorageObjects(request).then(function (response) {
            var result = { objects: [] };
            if (response.objects == null) {
                return Promise.resolve(result);
            }
            response.objects.forEach(function (o) {
                result.objects.push({
                    collection: o.collection,
                    key: o.key,
                    permission_read: o.permission_read,
                    permission_write: o.permission_write,
                    value: o.value ? JSON.parse(o.value) : null,
                    version: o.version,
                    user_id: o.user_id,
                    create_time: o.create_time,
                    update_time: o.update_time
                });
            });
            return Promise.resolve(result);
        });
    };
    Client.prototype.rpc = function (session, id, input) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.rpcFunc(id, JSON.stringify(input)).then(function (response) {
            return Promise.resolve({
                id: response.id,
                payload: (!response.payload) ? null : JSON.parse(response.payload)
            });
        });
    };
    Client.prototype.rpcGet = function (id, session, httpKey, input) {
        var _this = this;
        if (!httpKey || httpKey == "") {
            this.configuration.bearerToken = (session && session.token);
        }
        else {
            this.configuration.username = undefined;
            this.configuration.bearerToken = undefined;
        }
        return this.apiClient.rpcFunc2(id, input && JSON.stringify(input) || "", httpKey)
            .then(function (response) {
            _this.configuration.username = _this.serverkey;
            return Promise.resolve({
                id: response.id,
                payload: (!response.payload) ? null : JSON.parse(response.payload)
            });
        }).catch(function (err) {
            _this.configuration.username = _this.serverkey;
            throw err;
        });
    };
    Client.prototype.unlinkCustom = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.unlinkCustom(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.unlinkDevice = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.unlinkDevice(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.unlinkEmail = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.unlinkEmail(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.unlinkFacebook = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.unlinkFacebook(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.unlinkGoogle = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.unlinkGoogle(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.unlinkGameCenter = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.unlinkGameCenter(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.unlinkSteam = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.unlinkSteam(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.updateAccount = function (session, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.updateAccount(request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.updateGroup = function (session, groupId, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.updateGroup(groupId, request).then(function (response) {
            return response !== undefined;
        });
    };
    Client.prototype.writeLeaderboardRecord = function (session, leaderboardId, request) {
        this.configuration.bearerToken = (session && session.token);
        return this.apiClient.writeLeaderboardRecord(leaderboardId, {
            metadata: request.metadata ? JSON.stringify(request.metadata) : undefined,
            score: request.score,
            subscore: request.subscore
        }).then(function (response) {
            return Promise.resolve({
                expiry_time: response.expiry_time,
                leaderboard_id: response.leaderboard_id,
                metadata: response.metadata ? JSON.parse(response.metadata) : undefined,
                num_score: response.num_score,
                owner_id: response.owner_id,
                score: Number(response.score),
                subscore: Number(response.subscore),
                update_time: response.update_time,
                username: response.username
            });
        });
    };
    Client.prototype.writeStorageObjects = function (session, objects) {
        this.configuration.bearerToken = (session && session.token);
        var request = { objects: [] };
        objects.forEach(function (o) {
            request.objects.push({
                collection: o.collection,
                key: o.key,
                permission_read: o.permission_read,
                permission_write: o.permission_write,
                value: JSON.stringify(o.value),
                version: o.version
            });
        });
        return this.apiClient.writeStorageObjects(request);
    };
    return Client;
}());

exports.Client = Client;
exports.Session = Session;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],"src/tank-game/realtime-server/client.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var nakama_js_1 = require("@heroiclabs/nakama-js");

var NakamaClient = /*#__PURE__*/function () {
  function NakamaClient() {
    _classCallCheck(this, NakamaClient);

    this._client = this.connect();
  }

  _createClass(NakamaClient, [{
    key: "connect",
    value: function connect() {
      var client = new nakama_js_1.Client("defaultkey", "95.216.171.225", '7350');
      client.useSSL = true;
      return client;
    }
  }]);

  return NakamaClient;
}();

exports.default = NakamaClient;
},{"@heroiclabs/nakama-js":"node_modules/@heroiclabs/nakama-js/dist/nakama-js.umd.js"}],"src/tank-game/game.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tank_1 = require("./tank/tank");

var ammunition_1 = require("./tank/ammunition");

var game_framework_1 = require("./game-framework");

var enemy_1 = require("./enemies/enemy");

var client_1 = __importDefault(require("./realtime-server/client"));

var RechargeTankTower = /*#__PURE__*/function () {
  function RechargeTankTower(endRifflePosition, step) {
    _classCallCheck(this, RechargeTankTower);

    this.startRifflePosition = 0;
    this.endRifflePosition = endRifflePosition;
    this._step = step;
  }

  _createClass(RechargeTankTower, [{
    key: "process",
    value: function process() {
      if (this.inProccess) {
        this.startRifflePosition -= this._step;
      }
    }
  }, {
    key: "start",
    value: function start(devicePixelRatio) {
      this.startRifflePosition = this.endRifflePosition * devicePixelRatio;
    }
  }, {
    key: "inProccess",
    get: function get() {
      return this.startRifflePosition > 0;
    }
  }]);

  return RechargeTankTower;
}();

exports.RechargeTankTower = RechargeTankTower;

var Ghost = /*#__PURE__*/function (_game_framework_1$Bas) {
  _inherits(Ghost, _game_framework_1$Bas);

  function Ghost(startPositionX, startPositionY, speedLevel) {
    var _this;

    _classCallCheck(this, Ghost);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Ghost).call(this));
    _this.positionX = startPositionX;
    _this.positionY = startPositionY;
    _this._radius = 10;
    _this._ghostColor = game_framework_1.Colors.getRandomColor();
    _this._speedLevel = speedLevel;
    return _this;
  }

  _createClass(Ghost, [{
    key: "draw",
    value: function draw(ctx, deviceRatio) {
      ctx.fillStyle = this._ghostColor;
      ctx.beginPath();
      ctx.arc(this.positionX, this.positionY, this._radius * deviceRatio, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = game_framework_1.Colors.black;
      this.move(deviceRatio);
    }
  }, {
    key: "move",
    value: function move(deviceRatio) {
      this.positionY += game_framework_1.MathLib.getRandomInt(2) * this._speedLevel * deviceRatio;
    }
  }, {
    key: "height",
    get: function get() {
      return this._radius * 2;
    }
  }, {
    key: "width",
    get: function get() {
      return this._radius * 2;
    }
  }]);

  return Ghost;
}(game_framework_1.BaseDrawObject);

var TankPanelAmmunition = /*#__PURE__*/function () {
  function TankPanelAmmunition(ammunition) {
    _classCallCheck(this, TankPanelAmmunition);

    this._panel = document.getElementsByClassName('tank-ammunition-panel-inner')[0];
    this.init(ammunition);
    ammunition.onchange(this.change);
  }

  _createClass(TankPanelAmmunition, [{
    key: "init",
    value: function init(ammunition) {
      var sections = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = ammunition._ammunitions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var shells = _step.value;
          var section = this.drawPanelSection(shells[0], shells[1]);
          sections.push(section);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._panel.innerHTML = sections.join('');
    }
  }, {
    key: "change",
    value: function change(key, value) {
      document.getElementById(key).innerText = value;
    }
  }, {
    key: "drawPanelSection",
    value: function drawPanelSection(key, value) {
      return '<div class="form-group">' + "<label>".concat(key, "</label>") + "<span id=\"".concat(key, "\">").concat(value, "</span>") + '</div>';
    }
  }]);

  return TankPanelAmmunition;
}();

var TankGame = /*#__PURE__*/function () {
  function TankGame(enemyCount, enemySpeedLevel) {
    _classCallCheck(this, TankGame);

    this.enemyCount = enemyCount;
    this.enemySpeedLevel = enemySpeedLevel;
  }

  _createClass(TankGame, [{
    key: "start",
    value: function start() {
      var game = new game_framework_1.Game("scene", this.sceneWidth, this.sceneHeight);
      var tank = new tank_1.Tank(game.scene.width / 2, game.scene.height - 50 * game.scene.devicePixelRatio, 10);
      var client = new client_1.default();
      var startTankAmmunition = new ammunition_1.TankAmunnition();
      startTankAmmunition.bullets = 20;
      startTankAmmunition.shrapnels = 30;
      tank.addAmunnition(startTankAmmunition);
      this.tankPanelAmmunition = new TankPanelAmmunition(tank._ammunition);
      var enemies = this.generateEnemies(this.enemyCount, this.enemySpeedLevel, game.scene.width);
      var keyboardsEvents = {
        'ArrowUp': function ArrowUp() {
          return tank.move('up');
        },
        'ArrowDown': function ArrowDown() {
          return tank.move('down');
        },
        'ArrowRight': function ArrowRight() {
          return tank.move('right');
        },
        'ArrowLeft': function ArrowLeft() {
          return tank.move('left');
        },
        'Space': function Space() {
          return tankFire();
        },
        'KeyC': function KeyC() {
          return tank.changeTower();
        }
      };
      game.scene.addDrawObjects(enemies);
      game.scene.addDrawObject(tank);
      game.registerKeyBoardEvents(keyboardsEvents);
      game.run();

      function tankFire() {
        var bullets = tank.fire();
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = bullets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var bullet = _step2.value;
            game.scene.addDrawObject(bullet);
            var animation = typeof bullet.createStrikeAnimation == 'function' ? bullet.createStrikeAnimation() : null;
            var event = new game_framework_1.ClashPhysicEvent(bullet, enemies, animation);
            game.scene.addPhysicEvent(event);

            if (bullet.strikingDistance && animation) {
              var _event = new game_framework_1.StrikingDistancePhysicEvent(bullet, bullet.positionY, bullet.strikingDistance, animation);

              game.scene.addPhysicEvent(_event);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      this.game = game;
    }
  }, {
    key: "restart",
    value: function restart() {
      this.game.destroy();
      this.start();
    }
  }, {
    key: "generateGhosts",
    value: function generateGhosts(enemyCount, enemySpeedLevel, sceneWidth) {
      var ghostArray = [];

      for (var i = 0; i < enemyCount; i++) {
        var randomX = Math.random();
        if (!randomX) randomX = 2;
        ghostArray.push(new Ghost(sceneWidth * randomX, 0, enemySpeedLevel));
      }

      return ghostArray;
    }
  }, {
    key: "generateEnemies",
    value: function generateEnemies(enemyCount, enemySpeedLevel, sceneWidth) {
      var enemies = [];

      for (var i = 0; i < enemyCount; i++) {
        var randomX = Math.random();
        if (!randomX) randomX = 2;
        enemies.push(new enemy_1.Enemy(sceneWidth * randomX, 0, enemySpeedLevel));
      }

      return enemies;
    }
  }, {
    key: "sceneWidth",
    get: function get() {
      return 800;
    }
  }, {
    key: "sceneHeight",
    get: function get() {
      return window.innerHeight;
    }
  }]);

  return TankGame;
}();

var tankGame = new TankGame(1, 1);
tankGame.start();
document.getElementById('startNewGame').addEventListener('click', function (event) {
  tankGame.enemyCount = getIntValueFromInput('enemyCount', 1);
  tankGame.enemySpeedLevel = getIntValueFromInput('enemySpeedLevel', 1);
  tankGame.restart();
  window.focus();

  if (document.activeElement) {
    document.activeElement.blur();
  }
});

function getIntValueFromInput(inputId, defaultValue) {
  var value = document.getElementById(inputId).value;
  var intValue = parseInt(value);
  return isNaN(intValue) ? defaultValue : intValue;
}
},{"./tank/tank":"src/tank-game/tank/tank.ts","./tank/ammunition":"src/tank-game/tank/ammunition.ts","./game-framework":"src/tank-game/game-framework.ts","./enemies/enemy":"src/tank-game/enemies/enemy.ts","./realtime-server/client":"src/tank-game/realtime-server/client.ts"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56185" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/tank-game/game.ts"], null)
//# sourceMappingURL=/game.181db07b.js.map