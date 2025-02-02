const requestBodyParser = require("../util/bodyparser");
const writeFile = require("../util/writeFile");
const crypto = require("crypto");

module.exports = async (req, res) => {
  if (req.url == "/api/movies") {
    try {
      let body = await requestBodyParser(req);

      const generateRandomId = () => {
        const randomNum1 = Math.floor(Math.random() * 1000);
        const part1 = `cq-${randomNum1}`;
        const randomNum2 = Math.floor(Math.random() * 1000);
        const part2 = randomNum2.toString();
        const randomLetters = crypto.randomBytes(1).toString("hex").slice(0, 2);
        return `${part1}-${part2}-${randomLetters}`;
      };

      body.id = generateRandomId();
      req.movies.push(body);
      writeFile(req.movies);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end();
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation failed",
          message: "body not valid",
        })
      );
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        title: "Not Found",
        message: "Route not found",
      })
    );
  }
};
