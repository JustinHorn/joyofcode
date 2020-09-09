export const getMaxId = (resources) => {
  let max = 0;
  // let max = [];
  for (let i = 0; i < resources.length; i++) {
    max = Math.max(max, resources[i].id);
  }
  return max;
};
