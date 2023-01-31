if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  console.log(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`);
  console.log(`process.env.NAME: ${process.env.NAME}`);
  console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const indexRouter = require("./routes/index.js");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", __dirname + "/views/" + "layouts/layout.ejs");
app.use(expressLayouts);
app.use(express.static(__dirname + "/public"));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
