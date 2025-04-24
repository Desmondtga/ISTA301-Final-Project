const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public_html"));

app.get("/api/breaking", (req, res) => {
  res.send("BREAKING NEWS!!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
