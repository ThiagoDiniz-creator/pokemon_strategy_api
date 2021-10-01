const express = require("express");

const app = express();

app.get("/pokemon", (req, res) => {

    console.log(req.query);

  if (req.query.id === undefined || req.query.id === "" || isNaN(req.query.id)) {
    res.send({
      error: "Please provide a valid id",
    });
  } else {
    const { id } = req.query;
    res.send({
      id,
    });
  }
});

app.listen(3002, () => console.log("Server is working!"));
