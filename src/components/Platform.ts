interface IPlatform {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default class Platform implements IPlatform {
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
}
