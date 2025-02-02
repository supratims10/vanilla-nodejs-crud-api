const writeFile = require("../util/writeFile");

module.exports = (req, res) => {
  let parts = req.url.split("/");
  let id = parts.pop();
  let baseURL = parts.join("/");

  const regex = new RegExp(/^cq-\d+-\d+-[a-z]{2}$/);
  if (!regex.test(id)) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        title: "Validation failed",
        message: "id not found",
      })
    );
  } else if (baseURL == "/api/movies" && regex.test(id)) {
    const index = req.movies.findIndex((movie) => {
      return movie.id === id;
    });
    if (index == -1) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          title: "Not found",
          message: "corresponding movie not found",
        })
      );
    } else {
      req.movies.splice(index, 1);
      writeFile(req.movies);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify(req.movies));
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
