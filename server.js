const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");

const {
  postMCQController,
  getQuestionsController,
  postTrueFalseQuestionController,
  postFillSpaceQuestionController,
  getQuestionController,
  deleteQuestionController,
  uploadFileController,
  IndexController,
} = require("./controllers");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const app = express();

let upload = multer({ dest: "uploads/" });

// Fix to test with Postman
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "1mb" }));

app.post("/fill-space", postFillSpaceQuestionController);
app.post("/mcq", postMCQController);
app.post("/true-false", postTrueFalseQuestionController);
app.get("/list", getQuestionsController, postTrueFalseQuestionController);
app.get("/question", getQuestionController);
app.delete("/question", deleteQuestionController);
app.post("/upload", upload.single("file"), uploadFileController);
app.get("/", IndexController);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
