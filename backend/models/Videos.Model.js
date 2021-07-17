const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoModel = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  videoId: {
    type: String,
  },
  thumbnailPublicId: {
    type: String,
  },
  categories: {
    type: Array,
  },
});

module.exports = mongoose.model("videos", VideoModel);
