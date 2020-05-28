const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const route = require("./routes/api");
const members = require("./Members");

const app = express();

//const logger = require("./Middleware");
//Init Middleware
// app.use(logger);

//Express-handlebars Middleware
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//Home page Route
app.get("/", (req, res) => res.render("index", {
  title:"Members App",
  members
})
);

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set Static folder
app.use(express.static(path.join(__dirname, "public")));
const port = process.env.port || 5000;

//Members api Routes
app.use("/api/members/", route);

app.listen(port, () => console.log(`Server Started at ${port}`));
