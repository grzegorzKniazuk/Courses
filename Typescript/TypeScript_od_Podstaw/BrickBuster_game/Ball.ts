import {Sprite} from "./Sprite";
import {Vector} from "./Vector";
import {Rect} from "./Rect";

class Ball extends Sprite {

    radius : number;
    dir  : Vector;
    velocity: number;

    constructor(sprite: HTMLElement, dir : Vector) {
        let radius = parseInt(getComputedStyle(sprite)['border-top-left-radius']);
        super(sprite, sprite.offsetLeft, sprite.offsetTop, sprite.offsetLeft + 2 * radius, sprite.offsetTop + 2 * radius);
        this.sprite = sprite;
        this.radius = radius;
        this.velocity = 5;
        this.dir = dir;
    }

    calculateNewPosition() : Rect {
        let newPosition = this.clone();
        newPosition.add(this.dir);
        return newPosition;
    }

    bounceHorizontal() {
        this.dir.flipY();
    }

    bounceVertical() {
        this.dir.flipX();
    }

    bounceWithAngle(angle: number) {
        angle = angle * (Math.PI / 180);
        this.dir.x = Math.cos(angle) * this.velocity;
        this.dir.y = -Math.sin(angle) * this.velocity;
    }
}

export {Ball}