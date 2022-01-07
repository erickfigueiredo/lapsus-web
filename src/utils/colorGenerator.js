// eslint-disable-next-line radix
const genRGBColor = () => `#${parseInt((Math.random() * 0xFFFFFF)).toString(16).padStart(6, '0')}`;

const genColor = (brightLimit = -1) => {
  if (brightLimit > 0 && brightLimit < 255) {
    let color;
    let r;
    let g;
    let b;

    do {
      color = genRGBColor();

      r = color.slice(1, 3);
      g = color.slice(3, 5);
      b = color.slice(5, 7);
    } while (brightLimit > ((r * 299 + g * 587 + b * 114) / 1000));

    return color;
  }

  return genRGBColor();
};

export default genColor;
