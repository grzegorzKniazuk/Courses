import {Rect} from "./Rect";
import {Side} from "./enums";

class Obstacle extends Rect {
    checkCollision(anotherRect : Rect) : Side {
        let w = 0.5 * (this.width() + anotherRect.width());
        let h = 0.5 * (this.height() + anotherRect.height());
        let dx = this.centerX() - anotherRect.centerX();
        let dy = this.centerY() - anotherRect.centerY();

        if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
            let wy = w * dy;
            let hx = h * dx;
            if (wy > hx) {
                return wy > -hx ? Side.Top : Side.Left;
            } else {
                return wy > -hx ? Side.Right : Side.Bottom;
            }
        } else {
            return Side.None;
        }
    }
}

export {Obstacle}