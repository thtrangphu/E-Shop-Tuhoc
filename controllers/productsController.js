let controller = {};
const models = require("../models");
controller.show = async (req, res) => {
  // kiem tra ng dung co truyen tham so vao hay k
  let category = isNaN(req.query.category) ? 0 : parseInt(req.query.category);
  let brand = isNaN(req.query.brand) ? 0 : parseInt(req.query.brand);
  let tag = isNaN(req.query.tag) ? 0 : parseInt(req.query.tag);

  let categories = await models.Category.findAll({
    include: [
      {
        // vi co khoa ngoai den Product nen include co the lay dc Product
        model: models.Product,
      },
    ],
  });
  // dua ra view
  res.locals.categories = categories;

  let brands = await models.Brand.findAll({
    include: [
      {
        model: models.Product,
      },
    ],
  });
  res.locals.brands = brands;

  let tags = await models.Tag.findAll();
  res.locals.tags = tags;

  let options = {
    attributes: ["id", "name", "imagePath", "stars", "price", "oldPrice"],
    where: {},
  };
  // tạo tham số dể
  if (category > 0) {
    options.where.categoryId = category;
  }
  if (brand > 0) {
    options.where.brandId = brand;
  }
  if (tag > 0) {
    options.include = [
      {
        model: models.Tag,
        where: { id: tag },
      },
    ];
  }
  let products = await models.Product.findAll(options);

  res.locals.products = products;
  res.render("product-list");
};

module.exports = controller;
