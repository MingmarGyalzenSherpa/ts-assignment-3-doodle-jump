export default class Ground {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
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
  }
  draw() {
    this.context.beginPath();
    this.context.fillStyle = "black";
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.closePath();
  }
}
