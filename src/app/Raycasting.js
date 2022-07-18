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

      // Calcule texture position
      const texturePositionX = Math.floor((texture.width * (ray.x + ray.y)) % texture.width);

      // Draw
      this.drawLine(rayCount, 0, config.projection.halfHeight - wallHeight, new Color(0, 0, 0, 255));
      this.drawTexture(rayCount, config.projection.halfHeight - wallHeight, wallHeight, texturePositionX, texture);
      this.drawLine(rayCount, config.projection.halfHeight + wallHeight, config.projection.height, new Color(95, 87, 79, 255));
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

