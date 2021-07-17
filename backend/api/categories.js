const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const CategoryModel = require("../models/Category.Model");
const AuthModel = require("../models/Auth.Model");

const router = express.Router();

// add api
router.post("/add", (req, response) => {
  jwt.verify(req.headers["auth-token"], JWT_SECRET, (err, data) => {
    if (data !== undefined) {
      AuthModel.findOne({ _id: data.id })
        .then((resA) => {
          if (resA !== undefined && resA.role === "admin") {
            const newModel = new CategoryModel({ name: req.body.name });
            CategoryModel.findOne({ name: { $eq: req.body.name } }).then(
              (res) => {
                if (res === null) {
                  newModel
                    .save()
                    .then((res) => {
                      console.log("/add - res = ", res);
                      response.json({ success: true, data: res });
                    })
                    .catch((err) => {
                      console.log("/add - err - ", err);
                    });
                } else {
                  response.json({
                    success: false,
                    message: "category_present",
                  });
                }
              }
            );
          } else {
            response.json({ success: false, message: "token_expired" });
          }
        })
        .catch((err) => {
          console.log("/user_details - catch - err - ", err);
        });
    } else {
      response.json({ success: false, message: "invalid_token" });
    }
  });
});

// get api
router.get("/", (req, response) => {
  CategoryModel.find()
    .then((res) => {
      console.log("all - ", res);
      response.json({ success: true, data: res });
    })
    .catch((err) => {
      console.log("categories/ - err - ", err);
    });
});

// edit api
router.post("/edit", (req, response) => {
  jwt.verify(req.headers["auth-token"], JWT_SECRET, (err, data) => {
    console.log("token = ", data);
    if (data !== undefined) {
      console.log("/edit - req - ", req.body);
      CategoryModel.findOneAndUpdate({ _id: req.body._id }, req.body, {
        new: true,
      })
        .then((res) => {
          console.log("/edit - ", res);
          if (res !== undefined && res !== null) {
            response.json({ success: true, data: res });
          } else {
            response.json({ success: false, message: "invalid_input" });
          }
        })
        .catch((err) => {
          console.log("/edit - catch - err - ", err);
        });
    } else {
      response.json({ success: false, message: "invalid_token" });
    }
  });
});

// delete api
router.post("/delete", (req, response) => {
  jwt.verify(req.headers["auth-token"], JWT_SECRET, (err, data) => {
    console.log("token = ", data);
    if (data !== undefined) {
      console.log("/delete - req - ", req.body);
      CategoryModel.findOneAndDelete({ _id: req.body._id })
        .then((res) => {
          console.log("/delete - ", res);
          response.json({ success: true });
        })
        .catch((err) => {
          console.log("/delete - catch - err - ", err);
        });
    } else {
      response.json({ success: false, message: "invalid_token" });
    }
  });
});

module.exports = router;
