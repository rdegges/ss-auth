let path = require("path");

let express = require("express");


let app = express();

// settings
app.set("view engine", "pug");
app.set("staticDir", path.join(__dirname, "static"));

// middleware
app.use("/static", express.static(app.get("staticDir")));

// home page
app.get("/", (req, res) => {
  res.render("index");
});

// registration page
app.get("/register", (req, res) => {
  res.render("register");
});

// login page
app.get("/login", (req, res) => {
  res.render("login");
});

// dashboard page
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});


app.listen(3000);
