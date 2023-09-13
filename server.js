const express = require("express");

const cors = require("cors");
var bodyParser = require("body-parser");
const fs = require("fs");
const {
  FILL_IN_THE_SPACE_TYPE,
  TRUE_FALSE_TYPE,
  MCQ_TYPE,
} = require("./config");
const {
  uploadFile,
  saveFileUrlToDatabase,
  listFiles,
  getQuestionById,
  deleteQuestionById,
} = require("./firebase");
const {
  generateTrueFalseQuestion,
  generateFillSpaceQuestion,
  generateMcqQuestion,
} = require("./Question/Generators");

const app = express();

// Fix to test with Postman
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "1mb" }));

// generate Fill Space Question
app.post("/fill-space", async (req, res) => {
  const { name: objectName, question_header, questions, answers } = req.body;

  const file = generateFillSpaceQuestion(question_header, questions, answers);
  const { url, id } = await uploadFile(file);
  saveFileUrlToDatabase(id, objectName, url, FILL_IN_THE_SPACE_TYPE);
  res.status(200).send({ url: url });
});

app.post("/mcq", async (req, res) => {
  const { name: objectName, question, answer } = req.body;

  const file = generateMcqQuestion(question, answer);
  const { url, id } = await uploadFile(file);

  saveFileUrlToDatabase(id, objectName, url, MCQ_TYPE);
  res.status(200).send({ url: url });
});

// generate True False Question
app.post("/true-false", async (req, res) => {
  const { name: objectName, question, answer } = req.body;
  const file = generateTrueFalseQuestion(question, answer);
  const { url, id } = await uploadFile(file);
  saveFileUrlToDatabase(id, objectName, url, TRUE_FALSE_TYPE);
  res.status(200).send({ url: url });
});

// list all questions
app.get("/list", async (req, res) => {
  const data = await listFiles();
  res.status(200).send(data);
});

// get questions by its id
app.get("/question", async (req, res) => {
  const { id } = req.query;
  const { status, question } = await getQuestionById(id);
  res.status(status).send(question);
});

// delete question by its id
app.delete("/question", async (req, res) => {
  const { id } = req.query;
  const { status, question } = await deleteQuestionById(id);
  res.status(status).send(question);
});

app.get("/", async (req, res) => {
  res.status(200).send({ message: "hello world" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
