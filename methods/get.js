module.exports = (req, res) => {
  let parts = req.url.split("/");
  let id = parts.pop();
  let baseURL = parts.join("/");

  const regex = new RegExp(/^cq-\d+-\d+-[a-z]{2}$/);

  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.movies));
  } else if (!regex.test(id)) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        title: "Validation failed",
        message: "id not found",
      })
    );
  } else if (baseURL == "/api/movies" && regex.test(id)) {
    let movie = req.movies.find((movie) => movie.id === id);
    if (movie) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(movie));
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          title: "Not found",
          message: "corresponding movie not found",
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
