import { playerDy, playerGravity } from "../Constants/constants";
import { Movement } from "../utils/enum";
import playerLeftImage from "../assets/blueL.png";
import playerRightImage from "../assets/blueR.png";
import playerNormalImage from "../assets/blueT.png";
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
  //   images: { Left: string; Right: string; Stationery: string };
  image: any;
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
    this.gravity = 0.7;
    this.hasLanded = false;
    this.movement = Movement.STATIONERY;
    this.image = new Image();

    //initially player is stationery
    this.image.src = playerNormalImage;
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = "green";

    //image based on player movement
    switch (this.movement) {
      case Movement.LEFT:
        this.image.src = playerLeftImage;
        break;
      case Movement.RIGHT:
        this.image.src = playerRightImage;
        break;
    }
    // this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.drawImage(
      this.image as CanvasImageSource,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.context.closePath();
  }

  resetDy(newDy?: number) {
    this.dy = newDy ? newDy : playerDy;
  }

  resetGravity() {
    this.gravity = playerGravity;
  }

  update() {
    this.y += this.dy;
    this.dy += this.gravity;
    if (this.movement === Movement.LEFT) {
      this.x -= this.dx;
    }

    if (this.movement === Movement.RIGHT) {
      this.x += this.dx;
    }
  }
}
