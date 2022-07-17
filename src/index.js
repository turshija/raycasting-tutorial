import config from './config';
import { main } from './app';

function component() {
  const screen = document.createElement('canvas');
  screen.width = config.screen.width;
  screen.height = config.screen.height;
  screen.style.border = "1px solid black";
  return screen;
}

const screen = component();
document.body.appendChild(screen);

main(screen);
