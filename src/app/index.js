import config from '../config';
import { clearscreen } from '../utils/canvas';
import { raycasting } from './raycasting';
import { Player } from './Player';
import { Textures } from './Textures';

export const main = async (screen) => {
  const screenContext = screen.getContext("2d");
  screenContext.scale(config.screen.scale, config.screen.scale);
  config.screen.scale === 1 && screenContext.translate(0.5, 0.5);

  const player = new Player(config.player);
  const textures = new Textures();
  await textures.loadAll();

  const pressedKeys = {};
  document.addEventListener('keydown', ({ code }) => pressedKeys[code] = true);
  document.addEventListener('keyup', ({ code }) => pressedKeys[code] = false);

  const doLogic = () => {
    pressedKeys[config.key.up] && player.moveForward();
    pressedKeys[config.key.down] && player.moveBackward();
    pressedKeys[config.key.left] && player.turnLeft();
    pressedKeys[config.key.right] && player.turnRight();

    clearscreen(screenContext, config.projection);
    raycasting(screenContext, player, textures);
    requestAnimationFrame(doLogic);
  }
  requestAnimationFrame(doLogic);
}
