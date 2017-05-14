let path = require("path");

let express = require("express");


let app = express();

// settings
app.set("view engine", "pug");

// middleware
app.use("/static", express.static(path.join(__dirname, "static")));

// home page
app.get("/", (req, res) => {
  res.render("index");
});

// registration page
app.get("/register", (req, res) => {
  res.render("register");
});


app.listen(3000);
