import { playerDy } from "../Constants/constants";
import Platform from "../components/Platform";
import Player from "../components/Player";

export function getRandomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min));
}

export function collisionDetection(
  player: Player,
  platform: Platform
): boolean {
  if (
    player.y + player.height >= platform.y &&
    player.y + player.height < platform.y + platform.height + -playerDy &&
    player.x <= platform.x + platform.width &&
    player.x + player.width >= platform.x
  ) {
    return true;
  } else {
    return false;
  }
}
