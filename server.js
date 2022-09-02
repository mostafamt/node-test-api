const http = require("http");
const Test = require("./TestQuestions");
const rank = require("./Rank");

const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/questions", (req, res) => {
  let result = Test.getRandomDifferentTenQuestionsOfAllTypes();
  res.json({
    data: result,
  });
});

app.post("/rank", (req, res) => {
  const ans = rank.getRank(req.headers.score);
  res.json({
    data: ans,
  });
});

app.get("/", (req, res) => {
  res.json({
    message: `Hello World`,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
