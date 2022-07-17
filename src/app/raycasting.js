import config from '../config';
import { drawLine, drawTexture } from '../utils/canvas';
import { degreeToRadians } from '../utils/common';

export const raycasting = (context, player, textures) => {
  let rayAngle = player.angle - player.halfFov;

  for (let rayCount = 0; rayCount < config.projection.width; rayCount++) {
    const ray = {
      x: player.x,
      y: player.y
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
    let distance = Math.sqrt(Math.pow(player.x - ray.x, 2) + Math.pow(player.y - ray.y, 2));

    // Fish eye fix
    distance = distance * Math.cos(degreeToRadians(rayAngle - player.angle));

    // Wall height
    const wallHeight = Math.floor(config.projection.halfHeight / distance);

    // Get texture
    const texture = textures.get(wall);

    // Calcule texture position
    const texturePositionX = Math.floor((texture.width * (ray.x + ray.y)) % texture.width);

    // Draw
    drawLine(context, rayCount, 0, rayCount, config.projection.halfHeight - wallHeight, "black");
    drawTexture(context, rayCount, config.projection.halfHeight - wallHeight, wallHeight, texturePositionX, texture);

    drawLine(context, rayCount, config.projection.halfHeight + wallHeight, rayCount, config.projection.height, "rgb(95, 87, 79)");

    // Increment
    rayAngle += config.rayCasting.incrementAngle;
  }
}
