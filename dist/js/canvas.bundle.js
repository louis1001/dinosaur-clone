/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BodyWorld = exports.RectCollider = exports.CircleCollider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collider = function Collider(hitbox, parent) {
  _classCallCheck(this, Collider);

  this.hitbox = hitbox;
  this.parent = parent;
};

var RectCollider = function (_Collider) {
  _inherits(RectCollider, _Collider);

  function RectCollider(parent) {
    _classCallCheck(this, RectCollider);

    var myHitbox = {
      w: parent.sz.x,
      h: parent.sz.y
    };

    return _possibleConstructorReturn(this, (RectCollider.__proto__ || Object.getPrototypeOf(RectCollider)).call(this, myHitbox, parent));
  }

  _createClass(RectCollider, [{
    key: 'draw',
    value: function draw(ctx) {
      ctx.beginPath();
      //console.log(this.parent.pos.x + " - " + this.parent.pos.y + " - " + (this.parent.pos.x + this.hitbox.w) + " - " + (this.parent.pos.y + this.hitbox.h))
      ctx.rect(this.parent.pos.x, this.parent.pos.y, this.hitbox.w, this.hitbox.h);
      ctx.fillStyle = '#f001';
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'red';
      ctx.fill();
      ctx.stroke();
    }
  }]);

  return RectCollider;
}(Collider);

var CircleCollider = function (_Collider2) {
  _inherits(CircleCollider, _Collider2);

  function CircleCollider(parent) {
    _classCallCheck(this, CircleCollider);

    var myHitbox = {
      r: parent.radius * 0.8
    };

    var _this2 = _possibleConstructorReturn(this, (CircleCollider.__proto__ || Object.getPrototypeOf(CircleCollider)).call(this, myHitbox, parent));

    window.col = _this2;
    return _this2;
  }

  _createClass(CircleCollider, [{
    key: 'draw',
    value: function draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.parent.pos.x, this.parent.pos.y, this.hitbox.r, 0, Math.PI * 2, false);
      // ctx.ellipse(this.parent.pos.x, this.parent.pos.y, this.hitbox.r, this.)
      //ctx.fillStyle = this.color
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'green';
      ctx.fillStyle = '#0f01';
      ctx.fill();
      ctx.stroke();
    }
  }]);

  return CircleCollider;
}(Collider);

function areRectsColliding(rect1, rect2) {
  var A = {
    x1: rect1.parent.pos.x,
    y1: rect1.parent.pos.y,
    x2: rect1.parent.pos.x + rect1.hitbox.w,
    y2: rect1.parent.pos.y + rect1.hitbox.h
  };

  var B = {
    x1: rect2.parent.pos.x,
    y1: rect2.parent.pos.y,
    x2: rect2.parent.pos.x + rect2.hitbox.w,
    y2: rect2.parent.pos.y + rect2.hitbox.h
  };

  return A.x1 < B.x2 && A.x2 > B.x1 && A.y1 < B.y2 && A.y2 > B.y1;
}

function areCirclesColliding(circle1, circle2) {
  var hbx1 = circle1.hitbox;
  var hbx2 = circle2.hitbox;

  var distanceBetweenCircles = (0, _utils2.default)(circle1.parent.pos.x, circle1.parent.pos.y, circle2.parent.pos.x, circle2.parent.pos.y);

  return distanceBetweenCircles < hbx1.radius + hbx2.radius;
}

function areRectCircleColliding(rect, circle) {

  var circleParentPos = circle.parent.pos;
  var rectParentPos = rect.parent.pos;

  var cDistanceX = Math.abs(circleParentPos.x - (rectParentPos.x + rect.hitbox.w / 2));
  var cDistanceY = Math.abs(circleParentPos.y - (rectParentPos.y + rect.hitbox.h / 2));

  if (cDistanceX > rect.hitbox.w / 2 + circle.hitbox.r || cDistanceY > rect.hitbox.h / 2 + circle.hitbox.r) return false;

  if (cDistanceX <= rect.hitbox.w / 2 || cDistanceY <= rect.hitbox.h / 2) return true;

  var cornerDistance_sq = Math.pow(cDistanceX - rect.hitbox.w / 2, 2) + Math.pow(cDistanceY - rect.hitbox.h / 2, 2);

  return cornerDistance_sq <= Math.pow(circle.hitbox.r, 2);
}

