const data = require("./TestData.json");

const scoresList = data.scoresList;

function numberOfBelowScore(score) {
  let num = 0;
  scoresList.forEach((scr) => {
    if (scr < score) {
      num++;
    }
  });
  return num;
}

function hasDecimal(number) {
  return Boolean(number % 1);
}

function getRank(score) {
  let res = (numberOfBelowScore(score) / scoresList.length) * 100;
  if (hasDecimal(res)) {
    return res.toFixed(2);
  } else {
    return res + "";
  }
}

module.exports = {
  getRank,
};
