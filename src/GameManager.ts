import Platform from "./components/Platform";
import Player from "./components/Player";
import { GameState, Movement } from "./utils/enum";
import { collisionDetection, getRandomInt } from "./utils/utils";
import bgImage from "./assets/bg.png";
import { platformDimensions, playerDy } from "./Constants/constants";
export default class GameManager {
  platforms: Platform[];
  platformBaseLineY: number;
  canvas: HTMLCanvasElement;
  ground?: Platform;
  context: CanvasRenderingContext2D;
  groundHeight: number;
  minNoOfPlatformPerRange: number;
  maxNoOfPlatformPerRange: number;
  platformHorizontalGapRange: number;
  x: number;
  y: number;
  score?: number;
  scoreBasis?: Platform;
  gameState: GameState;
  player?: Player;
  playerWidth: number;
  playerHeight: number;
  bgImage: CanvasImageSource;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.platforms = [];
    this.context = this.canvas.getContext("2d")!;
    this.x = 0;
    this.y = 0;
    // this.canvas.width = window.innerWidth;
    this.canvas.width = 500;

    this.canvas.height = window.innerHeight - 10;
    this.groundHeight = 100;

    //the initial baseline for platforms is twice the height of ground
    this.platformBaseLineY = this.canvas.height - 2 * this.groundHeight;

    //the range for generating platform in y-axis
    this.platformHorizontalGapRange = 100;

    this.minNoOfPlatformPerRange = 2;
    this.maxNoOfPlatformPerRange = 3;

    //set bg image
    this.bgImage = new Image();
    this.bgImage.src = bgImage;

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
      if (e.code === "Space") {
        if (this.gameState === GameState.RUNNING) return;
        ///set game state to running
        this.gameState = GameState.RUNNING;

        //set score to 0
        this.score = 0;

        //generate ground
        this.ground = new Platform(
          this.context,
          this.x,
          this.canvas.height - this.groundHeight,
          this.canvas.width,
          this.groundHeight
        );

        //set score basis to ground
        this.scoreBasis = this.ground;

        //generate a new Player with random x and y

        this.player = new Player(
          this.context,
          getRandomInt(this.x, this.canvas.width - this.playerWidth),
          this.ground!.y - this.playerHeight,
          this.playerWidth,
          this.playerHeight
        );

        //generate platforms
        this.generatePlatform(-this.canvas.height);

        //increase the gap for other platforms
        this.platformHorizontalGapRange = 130;
      }

      //event listener logic when game is running
      if (this.gameState != GameState.RUNNING) return;

      //for left movement
      if (e.code === "ArrowLeft") {
        this.player!.movement = Movement.LEFT;
      }

      //for right movement
      if (e.code === "ArrowRight") {
        this.player!.movement = Movement.RIGHT;
      }
    });

    //eventlistener for keyup
    document.addEventListener("keyup", (e) => {
      if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
        this.player!.movement = Movement.STATIONERY;
      }
    });

    requestAnimationFrame(this.start);
  }

  generatePlatform = (yMin: number) => {
    let noOfPlatformPerRange = getRandomInt(
      this.minNoOfPlatformPerRange,
      this.maxNoOfPlatformPerRange
    );
    let x: number, y: number;
    while (this.platformBaseLineY >= yMin) {
      console.log("inside generate");
      for (let i = 1; i <= noOfPlatformPerRange; i++) {
        //get random X
        x = getRandomInt(this.x, this.canvas.width - this.playerWidth);
        y = getRandomInt(
          this.platformBaseLineY - this.platformHorizontalGapRange,
          this.platformBaseLineY
        );
        //if collides generate again
        while (
          this.platforms.some((platform) => {
            if (
              platform.x <= x + platformDimensions.width &&
              platform.x + platform.width >= x &&
              platform.y <= y + platformDimensions.height &&
              platform.y + platform.height >= y
            ) {
              return true;
            } else {
              return false;
            }
          })
        ) {
          x = getRandomInt(this.x, this.canvas.width - this.playerWidth);
          y = getRandomInt(
            this.platformBaseLineY - this.platformHorizontalGapRange,
            this.platformBaseLineY
          );
        }

        this.platforms.push(
          new Platform(
            this.context,
            x,
            y,
            platformDimensions.width,
            platformDimensions.height
          )
        );
      }
      this.platformBaseLineY -= this.platformHorizontalGapRange;
    }
  };

  draw = () => {
    //set ground to canvas width
    // this.ground.width = this.canvas.width;

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

    //draw background
    this.context.drawImage(
      this.bgImage,
      this.x,
      this.y,
      this.canvas.width,
      this.canvas.height
    );
    //draw ground
    if (this.ground) this.ground.draw();

    //draw platforms
    this.platforms.forEach((platform) => {
      platform.draw();
    });

    //draw player
    this.player?.draw();

    //draw score
    this.drawScore();
  };

  drawScore() {
    this.context.beginPath();
    this.context.font = "20px sans-serif";
    this.context.fillText(`Score: ${this.score}`, this.x + 10, this.y + 30);
    this.context.closePath();
  }

  update = () => {
    if (this.gameState !== GameState.RUNNING) return;
    //update player
    this.player?.update();

    //check if player fell to ground
    if (this.ground && this.player!.y + this.player!.height >= this.ground.y) {
      this.player!.y = this.ground.y - this.player!.height;
      this.player!.resetDy();
    }

    //check if player went out of boundary on x-axis
    if (this.player!.x > this.canvas.width) {
      this.player!.x = 0;
    }
    if (this.player!.x + this.player!.width < this.x) {
      this.player!.x = this.canvas.width - this.player!.width;
    }

    //move platform down
    this.movePlatformsAndBaseYDown();

    //remove platforms
    this.removeOutOfBoundaryPlatform();

    //generate platforms
    if (this.platformBaseLineY > -10) {
      this.generatePlatform(-this.groundHeight);
    }
  };

  movePlatformsAndBaseYDown() {
    //if platform player is on half of height then move platform nd ground down
    if (this.player!.y < (1 / 3) * this.canvas.height) {
      this.platforms.forEach((platform) => {
        if (this.player!.y > this.y + 100) {
          platform.y += 10;
        } else {
          platform.y += 20;
        }
      });
      if (this.ground) this.ground.y += 10;
      //reset platformBaseLine
      this.platformBaseLineY += this.player!.y > this.y + 50 ? 10 : 20;
    }
  }

  removeOutOfBoundaryPlatform() {
    if (this.ground && this.ground.y > this.canvas.height) {
      this.ground = undefined;
    }

    this.platforms = this.platforms.filter(
      (platform) => platform.y < this.canvas.height
    );
  }

  collisionCheck = () => {
    if (this.gameState !== GameState.RUNNING) return;

    //collision between player and platforms
    if (this.player!.dy >= 0) {
      this.platforms.forEach((platform) => {
        if (collisionDetection(this.player!, platform)) {
          this.player!.y = platform.y - this.player!.height;
          this.player!.resetDy();
          this.updateScore(platform);
        }
      });
    }
  };

  updateScore(platform: Platform) {
    console.log(platform);
    if (this.scoreBasis!.y < platform.y) return;

    let diff = Math.abs(platform.y - this.scoreBasis!.y);
    this.score! += diff;
    this.scoreBasis = platform;
  }

  start = () => {
    this.draw();
    this.collisionCheck();
    this.update();

    requestAnimationFrame(this.start);
  };
}
