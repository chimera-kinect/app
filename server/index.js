import express from "express";
import path from "path";

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.resolve('../public/index.html'));
});

app.get('/sketch.js', (req, res) => {
  res.setHeader("Content-Type", "text/javascript");
  res.sendFile(path.resolve('../public/sketch.js'));
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});