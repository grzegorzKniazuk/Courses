"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
var Ball_1 = require("./Ball");
var Obstacle_1 = require("./Obstacle");
var Brick_1 = require("./Brick");
var Paddle_1 = require("./Paddle");
var Vector_1 = require("./Vector");
var Game = /** @class */ (function () {
    function Game(ballElement, paddle, bricks, boardElement, livesLabel, scoreLabel, newGameBtn) {
        var _this = this;
        this.livesLabel = livesLabel;
        this.scoreLabel = scoreLabel;
        this.newGameBtn = newGameBtn;
        this.loopInterval = 10;
        this.bricks = [];
        this.keyMap = {};
        this.gameState = enums_1.GameState.Running;
        this.paddle = new Paddle_1.Paddle(paddle, boardElement.offsetWidth);
        this.ball = new Ball_1.Ball(ballElement, new Vector_1.Vector(3, -3));
        for (var i = 0; i < bricks.length; i++) {
            this.bricks.push(new Brick_1.Brick(bricks[i]));
        }
        this.createWalls(this.ball.radius, boardElement.offsetWidth, boardElement.offsetHeight);
        this.newGame();
        this.newGameBtn.addEventListener('click', function () { return _this.newGame(); });
    }
    Game.prototype.createWalls = function (radius, maxX, maxY) {
        this.wallLeft = new Obstacle_1.Obstacle(-radius, -radius, 0, maxY + radius);
        this.wallTop = new Obstacle_1.Obstacle(-radius, -radius, maxX + radius, 0);
        this.wallRight = new Obstacle_1.Obstacle(maxX, -radius, maxX + radius, maxY + radius);
        this.wallBottom = new Obstacle_1.Obstacle(-radius, maxY, maxX + radius, maxY + radius);
    };
    Game.prototype.newGame = function () {
        this.newGameBtn.style.display = 'none';
        this.score = 0;
        this.livesLeft = 3;
        this.livesLabel.innerText = '' + this.livesLeft;
        this.score = 0;
        this.scoreLabel.innerText = '' + this.score;
        this.ball.show();
        this.ball.bounceWithAngle(60);
        var ballPosition = this.ball.clone();
        ballPosition.moveCenterXTo(this.paddle.centerX());
        ballPosition.moveBottomTo(this.paddle.topLeft.y - 4);
        this.ball.moveTo(ballPosition);
        this.gameState = enums_1.GameState.Running;
    };
    Game.prototype.lostLive = function () {
        if (--this.livesLeft) {
            this.ball.bounceWithAngle(60);
            var ballPosition = this.ball.clone();
            ballPosition.moveCenterXTo(this.paddle.centerX());
            ballPosition.moveBottomTo(this.paddle.topLeft.y - 4);
            this.ball.moveTo(ballPosition);
        }
        else {
            this.gameState = enums_1.GameState.GameOver;
            this.ball.hide();
            this.newGameBtn.style.display = 'block';
        }
        this.livesLabel.innerText = '' + this.livesLeft;
    };
    Game.prototype.run = function () {
        var _this = this;
        document.addEventListener('keyup', function (e) { return _this.keyMap[e.keyCode] = false; });
        document.addEventListener('keydown', function (e) { return _this.keyMap[e.keyCode] = true; });
        setInterval(function () {
            if (_this.gameState !== enums_1.GameState.Running) {
                return;
            }
            var newBallPosition = _this.ball.calculateNewPosition();
            if (_this.keyMap[enums_1.KeyCodes.LEFT]) {
                _this.paddle.moveLeft(5);
            }
            else if (_this.keyMap[enums_1.KeyCodes.RIGHT]) {
                _this.paddle.moveRight(5);
            }
            if (_this.wallBottom.checkCollision(newBallPosition)) {
                _this.lostLive();
                return;
            }
            if (_this.wallLeft.checkCollision(newBallPosition) || _this.wallRight.checkCollision(newBallPosition)) {
                _this.ball.bounceVertical();
            }
            if (_this.wallTop.checkCollision(newBallPosition)) {
                _this.ball.bounceHorizontal();
            }
            for (var _i = 0, _a = _this.bricks; _i < _a.length; _i++) {
                var brick = _a[_i];
                var wasHit = false;
                switch (brick.checkCollision(newBallPosition)) {
                    case (enums_1.Side.Left):
                    case (enums_1.Side.Right):
                        _this.ball.bounceVertical();
                        wasHit = true;
                        break;
                    case (enums_1.Side.Top):
                    case (enums_1.Side.Bottom):
                        _this.ball.bounceHorizontal();
                        wasHit = true;
                }
                if (wasHit) {
                    brick.hide();
                    _this.score += 20;
                    _this.scoreLabel.innerText = '' + _this.score;
                    break;
                }
            }
            if (_this.paddle.checkCollision(newBallPosition)) {
                _this.ball.bounceWithAngle(_this.paddle.calculateHitAngle(_this.ball.centerX(), _this.ball.radius));
            }
            _this.ball.moveTo(_this.ball.calculateNewPosition());
        }, this.loopInterval);
    };
    return Game;
}());
exports.Game = Game;
