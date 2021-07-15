const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const CategoryModel = require("../models/Category.Model");
const AuthModel = require("../models/Auth.Model");

const router = express.Router();

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

module.exports = router;
