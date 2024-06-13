import GameManager from "./GameManager";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;

const startScreen = document.querySelector<HTMLDivElement>(".start-screen")!;
const username = document.querySelector<HTMLInputElement>(".username")!;
const startBtn = document.querySelector<HTMLButtonElement>(".start-btn")!;
const leaderBoarListEl = document.querySelector<HTMLOListElement>(
  ".leader-board__list"
);

const leaderBoard = localStorage.getItem("leaderboard");
if (leaderBoard) {
  const leaderBoardArr = JSON.parse(leaderBoard);
  leaderBoardArr.forEach((scoreInfo: { name: string; score: number }) => {
    let listEl = document.createElement("li");
    listEl.textContent = `${scoreInfo.name} ${scoreInfo.score}`;
    leaderBoarListEl?.appendChild(listEl);
  });
}

canvas.width = 500;
canvas.height = window.innerHeight - 10;
canvas.style.border = "1px solid black";

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  let name = username.value.trim();
  new GameManager(canvas!, name);
});
