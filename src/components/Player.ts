import { playerDy } from "../Constants/constants";
import { Movement } from "../utils/enum";

export default class Player {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  dy: number;
  dx: number;
  gravity: number;
  width: number;
  height: number;
  hasLanded: boolean;
  movement: Movement;
  constructor(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dy = playerDy;
    this.dx = 5;
    this.gravity = 1;
    this.hasLanded = false;
    this.movement = Movement.STATIONERY;
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = "green";
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.closePath();
  }

  resetDy() {
    this.dy = playerDy;
  }

  update() {
    this.y += this.dy;
    this.dy += this.gravity;
    console.log({ dy: this.dy });

    if (this.movement === Movement.LEFT) {
      this.x -= this.dx;
    }

    if (this.movement === Movement.RIGHT) {
      this.x += this.dx;
    }
  }
}