var CollitionListener = function () {
  function CollitionListener(col1, col2, callback) {
    _classCallCheck(this, CollitionListener);

    var body1 = col1 instanceof Collider ? col1 : col1.body;
    this.body1 = {
      body: body1,
      type: body1.constructor
    };

    var body2 = col2 instanceof Collider ? col2 : col2.body;
    this.body2 = {
      body: body2,
      type: body2.constructor
    };

    this.callback = callback;

    this.setCheckingFunction();
  }

  _createClass(CollitionListener, [{
    key: 'setCheckingFunction',
    value: function setCheckingFunction() {

      if (this.body1.type === this.body2.type) {
        this.checkFunction = this.body1.type === CircleCollider ? areCirclesColliding : areRectsColliding;
      } else {
        this.checkFunction = areRectCircleColliding;
        if (this.body1.type === CircleCollider) {
          var temp = this.body1;
          this.body1 = this.body2;
          this.body2 = temp;
        }
      }
    }
  }, {
    key: 'areColliding',
    value: function areColliding() {
      return this.checkFunction(this.body1.body, this.body2.body);
    }
  }, {
    key: 'containsObject',
    value: function containsObject(go1) {
      var go2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      var body1 = go1 instanceof Collider ? go1 : go1.body;

      var contains1 = body1 === this.body1 || body1 === this.body2;

      contains2 = true;
      if (go2) {
        var body2 = go2 instanceof Collider ? go2 : go2.body;

        contains2 = body2 === this.body1 || body2 === this.body2;
      }

      return contains1 && contains2;
    }
  }]);

  return CollitionListener;
}();

var BodyWorld = function () {
  function BodyWorld() {
    _classCallCheck(this, BodyWorld);

    this.colliders = [];
  }

  _createClass(BodyWorld, [{
    key: 'addCollitionListener',
    value: function addCollitionListener(gameObject1, gameObject2, callback) {
      var newColListener = new CollitionListener(gameObject1, gameObject2, callback);
      this.colliders.push(newColListener);
    }
  }, {
    key: 'removeCollitionListener',
    value: function removeCollitionListener(gameObject1) {
      var gameObject2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;


      this.colliders = this.colliders.filter(function (col) {
        return !col.containsObject(gameObject1, gameObject2);
      });
    }
  }, {
    key: 'findColliders',
    value: function findColliders(gameObject1) {
      var gameObject2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      var cols = this.colliders.filter(function (col) {
        return col.containsObject(gameObject1, gameObject2);
      });

      return cols;
    }
  }, {
    key: 'update',
    value: function update() {
      this.colliders.forEach(function (colLis) {
        var thisCollided = colLis.areColliding();
        if (thisCollided) {
          colLis.callback();
        }
      });
    }
  }]);

  return BodyWorld;
}();

