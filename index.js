const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(
    cors({
      origin: [
        "http://localhost:5173",
      ],
      credentials: true, // it is very important for send cookie to client
    })
);
app.use(express.json());

app.get("/", (req, res) => {  
  res.send("server is running ..... :) ");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});