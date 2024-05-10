export const getMultiplierIndex = (size: number, path: number[]): number => {
  let movement = 0;
  const bucketSize = size + 1;
  const center = bucketSize / 2;

  path.forEach((v) => {
    if (v === 0) {
      movement -= 1;
    } else {
      movement += 1;
    }
  });

  const index = center + movement / 2;
  let roundedIndex = Math.round(index);

  if (roundedIndex > index) {
    roundedIndex--;
  }

  return roundedIndex;
};
