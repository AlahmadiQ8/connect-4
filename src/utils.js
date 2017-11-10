export const domRectToObject = domRect => {
  const { top, right, bottom, left, width, height, x, y } = domRect;
  return { top, right, bottom, left, width, height, x, y };
};

export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
