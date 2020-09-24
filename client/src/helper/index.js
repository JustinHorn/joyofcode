export const getMaxId = (resources) => {
  let max = 0;
  // let max = [];
  for (let i = 0; i < resources.length; i++) {
    max = Math.max(max, resources[i].id);
  }
  return max;
};

export const formatTimeDiff = (at) => {
  const milliseconds = Date.now() - at;

  const seconds = milliseconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;
  const years = days / 356;

  const t = {
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    weeks,
    months,
    years,
  };

  Object.keys(t).forEach((k) => (t[k] = Math.floor(t[k])));

  const timeString = Object.keys(t)
    .reverse()
    .filter((key) => !!t[key])[0];

  if (t[timeString] === 1) {
    return t[timeString] + " " + timeString.slice(0, -1) + " ago";
  } else {
    return t[timeString] + " " + timeString + " ago";
  }
};
