const express = require("express");
const app = express();

app.get("/products/:n", (req, res) => {
  res.json({ num: req.params.n });
  // res.send(20000);
});

app.listen(3000);
