import { canvasDimension } from "../Constants/constants";
import platformImageNormal from "../assets/platform-1.png";
import platformImageMoving from "../assets/platform-2.png";
import { PlatformType } from "../utils/enum";

export default class Platform {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  image: CanvasImageSource;
  dx: number;
  type: PlatformType;
  constructor(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    type: PlatformType
  ) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.type = type;

    this.dx = this.type === PlatformType.MOVING ? 3 : 0;
    this.width = width;
    this.height = height;
    this.image = new Image();

    switch (this.type) {
      case PlatformType.MOVING:
        this.image.src = platformImageMoving;
        this.dx = 4;
        break;
      case PlatformType.NORMAL:
        this.image.src = platformImageNormal;
        break;
    }
  }

  draw() {
    this.context.beginPath();
    if (this.type === PlatformType.GROUND) {
      this.context.fillStyle = "black";
    }
    if (this.type === PlatformType.BREAK) {
      this.context.fillStyle = "red";
    }

    if (this.type === PlatformType.GROUND || this.type === PlatformType.BREAK) {
      this.context.fillRect(this.x, this.y, this.width, this.height);
      this.context.closePath();
      return;
    }

    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);

    this.context.closePath();
  }

  update() {
    this.x += this.dx;
    if (this.x + this.width >= canvasDimension.width) {
      this.x = canvasDimension.width - this.width;
      this.dx = -this.dx;
    }
    if (this.x <= 0) {
      this.dx = -this.dx;
      this.x = 0;
    }
  }
}
