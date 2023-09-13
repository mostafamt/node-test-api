const fs = require("fs");

const replaceMcqQuestionTitle = (content, questionTitle) => {
  return content.replace(
    /<p>What is your name\?<\/p>/g,
    `<p>${questionTitle}</p>`
  );
};

const getOption = (text, ans) => {
  const option = {
    correct: ans,
    tipsAndFeedback: {
      chosenFeedback: "<div>FB-Selected1</div>\\n",
      notChosenFeedback: "<div>FB-notSelected1</div>\\n",
      tip: "",
    },
    text: `<div>${text}</div>\\n`,
  };
  return option;
};

const replaceMcqQuestionOptions = (content, options, answer) => {
  const array = options.map((option, idx) => {
    return getOption(option, answer[idx]);
  });
  return content.replace(
    /\"answers\"[\s\S]*\\n"}]/g,
    `"answers":${JSON.stringify(array)}`
  );
};

module.exports = {
  replaceMcqQuestionTitle,
  replaceMcqQuestionOptions,
};
