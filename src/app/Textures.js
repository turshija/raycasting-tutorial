import config from '../config';
import { Color } from './Color';

export class Textures {
  loaded = {}

  get(id) {
    return this.loaded[id] ?? null;
  }

  async loadAll() {
    const ret = config.textures.filter(texture => texture.id).map(async (texture) => {
      this.loaded[texture.id] = texture;
      if (texture.file) {
        const image = await import(`../assets/${texture.file}`);
        this.loaded[texture.id].data = await this.loadTexture(image.default, texture.width, texture.height);
      }
    });
    await Promise.all(ret);
  }

  loadTexture(imageUrl, width, height) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const canvasContext = canvas.getContext('2d');
        canvasContext.drawImage(image, 0, 0, width, height);
        const imageData = canvasContext.getImageData(0, 0, width, height).data;
        resolve(this.parseImageData(imageData));
      };
      image.src = imageUrl;
    });
  }

  parseImageData(imageData) {
    const colorArray = [];
    for (let i = 0; i < imageData.length; i += 4) {
      colorArray.push(new Color(imageData[i], imageData[i + 1], imageData[i + 2], 255));
    }
    return colorArray;
  }
}
