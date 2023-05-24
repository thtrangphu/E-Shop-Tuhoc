// "use strict"; sử dụng strict mode -> môi trường an toàn hơn.
"use strict";

//Import thư viện Express,  framework phổ biến trong Node.js
const express = require("express");
const path = require("path"); // Thêm dòng này để định nghĩa biến path
const app = express();
const expressHandlebars = require("express-handlebars");

// cau hinh public static folder
app.use(express.static(path.join(__dirname + "/public")));

// cau hinh su dung express handlebars
app.engine(
  "hbs",
  expressHandlebars.engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname: "hbs",
    defaultLayout: "layouts",
  })
);
app.set("view engine", "hbs");

// xây dựng port number
const port = process.env.port || 5000;

// routes
app.get("/createTables", (req, res) => {
  let models = require("./models");
  models.sequelize.sync().then(() => {
    res.send("tables created successfully");
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

//
app.get("/:page", (req, res) => {
  res.render(req.params.page);
});

// khoi dong server
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
