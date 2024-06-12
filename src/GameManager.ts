import Platform from "./components/Platform";
import Player from "./components/Player";
import { GameState, Movement } from "./utils/enum";
import { getRandomInt } from "./utils/utils";
import playerLeftImage from "./assets/blueL.png";
import playerRightImage from "./assets/blueR.png";
import PlayerNormalImage from "./assets/blueT.png";
export default class GameManager {
  platforms: Platform[];
  canvas: HTMLCanvasElement;
  ground: Platform;
  context: CanvasRenderingContext2D;
  groundHeight: number;
  x: number;
  y: number;
  gameState: GameState;
  player?: Player;
  playerWidth: number;
  playerHeight: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.platforms = [];
    this.context = this.canvas.getContext("2d")!;
    this.x = 0;
    this.y = 0;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - 10;
    this.groundHeight = 100;
    this.ground = new Platform(
      this.context,
      this.x,
      this.canvas.height - this.groundHeight,
      this.canvas.width,
      this.groundHeight
    );

    //set player width and height
    this.playerWidth = 70;
    this.playerHeight = 100;

    //set game state
    this.gameState = GameState.WAITING;

    //on resize change canvas width
    document.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight - 10;
    });

    //event listener for game
    document.addEventListener("keydown", (e) => {
      console.log(e.code);
      if (e.code === "Space") {
        if (this.gameState === GameState.RUNNING) return;
        ///set game state to running
        this.gameState = GameState.RUNNING;
        //generate a new Player with random x and y
        this.player = new Player(
          this.context,
          getRandomInt(this.x, this.canvas.width - this.playerWidth),
          this.ground.y - this.playerHeight,
          this.playerWidth,
          this.playerHeight
        );
      }

      //event listener logic when game is running
      if (this.gameState != GameState.RUNNING) return;

      //for left movement
      if (e.code === "ArrowLeft") {
        console.log("left");
        this.player!.movement = Movement.LEFT;
      }

      //for right movement
      if (e.code === "ArrowRight") {
        console.log("Right");
        this.player!.movement = Movement.RIGHT;
      }
    });

    //eventlistener for keyup
    document.addEventListener("keyup", (e) => {
      console.log(e.code);
      if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
        this.player!.movement = Movement.STATIONERY;
      }
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
        this.runningStateRender();
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

    //draw player
    this.player?.draw();
  };

  update = () => {
    if (this.gameState !== GameState.RUNNING) return;

    //update player
    this.player?.update();

    //check if player fell to ground
    if (this.player!.y + this.player!.height >= this.ground.y) {
      this.player!.resetDy();
      this.player!.y = this.ground.y - this.player!.height;
    }
  };

  collisionCheck = () => {
    if (this.gameState !== GameState.RUNNING) return;
  };

  start = () => {
    this.draw();
    this.collisionCheck();
    this.update();

    requestAnimationFrame(this.start);
  };
}
