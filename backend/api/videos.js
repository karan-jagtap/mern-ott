const route = require("express").Router();
const { cloudinary } = require("../config/cloudinary_setup");
const VideosModel = require("../models/Videos.Model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

// add video
route.post("/add", (req, response) => {
  jwt.verify(req.headers["auth-token"], JWT_SECRET, (err, data) => {
    console.log("token = ", data);
    if (data !== undefined) {
      console.log("/add - req - ", req.body);
      cloudinary.v2.uploader.upload(
        req.body.thumbnailFile,
        {
          upload_preset: "ml_default",
          folder: "thumbnails",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            response.json({ success: false, message: error });
          }
          console.log("/add - cloudinary - ", result, error);
          const publicId = result.public_id;
          VideosModel.findOne({ videoId: { $eq: req.body.videoId } })
            .then((res) => {
              if (res === null) {
                const newModel = new VideosModel({
                  title: req.body.title,
                  description: req.body.description,
                  categories: req.body.categories,
                  videoId: req.body.videoId,
                  thumbnailPublicId: publicId,
                });
                newModel
                  .save()
                  .then((newRes) => {
                    response.json({ success: true, video: newRes });
                  })
                  .catch((err) => {
                    console.log("api/videos/ - catch - ", err);
                  });
              } else {
                response.json({ success: false, message: "duplicate_videoId" });
              }
            })
            .catch((err) => {
              console.log("api/videos/ - catch - ", err);
            });
        }
      );
    } else {
      response.json({ success: false, message: "invalid_token" });
    }
  });
});

// get videos
route.get("/", (req, response) => {
  cloudinary.v2.search
    .expression("folder:thumbnails")
    .execute()
    .then((res) => {
      console.log("api/thumbnail/ - res - ", res);
      res.resources;
    })
    .catch((err) => {
      console.log("api/thumbnail/ - catch - ", err);
    });
});

// get single video

module.exports = route;
