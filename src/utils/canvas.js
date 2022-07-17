export const clearscreen = (context, { width, height }) => {
  context.clearRect(0, 0, width, height);
}

export const drawLine = (context, x1, y1, x2, y2, cssColor) => {
  context.strokeStyle = cssColor;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

export const drawTexture = (context, x, y, wallHeight, texturePositionX, texture) => {
  const yIncrementer = (wallHeight * 2) / texture.height;

  for(let i = 0; i < texture.height; i++) {
    if(texture.id) {
      context.strokeStyle = texture.data[texturePositionX + i * texture.width];
    } else {
      context.strokeStyle = texture.colors[texture.bitmap[i][texturePositionX]];
    }
    // context.strokeStyle = texture.colors[texture.bitmap[i][texturePositionX]];
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + (yIncrementer + 0.5));
    context.stroke();
    y += yIncrementer;
  }
}

export const getTextureData = (texture) => {
  const image = document.getElementById(texture.id);
  const canvas = document.createElement('canvas');
  canvas.width = texture.width;
  canvas.height = texture.height;
  const canvasContext = canvas.getContext('2d');
  canvasContext.drawImage(image, 0, 0, texture.width, texture.height);
  const imageData = canvasContext.getImageData(0, 0, texture.width, texture.height).data;
  return parseImageData(imageData);
}

const parseImageData = (imageData) => {
  const colorArray = [];
  for (let i = 0; i < imageData.length; i += 4) {
    colorArray.push(`rgb(${imageData[i]},${imageData[i + 1]},${imageData[i + 2]})`);
  }
  return colorArray;
}
