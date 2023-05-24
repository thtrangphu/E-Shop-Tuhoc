// "use strict"; sử dụng strict mode -> môi trường an toàn hơn.
"use strict";

const controller = {};

controller.showHomePage = (req, res) => {
  res.render("index");
};
controller.showPage = (req, res) => {
  res.render(req.params.page);
};
module.exports = controller;
