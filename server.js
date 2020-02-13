const projectData = {};

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//Configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
const cors=require('cors');
app.use(cors());

app.use(express.static("website"));
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.post("/api", (req, res) => {
  console.log(req.body);
  projectData["temp"] = req.body.temperature;
  projectData["name"] = req.body.city;
  projectData["comment"] = "good";
  res.send({
    msg: ""
  });
});

app.get("/addData", (req, res) => {
  res.send(projectData);
});
