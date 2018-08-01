import {Side, GameState, KeyCodes} from "./enums";
import {Ball} from "./Ball";
import {Obstacle} from "./Obstacle";
import {Brick} from "./Brick";
import {Paddle} from "./Paddle";
import {Vector} from "./Vector";

class Game {
    loopInterval: number = 10;
    gameState: GameState;
    ball: Ball;
    paddle: Paddle;
    bricks: Array<Brick> = [];

    keyMap = {};

    wallLeft : Obstacle;
    wallTop: Obstacle;
    wallRight: Obstacle;
    wallBottom: Obstacle;

    livesLeft : number;
    score: number;

    constructor(ballElement : HTMLElement, paddle: HTMLElement, bricks: HTMLCollection, boardElement : HTMLElement, public livesLabel : HTMLElement, public scoreLabel: HTMLElement, public newGameBtn: HTMLElement) {
        this.gameState = GameState.Running;
        this.paddle = new Paddle(paddle, boardElement.offsetWidth);

        this.ball = new Ball(
            ballElement,
            new Vector(3, -3)
        );

        for (let i = 0; i < bricks.length; i++) {
            this.bricks.push(new Brick(<HTMLElement>bricks[i]));
        }

        this.createWalls(this.ball.radius, boardElement.offsetWidth, boardElement.offsetHeight);

        this.newGame();

        this.newGameBtn.addEventListener('click', () => this.newGame());
    }

    createWalls(radius : number, maxX : number, maxY : number) {
        this.wallLeft = new Obstacle(-radius, -radius, 0, maxY + radius);
        this.wallTop = new Obstacle(-radius, -radius, maxX + radius, 0);
        this.wallRight = new Obstacle(maxX, -radius, maxX + radius, maxY + radius);
        this.wallBottom = new Obstacle(-radius, maxY, maxX + radius, maxY + radius);
    }

    newGame() {
        this.newGameBtn.style.display = 'none';
        this.score = 0;
        this.livesLeft = 3;
        this.livesLabel.innerText = '' + this.livesLeft;
        this.score = 0;
        this.scoreLabel.innerText = '' + this.score;
        this.ball.show();
        this.ball.bounceWithAngle(60);
        let ballPosition = this.ball.clone();
        ballPosition.moveCenterXTo(this.paddle.centerX());
        ballPosition.moveBottomTo(this.paddle.topLeft.y - 4);
        this.ball.moveTo(ballPosition);
        this.gameState = GameState.Running;
    }

    lostLive() {
        if (--this.livesLeft) {
            this.ball.bounceWithAngle(60);
            let ballPosition = this.ball.clone();
            ballPosition.moveCenterXTo(this.paddle.centerX());
            ballPosition.moveBottomTo(this.paddle.topLeft.y - 4);
            this.ball.moveTo(ballPosition);
        } else {
            this.gameState = GameState.GameOver;
            this.ball.hide();
            this.newGameBtn.style.display = 'block';
        }
        this.livesLabel.innerText = '' + this.livesLeft;
    }

    run() {
        document.addEventListener('keyup', (e) => this.keyMap[e.keyCode] = false);
        document.addEventListener('keydown', (e) => this.keyMap[e.keyCode] = true);

        setInterval(() => {
            if (this.gameState !== GameState.Running) {
                return;
            }
            let newBallPosition = this.ball.calculateNewPosition();

            if (this.keyMap[KeyCodes.LEFT]) {
                this.paddle.moveLeft(5);
            } else if (this.keyMap[KeyCodes.RIGHT]) {
                this.paddle.moveRight(5);
            }

            if (this.wallBottom.checkCollision(newBallPosition)) {
                this.lostLive();
                return;
            }

            if (this.wallLeft.checkCollision(newBallPosition) || this.wallRight.checkCollision(newBallPosition)) {
                this.ball.bounceVertical();
            }
            if (this.wallTop.checkCollision(newBallPosition)) {
                this.ball.bounceHorizontal();
            }

            for (let brick of this.bricks) {
                let wasHit = false;

                switch (brick.checkCollision(newBallPosition)) {
                    case (Side.Left):
                    case (Side.Right):
                        this.ball.bounceVertical();
                        wasHit = true;
                        break;

                    case (Side.Top):
                    case (Side.Bottom):
                        this.ball.bounceHorizontal();
                        wasHit = true;
                }

                if (wasHit) {
                    brick.hide();
                    this.score += 20;
                    this.scoreLabel.innerText = '' + this.score;
                    break;
                }
            }

            if (this.paddle.checkCollision(newBallPosition)) {
                this.ball.bounceWithAngle(this.paddle.calculateHitAngle(this.ball.centerX(), this.ball.radius));
            }

            this.ball.moveTo(this.ball.calculateNewPosition());
        }, this.loopInterval)
    }
}

export {Game}