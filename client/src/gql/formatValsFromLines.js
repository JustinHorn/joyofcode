const formatValsFromLines = (x) => {
  const vals = getValsFromLines(x);
  return `${vals.map((x) => `${x}:$${x}`).join(`\n`)}`;
};

const getValsFromLines = (lines) => {
  return lines
    .split("\n")
    .filter((l) => !!l.trim())
    .map((line) => getValFromLine(line));
};

const getValFromLine = (line) => {
  const start = line.indexOf("$") + 1;
  const end = line.indexOf(":");
  const val = line.slice(start, end);
  return val;
};

export default formatValsFromLines;
