export const domRectToObject = domRect => {
  const { top, right, bottom, left, width, height, x, y } = domRect;
  return { top, right, bottom, left, width, height, x, y };
};
