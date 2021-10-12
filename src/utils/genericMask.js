const genericMask = (value, pattern) => {
  const v = value.toString();

  if (v.length !== (pattern.match(/#/g) || []).length) return value;
  let i = 0;

  // eslint-disable-next-line no-plusplus
  return pattern.replace(/#/g, () => v[i++] || '');
};

export default genericMask;
