// Returns an int within [start, end]
const randomInt = (start, end) => {
  const range = end - start + 1;
  return start + Math.floor(Math.random() * range);
};

// Returns a float within (start, end)
const randomFloat = (start, end) => {
  const range = end - start;
  return start + Math.random() * range;
};

// Returns the same number, with a 50% chance of having a different sign
const randomFlip = (num) => {
  if (Math.random() > 0.5) {
    num *= -1;
  }
  return num;
};

// Execute a function N times
const repeat = (N, func) => {
  for (let i = 0; i < N; i++) {
    func();
  }
};

// Calculate distance between two points
const getDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
