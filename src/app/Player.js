import { degreeToRadians } from '../utils/common';
import config from '../config';

export class Player {
  angle = null;

  fov = null;

  halfFov = null;

  x = null;

  y = null;

  radius = null;

  speed = {
    movement: 0.5,
    rotation: 5
  };

  constructor (config = {}) {
    Object.assign(this, config);
  }

  isColiding(newX, newY) {
    return config.map[newY][newX] === 0;
  }

  getSin() {
    return Math.sin(degreeToRadians(this.angle)) * this.speed.movement
  }

  getCos() {
    return Math.cos(degreeToRadians(this.angle)) * this.speed.movement
  }

  moveForward() {
    const playerCos = this.getCos();
    const playerSin = this.getSin();
    const newX = this.x + playerCos;
    const newY = this.y + playerSin;

    const checkX = Math.floor(newX + playerCos * this.radius);
    const checkY = Math.floor(newY + playerSin * this.radius);

    if (this.isColiding(Math.floor(this.x), checkY)) {
      this.y = newY;
    }
    if (this.isColiding(checkX, Math.floor(this.y))) {
      this.x = newX;
    }
  }

  moveBackward() {
    const playerCos = this.getCos();
    const playerSin = this.getSin();
    const newX = this.x - playerCos;
    const newY = this.y - playerSin;

    const checkX = Math.floor(newX - playerCos * this.radius);
    const checkY = Math.floor(newY - playerSin * this.radius);

    if (this.isColiding(Math.floor(this.x), checkY)) {
      this.y = newY;
    }
    if (this.isColiding(checkX, Math.floor(this.y))) {
      this.x = newX;
    }
    // if (this.isColiding(newX, newY)) {
    //   this.x = newX;
    //   this.y = newY;
    // }
  }

  turnLeft() {
    this.angle -= this.speed.rotation;
    this.angle %= 360;
  }

  turnRight() {
    this.angle += this.speed.rotation;
    this.angle %= 360;
  }

}
