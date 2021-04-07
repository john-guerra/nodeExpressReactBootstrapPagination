const express = require("express");
const router = express.Router();
const path = require("path");

const movies = Array.from({ length: 1000 }).map((m, i) => ({
  title: `Movie ${i}`,
}));
const nPerPage = 20;

/* GET home page. */
router.get("/movies", function (req, res, next) {
  const query = req.query.query || "";
  const page = +req.query.page || 0;
  console.log("Pagination", page * nPerPage, (page + 1) * nPerPage);

  // Here pagination is implemented in Javascript
  res.send({
    movies: movies
      .filter((d) => d.title.includes(query))
      .slice(page * nPerPage, (page + 1) * nPerPage),
    total: movies.length,
  });

  // You actually want to implement it in Mongo
  // something like
  //
  // movies
  //   .find({title: {$regex: query}})
  //   .sort({ _id: 1 })
  //   .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
  //   .limit(nPerPage);
});

router.get("*", (req, res) =>
  res.sendFile(path.resolve("front", "build", "index.html"))
);

module.exports = router;
