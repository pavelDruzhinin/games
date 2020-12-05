function randomNumber(min, max) {
  if (typeof min !== "number")
    throw new Error("[randomNumber]: min is not number");

  if (typeof max !== "number")
    throw new Error("[randomNumber]: max is not number");

  const result = ~~(Math.random() * (max - min + 1)) + min;

  return Math.round(result);
}

module.exports = {
  randomNumber,
};
