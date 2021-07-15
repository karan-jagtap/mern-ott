const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryModel = new Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("categories", CategoryModel);
