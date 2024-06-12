import Platform from "./components/Platform";
import { GameState } from "./utils/enum";

interface IGameManager {
  platforms: Platform[];
  canvas: HTMLCanvasElement;
  ground: Platform;
  context: CanvasRenderingContext2D;
  groundHeight: number;
  x: number;
  y: number;
  gameState: GameState;
}

export default class GameManager implements IGameManager {
  platforms: Platform[];
  canvas: HTMLCanvasElement;
  ground: Platform;
  context: CanvasRenderingContext2D;
  groundHeight: number;
  x: number;
  y: number;
  gameState: GameState;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.platforms = [];
    this.context = this.canvas.getContext("2d")!;
    this.x = 0;
    this.y = 0;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - 20;
    this.groundHeight = 100;
    this.ground = new Platform(
      this.context,
      this.x,
      this.canvas.height - this.groundHeight,
      this.canvas.width,
      this.groundHeight
    );
    this.gameState = GameState.WAITING;

    //on resize change canvas width
    document.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });

    requestAnimationFrame(this.start);
  }

  draw = () => {
    //set ground to canvas width
    this.ground.width = this.canvas.width;

    switch (this.gameState) {
      case GameState.WAITING:
        this.waitingStateRender();
        break;

      case GameState.RUNNING:
        break;
      case GameState.PAUSED:
        break;
      case GameState.END:
        break;
    }
  };

  waitingStateRender = () => {
    this.context.clearRect(
      this.x,
      this.y,
      this.canvas.width,
      this.canvas.height
    );
    this.context.fillStyle = "black";
    this.context.fillRect(
      this.x,
      this.y,
      this.canvas.width,
      this.canvas.height
    );
  };

  runningStateRender = () => {
    this.context.clearRect(
      this.x,
      this.y,
      this.canvas.width,
      this.canvas.height
    );

    //draw ground
    this.context.beginPath();
    this.context.fillStyle = "black";
    this.context.fillRect(
      this.x,
      this.canvas.height - this.groundHeight,
      this.canvas.width,
      this.groundHeight
    );
  };

  update = () => {};

  collisionCheck = () => {};

  start = () => {
    this.draw();
    this.collisionCheck();
    this.update();

    requestAnimationFrame(this.start);
  };
}
