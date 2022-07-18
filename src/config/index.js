import { Color } from '../app/Color';

const WIDTH = 640;
const HEIGHT = 480;
const FOV = 60;
const PRECISION = 64;
const SCALE = 1;
const PROJECTION_WIDTH = WIDTH / SCALE;
const PROJECTION_HEIGHT = HEIGHT / SCALE;

export default {
  screen: {
    width: WIDTH,
    halfWidth: WIDTH / 2,
    height: HEIGHT,
    halfHeight: HEIGHT / 2,
    scale: SCALE
  },
  projection: {
    width: PROJECTION_WIDTH,
    height: PROJECTION_HEIGHT,
    halfWidth: PROJECTION_WIDTH / 2,
    halfHeight: PROJECTION_HEIGHT / 2
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
      movement: 0.03,
      rotation: 1.1
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
        new Color(255, 241, 232, 255),
        new Color(194, 195, 199, 255)
      ]
    },
    {
      width: 16,
      height: 16,
      id: 2,
      name: "wall",
      file: "wall.png"
    },
    {
      width: 360,
      height: 60,
      id: "background",
      name: "Background",
      file: "background.png"
    },
    {
      width: 16,
      height: 16,
      id: 'test_floor',
      name: "Test Floor",
      file: "test_floor.png"
    },
    {
      width: 16,
      height: 16,
      id: 'floor',
      name: "Grass Floor",
      file: "floor.png"
    },
  ],
  key: {
    up: "KeyW",
    down: "KeyS",
    left: "KeyA",
    right: "KeyD"
  }
};
