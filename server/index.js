import express from "express";
import path from "path";

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.sendFile(path.resolve('../public/index.html'));
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});