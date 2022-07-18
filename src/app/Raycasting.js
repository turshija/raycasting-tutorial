import config from '../config';
import { degreeToRadians } from '../utils/common';
import { Color } from './Color';

export class Raycasting {
  context = null;

  player = null;

  textures = null;

  imageData = null;

  buffer = null;

  constructor (initConfig) {
    Object.assign(this, initConfig);

    this.imageData = initConfig.context.createImageData(config.projection.width, config.projection.height);
    this.buffer = this.imageData.data;
    this.context.imageSmoothingEnabled = false;
  }

  renderFrame() {
    for (
      let rayCount = 0, rayAngle = this.player.angle - this.player.halfFov;
      rayCount < config.projection.width;
      rayCount++, rayAngle += config.rayCasting.incrementAngle
    ) {
      const ray = {
        x: this.player.x,
        y: this.player.y
      }

      // Ray path incrementers
      const rayCos = Math.cos(degreeToRadians(rayAngle)) / config.rayCasting.precision;
      const raySin = Math.sin(degreeToRadians(rayAngle)) / config.rayCasting.precision;

      // Wall checking
      let wall = 0;
      while (wall === 0) {
        ray.x += rayCos;
        ray.y += raySin;
        wall = config.map[Math.floor(ray.y)][Math.floor(ray.x)];
      }

      // Pythagoras theorem
      let distance = Math.sqrt(Math.pow(this.player.x - ray.x, 2) + Math.pow(this.player.y - ray.y, 2));

      // Fish eye fix
      distance = distance * Math.cos(degreeToRadians(rayAngle - this.player.angle));

      // Wall height
      const wallHeight = Math.floor(config.projection.halfHeight / distance);

      // Get texture
      const texture = this.textures.get(wall);
      const backgroundTexture = this.textures.get('background');
      const floorTexture = this.textures.get('floor');
      // Calcule texture position
      const texturePositionX = Math.floor((texture.width * (ray.x + ray.y)) % texture.width);

      // Draw
      this.drawBackground(rayCount, 0, config.projection.halfHeight - wallHeight, backgroundTexture);
      this.drawTexture(rayCount, config.projection.halfHeight - wallHeight, wallHeight, texturePositionX, texture);
      this.drawFloor(rayCount, wallHeight, rayAngle, floorTexture)
    }

    this.renderBuffer();
  }

  renderBuffer() {
    const canvas = document.createElement('canvas');
    canvas.width = config.projection.width;
    canvas.height = config.projection.height;
    canvas.getContext('2d').putImageData(this.imageData, 0, 0);
    this.context.drawImage(canvas, 0, 0);
  }

  drawBackground(x, y1, y2, background) {
    const offset = (this.player.angle + x);
    for(let y = y1; y < y2; y++) {
      const textureX = Math.floor(offset % background.width);
      const textureY = Math.floor(y % background.height);
      const color = background.data[textureX + textureY * background.width];
      this.drawPixel(x, y, color);
    }
  }

  drawFloor(x1, wallHeight, rayAngle, texture) {
    const start = config.projection.halfHeight + wallHeight + 1;
    const directionCos = Math.cos(degreeToRadians(rayAngle))
    const directionSin = Math.sin(degreeToRadians(rayAngle))
    for(let y = start; y < config.projection.height; y++) {
      // Create distance and calculate it
      let distance = config.projection.height / (2 * y - config.projection.height)
      distance /= Math.cos(degreeToRadians(this.player.angle) - degreeToRadians(rayAngle)) // Inverse fisheye fix

      // Get the tile position
      let tilex = distance * directionCos
      let tiley = distance * directionSin
      tilex += this.player.x
      tiley += this.player.y
      const tile = config.map[Math.floor(tiley)][Math.floor(tilex)]

      if (tile !== 0) {
        continue;
      }

      const texture_x = (Math.floor(tilex * texture.width)) % texture.width
      const texture_y = (Math.floor(tiley * texture.height)) % texture.height

      // Get pixel color
      const color = texture.data[texture_x + texture_y * texture.width];
      this.drawPixel(x1, y, color)
    }
  }

  drawPixel(x, y, color) {
    const offset = 4 * (Math.floor(x) + Math.floor(y) * config.projection.width);
    this.buffer[offset  ] = color.r;
    this.buffer[offset+1] = color.g;
    this.buffer[offset+2] = color.b;
    this.buffer[offset+3] = color.a;
  }

  drawLine(x1, y1, y2, color) {
    for(let y = y1; y < y2; y++) {
      this.drawPixel(x1, y, color);
    }
  }

  drawTexture(x, y, wallHeight, texturePositionX, texture) {
    const yIncrementer = (wallHeight * 2) / texture.height;

    let color = null;
    for(let i = 0; i < texture.height; i++) {
      if(texture.data) {
        color = texture.data[texturePositionX + i * texture.width];
      } else {
        color = texture.colors[texture.bitmap[i][texturePositionX]];
      }
      this.drawLine(x, y, Math.floor(y + yIncrementer + 2), color);
      y += yIncrementer;
    }
  }
}

