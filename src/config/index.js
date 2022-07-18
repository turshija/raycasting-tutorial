import { getTextureData } from '../utils/canvas';

const WIDTH = 640;
const HEIGHT = 480;
const FOV = 60;
const PRECISION = 64;
const SCALE = 1;

export default {
  screen: {
    width: WIDTH,
    halfWidth: WIDTH / 2,
    height: HEIGHT,
    halfHeight: HEIGHT / 2,
    scale: SCALE
  },
  projection: {
    width: WIDTH / SCALE,
    height: HEIGHT / SCALE,
    halfWidth: (WIDTH / SCALE) / 2,
    halfHeight: (HEIGHT / SCALE) / 2
  },
  rayCasting: {
    incrementAngle: FOV / (WIDTH / SCALE),
    precision: PRECISION
  },
  player: {
    fov: FOV,
    halfFov: FOV / 2,
    x: 2,
    y: 2,
    radius: 10,
    angle: 90,
    speed: {
      movement: 0.05,
      rotation: 1.5
    }
  },
  map: [
    [2,2,2,2,2,2,2,2,2,2],
    [2,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,0,2],
    [2,0,0,2,2,0,2,0,0,2],
    [2,0,0,2,0,0,2,0,0,2],
    [2,0,0,2,0,0,2,0,0,2],
    [2,0,0,1,0,2,2,0,0,2],
    [2,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,0,2],
    [2,1,1,2,1,2,1,2,2,2],
  ],
  textures: [
    {
      id: 1,
      width: 8,
      height: 8,
      bitmap: [
        [1,1,1,1,1,1,1,1],
        [0,0,0,1,0,0,0,1],
        [1,1,1,1,1,1,1,1],
        [0,1,0,0,0,1,0,0],
        [1,1,1,1,1,1,1,1],
        [0,0,0,1,0,0,0,1],
        [1,1,1,1,1,1,1,1],
        [0,1,0,0,0,1,0,0]
      ],
      colors: [
        "rgb(255, 241, 232)",
        "rgb(194, 195, 199)",
      ]
    },
    {
      width: 16,
      height: 16,
      id: 2,
      name: "wall",
      file: "wall.png"
    }
  ],
  key: {
    up: "KeyW",
    down: "KeyS",
    left: "KeyA",
    right: "KeyD"
  }
};
