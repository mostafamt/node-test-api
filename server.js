const http = require("http");
const Test = require("./TestQuestions");
const rank = require("./Rank");

const result = Test.getRandomDifferentTenQuestionsOfAllTypes();

// console.log(rank.getRank(50));

const server = http.createServer((req, res) => {
  const { method, url } = req;

  res.writeHead(200, {
    "Content-Type": "application/json",
    "X-Powered-By": "Node.js",
    "Access-Control-Allow-Origin": "*",
  });

  if (method === "GET" && url === "/questions") {
    res.end(
      JSON.stringify({
        data: result,
      })
    );
  } else if (method === "POST" && url == "/rank") {
    const { score } = req.headers;
    const resultRank = rank.getRank(score);
    res.end(
      JSON.stringify({
        data: resultRank,
      })
    );
  } else {
    res.end(
      JSON.stringify({
        error: "Please Provide a correct API",
      })
    );
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
