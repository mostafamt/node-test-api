const express = require("express");
import { uuid } from "uuid";
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");
const {
  getStorage,
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
} = require("firebase/storage");
const cors = require("cors");
var bodyParser = require("body-parser");
const fs = require("fs");
const {
  replaceQuestionHeader,
  replaceQuestions,
} = require("./Questions/FillBlank");
const { firebaseConfig } = require("./confg");
const { replaceQuestion } = require("./Questions/TrueFalse");

const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "1mb" }));

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const storage = getStorage(firebase);

const uploadFile = async (file, fileName) => {
  const metadata = {
    contentType: "text/html",
  };
  const storageRef = ref(storage, `/templates/${fileName}`);
  const snapshot = await uploadString(storageRef, file, "raw", metadata);
  return snapshot;
};

const getFileUrl = async (snapshot) => {
  return await getDownloadURL(snapshot.ref);
};

app.post("/fill-space", async (req, res) => {
  const fileName = "Fill_in_the_Space.html";
  const inputDir = "./templates";
  const outputDir = "./dist";
  const endcoding = "utf-8";

  const { question_header, questions, answers } = req.body;

  console.log("question_header: ", question_header);

  const file = fs.readFileSync(`${inputDir}/${fileName}`, endcoding);
  let newFile = replaceQuestionHeader(file, question_header);
  newFile = replaceQuestions(newFile, questions, answers);
  fs.writeFileSync(`${outputDir}/${fileName}`, newFile, endcoding);

  const outputFile = fs.readFileSync(`${outputDir}/${fileName}`, endcoding);
  const snapshot = await uploadFile(outputFile, fileName);
  const url = await getFileUrl(snapshot);

  res.status(200).send({ url: url });
});

app.post("/true-false", async (req, res) => {
  const fileName = "F_Template.html";
  const inputDir = "./templates";
  const outputDir = "./dist";
  const endcoding = "utf-8";

  const { question, answer } = req.body;

  const file = fs.readFileSync(`${inputDir}/${fileName}`, endcoding);

  let newFile = replaceQuestion(file, question, answer);
  fs.writeFileSync(`${outputDir}/${fileName}`, newFile, endcoding);

  const outputFile = fs.readFileSync(`${outputDir}/${fileName}`, endcoding);
  const snapshot = await uploadFile(outputFile, fileName);
  const url = await getFileUrl(snapshot);

  res.status(200).send({ url: url });
});

app.get("/", async (req, res) => {
  res.status(200).send({ message: "hello world" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
