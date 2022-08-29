const data = require("./TestData.json");

// CONSTANTS
const NUM_OF_QUESTIONS = 10;
const NUM_OF_TYPE_QUESTIONS = 4;

// variables
const questions = data.wordList;
const selected = Array(questions.length).fill(false);
const typeSelected = Array(NUM_OF_TYPE_QUESTIONS).fill(false);
const typeNames = ["verb", "noun", "adjective", "adverb"];
let result = [];

let getRandomNumber = (max) => {
  return Math.floor(Math.floor(Math.random() * max));
};

function checkTypeSelection(type) {
  typeNames.map((t, idx) => {
    if (t === type) {
      typeSelected[idx] = true;
    }
  });
}

function isAllTypesPresentedInQuestions() {
  let status = true;
  typeSelected.forEach((type) => {
    status = status && type;
  });
  return status;
}

function clean() {
  selected.fill(false);
  typeSelected.fill(false);
  result = [];
}

let chooseRandomQuestions = () => {
  clean();
  let nums = NUM_OF_QUESTIONS;
  while (nums > 0) {
    const idx = getRandomNumber(questions.length);
    if (selected[idx]) {
      continue;
    } else {
      nums--;
      result.push(questions[idx]);
      selected[idx] = true;
      let type = questions[idx].pos;
      checkTypeSelection(type);
    }
  }
  return result;
};

function getRandomDifferentTenQuestionsOfAllTypes() {
  let finalResult = [];
  do {
    finalResult = chooseRandomQuestions();
  } while (!isAllTypesPresentedInQuestions());
  {
    finalResult = chooseRandomQuestions();
  }
  return finalResult;
}

module.exports = {
  getRandomDifferentTenQuestionsOfAllTypes,
};
