const http = require("http");
const Test = require("./TestQuestions");

const result = Test.getRandomDifferentTenQuestionsOfAllTypes();

console.log(result);

const server = http.createServer((req, res) => {
  const { method, url } = req;

  res.writeHead(200, {
    "Content-Type": "application/json",
    "X-Powered-By": "Node.js",
  });

  if (method === "GET" && url === "/questions") {
    res.end(
      JSON.stringify({
        data: result,
      })
    );
  } else {
    res.end(
      JSON.stringify({
        success: false,
        data: "hi",
        error: "Please add email",
      })
    );
  }
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
