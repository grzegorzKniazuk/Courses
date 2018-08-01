import {Sprite} from "./Sprite";

class Paddle extends Sprite {
    constructor(sprite: HTMLElement, public maxRight : number) {
        super(sprite);
    }

    moveLeft(step?: number) {
        let newPosition = this.clone();
        newPosition.moveLeft(step);

        if (newPosition.topLeft.x >= 0) {
            this.moveTo(newPosition);
        }
    }

    moveRight(step? : number) {
        let newPosition = this.clone();
        newPosition.moveRight(step);

        if (newPosition.bottomRight.x <= this.maxRight) {
            this.moveTo(newPosition);
        }
    }

    calculateHitAngle(ballX : number, ballRadius : number) : number {
        let hitSpot = ballX - this.topLeft.x;
        let maxPaddle = this.width() + ballRadius;
        let minPaddle = -ballRadius;
        let paddleRange = maxPaddle - minPaddle;

        let minAngle = 160;
        let maxAngle = 20;
        let angleRange = maxAngle - minAngle;

        return ((hitSpot * angleRange) / paddleRange) + minAngle;
    }
}

export {Paddle}