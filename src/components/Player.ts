interface IPlayer {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default class Player implements IPlayer {
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
