const express = require("express");
const {
  getArticle,
  getFrontPageArticlePreviews,
  refreshFrontPage,
} = require("./articles");
const { getAds, loadAds } = require("./ads");

const app = express();
const port = 3000;

const refreshOnStart = true;

app.use(express.static("public_html"));

app.get("/api/previews", (req, res) => {
  res.status(200).json(getFrontPageArticlePreviews());
});

app.get("/api/article/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.status(200).json(getArticle(id));
});

app.get("/api/ads", (req, res) => {
  const count = req.query.count;
  res.status(200).json(getAds(count));
});

async function main() {
  await loadAds();
  if (refreshOnStart) {
    await refreshFrontPage();
  }

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

main();