exports.CircleCollider = CircleCollider;
exports.RectCollider = RectCollider;
exports.BodyWorld = BodyWorld;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Utility Functions
function constrain(val, lowB, uppB) {
  if (val < lowB) return lowB;
  if (val > uppB) return uppB;

  return val;
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function map(val, og_a, og_b, tg_a, tg_b) {
  var as_int = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  var og_range = og_b - og_a;
  var constraint_val = val - og_a;
  var percentage = constraint_val / og_range;

  var tg_range = tg_b - tg_a;
  var constraint_tg_val = percentage * tg_range;

  var mapped = constraint_tg_val + tg_a;

  if (as_int) {
    return Math.floor(mapped);
  } else {
    return mapped;
  }
}

function max(a, b) {
  var result = 0;
  if (Number(a) > Number(b) && Number(a) != undefined) result = Number(a);
  if (b != undefined) result = Number(b);

  return result;
}

function min(a, b) {
  if (a < b) return a;
  return b;
}

exports.constrain = constrain;
exports.randomIntFromRange = randomIntFromRange;
exports.randomColor = randomColor;
exports.distance = distance;
exports.map = map;
exports.max = max;
exports.min = min;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(5);

var _player2 = _interopRequireDefault(_player);

var _obstacle = __webpack_require__(4);

var _obstacle2 = _interopRequireDefault(_obstacle);

var _collision = __webpack_require__(0);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameManager = function () {
  function GameManager(worldBounds) {
    _classCallCheck(this, GameManager);

    this.worldBounds = worldBounds;

    this.initKeyHandlers();
    var gravity = {
      x: 0,
      y: 2
    };
    var acceleration = 0.001;

    var obstacleOffset = 60;

    var floorHeight = 80;

    var debugging = false;

    this.config = {
      gravity: gravity,
      floorHeight: floorHeight,
      obstacleOffset: obstacleOffset,
      acceleration: acceleration,
      debugging: debugging
    };

    window.gameConfig = this.config;

    this.init();
  }

  _createClass(GameManager, [{
    key: 'initKeyHandlers',
    value: function initKeyHandlers() {
      var _this = this;

      this.keysDown = [];

      this.keyHandlers = [{
        key: "p",
        callback: function callback(e) {
          _this.config.paused = !_this.config.paused;
        }
      }];
    }
  }, {
    key: 'collided',
    value: function collided() {
      this.init();
    }
  }, {
    key: 'init',
    value: function init() {

      this.floorPoints = [];

      this.config.gameSpeed = 10;

      this.config.paused = false;

      this.collisionWorld = new _collision.BodyWorld();

      var playerRad = 15;
      var playerBounds = {
        x: 100 - playerRad,
        y: -Infinity,
        w: 100 + playerRad,
        h: this.worldBounds.y - this.config.floorHeight
      };

      var playerVel = {
        x: 0,
        y: 0
      };

      this.player = new _player2.default(100, 100, playerVel, playerRad, 'white', playerBounds);

      this.gameObjects = [this.player];
      this.obstacles = [];
      this.obstacleDelay = this.config.obstacleOffset;

      this.gameOver = false;

      this.createObstacle();

      sessionStorage.hScore = sessionStorage.hScore || 0;
    }
  }, {
    key: 'createObstacle',
    value: function createObstacle() {
      var _this2 = this;

      var availableTypes = _obstacle2.default.getTypes();
      var randomIndex = (0, _utils.randomIntFromRange)(0, availableTypes.length - 1);

      var obstacleBounds = {
        x: this.worldBounds.x,
        y: this.worldBounds.y - this.config.floorHeight
      };

      var obsSpeed = function obsSpeed() {
        return _this2.config.gameSpeed;
      };

      var newObstacle = new _obstacle2.default(availableTypes[randomIndex], obstacleBounds, obsSpeed);

      this.obstacles.push(newObstacle);
      this.gameObjects.push(newObstacle);
      this.obstacleDelay = (0, _utils.randomIntFromRange)(this.config.obstacleOffset - 20, this.config.obstacleOffset + 30);

      this.collisionWorld.addCollitionListener(this.player, newObstacle, this.collided.bind(this));
    }
  }, {
    key: 'drawFloor',
    value: function drawFloor(ctx) {
      this.floorPoints.forEach(function (pnt, i) {
        ctx.beginPath();
        ctx.rect(pnt.x, pnt.y, 1, 1);
        ctx.lineWidth = 2;
        ctx.fillStyle = 'gray';
        ctx.strokeStyle = 'gray';
        ctx.stroke();
        ctx.fill();
      });

      ctx.beginPath();
      ctx.strokeStyle = 'gray';
      ctx.lineWidth = 1;

      ctx.moveTo(0, this.worldBounds.y - this.config.floorHeight - 5);

      ctx.lineTo(this.worldBounds.x, this.worldBounds.y - this.config.floorHeight - 5);
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: 'updateFloor',
    value: function updateFloor() {
      var _this3 = this;

      this.floorPoints.forEach(function (pnt) {
        pnt.x -= _this3.config.gameSpeed;
      });

      this.floorPoints = this.floorPoints.filter(function (pt) {
        return pt.x > -1;
      });

      var numPoints = this.floorPoints.length;
      if (numPoints == 0 || this.floorPoints[numPoints - 1].x <= this.worldBounds.x) {
        var ptX = (0, _utils.map)(Math.random(), 0, 1, 0, 40);
        var ptY = (0, _utils.map)(Math.random(), 0, 1, 0, this.config.floorHeight);

        this.floorPoints.push({
          x: this.worldBounds.x + ptX,
          y: this.worldBounds.y - ptY
        });
      }
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      // console.log(ctx)

      this.drawFloor(ctx);

      this.gameObjects.forEach(function (obj) {
        obj.draw(ctx);
      });

      ctx.fillStyle = 'gray';
      ctx.font = '20px sans-serif';

      var highestScore = String(Math.round(sessionStorage.hScore)).padStart(9, "0");

      ctx.fillText("HI", this.worldBounds.x - 145, 30);
      ctx.fillText(highestScore, this.worldBounds.x - 120, 30);

      var scoreText = String(Math.round(this.player.score)).padStart(9, "0");

      ctx.fillText(scoreText, this.worldBounds.x - 120, 70);

      if (this.config.paused) {
        ctx.fillStyle = 'darkgray';
        ctx.font = '50px sans-serif';

        var pauseText = "PAUSED";
        ctx.fillText(pauseText, this.worldBounds.x * 0.4, this.worldBounds.y / 2);
      }
    }
  }, {
    key: 'handleKeys',
    value: function handleKeys() {
      if (this.keysDown.includes(" ") || this.keysDown.includes("ArrowUp")) {
        this.player.jump();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this4 = this;

      if (this.config.paused || this.gameOver) return;
      this.handleKeys();

      this.updateFloor();

      this.gameObjects.forEach(function (obj) {
        if (!obj.static) {
          obj.applyForce(_this4.config.gravity);
        }
        obj.update();
      });

      for (var i = this.obstacles.length - 1; i >= 0; i--) {
        var obs = this.obstacles[i];
        if (obs.pos.x < -obs.sz.x) {
          this.obstacles.splice(i, 1);
          var goIndex = this.gameObjects.indexOf(obs);
          this.gameObjects.splice(goIndex, 1);
        }
      }

      if (this.obstacleDelay <= 0) {
        this.createObstacle();
      }

      this.obstacleDelay -= this.config.gameSpeed / 20;

      this.config.gameSpeed += this.config.acceleration;

      this.collisionWorld.update();
      this.updateScore();
    }
  }, {
    key: 'updateScore',
    value: function updateScore() {
      this.player.score += this.config.gameSpeed * 0.02;
      if (this.player.score > sessionStorage.hScore) {
        sessionStorage.hScore = this.player.score;
        this.highestScore = this.player.score;
      }
    }
  }, {
    key: 'keyPressed',
    value: function keyPressed(e) {
      this.keyHandlers.forEach(function (kh) {
        if (kh.key == e.key) {
          kh.callback(e);
        }
      });
      if (!this.keysDown.includes(e.key)) {
        this.keysDown.push(e.key);
      }
    }
  }, {
    key: 'keyReleased',
    value: function keyReleased(e) {
      if (this.keysDown.includes(e.key)) {
        this.keysDown = this.keysDown.filter(function (x) {
          return x != e.key;
        });
      }
    }
  }]);

  return GameManager;
}();

exports.default = GameManager;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gameManager = __webpack_require__(2);

var _gameManager2 = _interopRequireDefault(_gameManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameVersion = '0.0.1.3'; // Imports


console.log("Starting dino-clone version: " + gameVersion);

// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var maxWidth = 900;
var cWidth = innerWidth * 0.95 < maxWidth ? innerWidth * 0.95 : maxWidth;

canvas.width = cWidth;
canvas.height = cWidth / 2;

// Variables
var mouse = {
    x: undefined,
    y: undefined
};

var looping = false;

var pastTime = undefined;
var _lastFrameRate = 0;
var frameRate = function frameRate() {
    return _lastFrameRate;
};
window.frameRate = frameRate;
window.frameCount = 0;

// Event Listeners
addEventListener('mousemove', function (e) {
    var canvasPos = canvas.getBoundingClientRect();
    mouse.x = e.clientX - canvasPos.x;
    mouse.y = e.clientY - canvasPos.y;
});

// TODO: make the canvas responsive and not restart every time it's rescaled.

addEventListener('mousedown', function (e) {
    e.preventDefault();
    gm.keyPressed({
        key: ' '
    });
});

addEventListener('mouseup', function (e) {
    e.preventDefault();
    gm.keyReleased({
        key: ' '
    });
});

addEventListener('touchstart', function (e) {
    e.preventDefault();
    gm.keyPressed({
        key: ' '
    });
});
addEventListener('touchmove', function (e) {
    e.preventDefault();
});
addEventListener('touchend', function (e) {
    e.preventDefault();
    gm.keyReleased({
        key: ' '
    });
});

addEventListener('keydown', function (e) {
    if (e.key == 'r') {
        init();
        return;
    }
    gm.keyPressed(e);
});

addEventListener('keyup', function (e) {
    gm.keyReleased(e);
});

function loop() {
    looping = true;
    animate();
}

function noLoop() {
    looping = false;
}

// Objects
var gm = void 0;

// Implementation
function init() {
    looping = true;

    var wBounds = {
        x: canvas.width,
        y: canvas.height
    };

    gm = new _gameManager2.default(wBounds);
}

// Animation Loop
function animate() {
    var currentTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var ignoreLoop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (!(ignoreLoop || looping)) return;
    requestAnimationFrame(animate);
    window.frameCount += 1;

    _lastFrameRate = 1000 / (currentTime - pastTime);
    pastTime = currentTime;

    c.clearRect(0, 0, canvas.width, canvas.height);

    gm.draw(c);
    gm.update();
}

init();
pastTime = performance.now();
animate(undefined, true);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collision = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Obstacle = function () {
  function Obstacle(type, boundaries) {
    var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
      return 0.0;
    };

    _classCallCheck(this, Obstacle);

    var typeInfo = Obstacle.types[type];
    this.bounds = boundaries;

    this.type = type;

    this.getCurrentSpeed = speed;

    this.pos = {};
    this.pos.x = this.bounds.x + typeInfo.pos.x;
    this.pos.y = this.bounds.y - typeInfo.pos.y;

    this.sz = {
      x: typeInfo.width,
      y: typeInfo.height
    };

    this.body = new _collision.RectCollider(this);

    this.static = true;
  }

  _createClass(Obstacle, [{
    key: 'update',
    value: function update() {
      var currentSpeed = this.getCurrentSpeed();

      this.pos.x -= currentSpeed;
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      // console.log("drawing")
      ctx.beginPath();
      ctx.rect(this.pos.x, this.pos.y, this.sz.x, this.sz.y);
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'gray';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      if (this.type.startsWith("ground")) {
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.moveTo(this.pos.x - 1, this.pos.y + this.sz.y);
        ctx.lineTo(this.pos.x + this.sz.x + 1, this.pos.y + this.sz.y);
        ctx.stroke();
      }

      if (window.gameConfig.debugging) this.body.draw(ctx);
    }
  }], [{
    key: 'getTypes',
    value: function getTypes() {
      var obstacleTypes = Object.keys(Obstacle.types);

      return obstacleTypes;
    }
  }]);

  return Obstacle;
}();

Obstacle.types = {
  groundShortNarrow: {
    width: 50,
    height: 50,
    pos: {
      x: 0,
      y: 40
    }
  },
  groundShortWide: {
    width: 100,
    height: 50,
    pos: {
      x: 0,
      y: 40
    }
  },
  groundShortExtraWide: {
    width: 120,
    height: 50,
    pos: {
      x: 0,
      y: 40
    }
  },
  groundTallNarrow: {
    width: 50,
    height: 100,
    pos: {
      x: 0,
      y: 90
    }
  },
  groundTallWide: {
    width: 80,
    height: 100,
    pos: {
      x: 0,
      y: 90
    }
  },
  flyerMiddleShort: {
    width: 50,
    height: 30,
    pos: {
      x: 0,
      y: 70
    }
  },
  flyerMiddleTall: {
    width: 50,
    height: 90,
    pos: {
      x: 0,
      y: 130
    }
  }
};

exports.default = Obstacle;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(1);

var _collision = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
    function Ball(x, y, vel, radius, color) {
        var boundaries = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
            x: 0,
            y: 0,
            w: 1,
            h: 1
        };

        _classCallCheck(this, Ball);

        this.pos = {
            x: x,
            y: y
        };
        this.vel = vel;

        this.jumpForce = {
            x: 0,
            y: -30
        };

        this.maxJumpHeight = 60;

        this.falling = false;

        this.bounds = boundaries;

        this.score = 0;

        this.acc = {
            x: 0,
            y: 0
        };

        this.static = false;

        this.radius = radius;
        this.color = color;

        this.maxSpeed = 15;
        this.currentSpeed = (0, _utils.distance)(0, 0, this.vel.x, this.vel.y);

        this.bounce = 0.00;
        this.body = new _collision.CircleCollider(this);
    }

    _createClass(Ball, [{
        key: 'applyForce',
        value: function applyForce(f) {
            this.acc.x += f.x;
            this.acc.y += f.y;
        }
    }, {
        key: 'jump',
        value: function jump() {
            if (!this.falling) this.applyForce(this.jumpForce);
        }
    }, {
        key: 'update',
        value: function update() {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;

            this.vel.x += this.acc.x;
            this.vel.y += this.acc.y;

            if (this.pos.x + this.radius > this.bounds.w && this.vel.x > 0) this.vel.x = -this.vel.x * this.bounce;
            if (this.pos.x - this.radius < this.bounds.x && this.vel.x < 0) this.vel.x = -this.vel.x * this.bounce;
            if (this.pos.y + this.radius > this.bounds.h && this.vel.y > 0) {
                this.vel.y = -this.vel.y * this.bounce;
                this.falling = false;
            }

            if (this.pos.y < this.bounds.h - this.maxJumpHeight) this.falling = true;

            this.pos.x = (0, _utils.constrain)(this.pos.x, this.bounds.x + this.radius, this.bounds.w - this.radius);
            this.pos.y = (0, _utils.constrain)(this.pos.y, this.bounds.y + this.radius, this.bounds.h - this.radius);

            var currentSpeed = (0, _utils.distance)(0, 0, this.vel.x, this.vel.y);
            if (currentSpeed > this.maxSpeed) {
                var ratioSpeed = this.maxSpeed / currentSpeed;

                this.vel.x *= ratioSpeed;
                this.vel.y *= ratioSpeed;
            }

            this.currentSpeed = (0, _utils.distance)(0, 0, this.vel.x, this.vel.y);

            this.acc = {
                x: 0,
                y: 0
            };
        }
    }, {
        key: 'draw',
        value: function draw(ctx) {

            var distFromBottom = this.bounds.h - this.radius - this.pos.y;
            var threshold = 60;
            if (distFromBottom < threshold) {
                var elSize = (0, _utils.map)(distFromBottom, 0, threshold, this.radius * 1.5, this.radius * 2.4);

                ctx.beginPath();
                ctx.ellipse(this.pos.x, this.bounds.h + 3, elSize, elSize * 0.2, 0, 0, 2 * Math.PI);
                var col = (0, _utils.map)(distFromBottom, 0, threshold, 90, 255);
                ctx.fillStyle = "rgba(" + col + ", " + col + ", " + col + ")";

                ctx.fill();
            }

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.arc(this.pos.x, this.pos.y, this.radius + 2, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'white';
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.fill();
            ctx.stroke();

            ctx.closePath();

            ctx.beginPath();
            var arcStart = this.score % (Math.PI * 2);

            ctx.arc(this.pos.x, this.pos.y, this.radius * 0.75, arcStart, arcStart + Math.PI / 2, false);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'gray';
            ctx.stroke();

            ctx.beginPath();

            if (window.gameConfig.debugging) this.body.draw(ctx);
        }
    }]);

    return Ball;
}();

exports.default = Ball;

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map