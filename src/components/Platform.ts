import enemySheet from "../assets/platforms.png";

export default class Platform {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  image: CanvasImageSource;
  dx: number;
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
    this.dx = 0;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = enemySheet;
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = "black";
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.drawImage(
      this.image,
      70,
      20,
      90,
      40,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.context.closePath();
  }

  update() {
    this.x += this.dx;
  }
}
