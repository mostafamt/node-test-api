const fs = require("fs");
const { replaceQuestionHeader, replaceQuestions } = require("./FillBlank");
const { replaceQuestion } = require("./TrueFalse");
const { replaceMcqQuestionTitle, replaceMcqQuestionOptions } = require("./Mcq");

// replaceMcqQuestionHeader
const {
  FILL_IN_THE_SPACE_FILE_NAME,
  TRUE_FALSE_FILE_NAME,
  MCQ_FILE_NAME,
  INPUT_DIR,
  OUTPUT_DIR,
  ENCODING,
} = require("../config");

const generateTrueFalseQuestion = (question, answer) => {
  const file = fs.readFileSync(
    `${INPUT_DIR}/${TRUE_FALSE_FILE_NAME}`,
    ENCODING
  );
  let newFile = replaceQuestion(file, question, answer);
  fs.writeFileSync(`${OUTPUT_DIR}/${TRUE_FALSE_FILE_NAME}`, newFile, ENCODING);
  const outputFile = fs.readFileSync(
    `${OUTPUT_DIR}/${TRUE_FALSE_FILE_NAME}`,
    ENCODING
  );
  return outputFile;
};

const generateFillSpaceQuestion = (question_header, questions, answers) => {
  const file = fs.readFileSync(
    `${INPUT_DIR}/${FILL_IN_THE_SPACE_FILE_NAME}`,
    ENCODING
  );
  let newFile = replaceQuestionHeader(file, question_header);
  newFile = replaceQuestions(newFile, questions, answers);
  fs.writeFileSync(
    `${OUTPUT_DIR}/${FILL_IN_THE_SPACE_FILE_NAME}`,
    newFile,
    ENCODING
  );

  const outputFile = fs.readFileSync(
    `${OUTPUT_DIR}/${FILL_IN_THE_SPACE_FILE_NAME}`,
    ENCODING
  );
  return outputFile;
};

const generateMcqQuestion = (question, answer) => {
  const { title, options } = question;
  const file = fs.readFileSync(`${INPUT_DIR}/${MCQ_FILE_NAME}`, ENCODING);
  let newFile = replaceMcqQuestionTitle(file, title);
  newFile = replaceMcqQuestionOptions(newFile, options, answer);
  // newFile = replaceQuestions(newFile, questions, answers);
  fs.writeFileSync(`${OUTPUT_DIR}/${MCQ_FILE_NAME}`, newFile, ENCODING);

  const outputFile = fs.readFileSync(
    `${OUTPUT_DIR}/${MCQ_FILE_NAME}`,
    ENCODING
  );
  return outputFile;
};

module.exports = {
  generateTrueFalseQuestion,
  generateFillSpaceQuestion,
  generateMcqQuestion,
};
