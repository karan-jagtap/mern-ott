const express = require("express");
const AuthModel = require("../models/Auth.Model");

const router = express.Router();

// login request
router.post("/login", (req, response) => {
  const { email, password } = req.body;
  if (email !== "" && password !== "") {
    AuthModel.find({ email, password })
      .then((res) => {
        console.log("/login - res - ", res[0]);
        response.json({
          success: true,
          data: { id: res[0]._id, name: res[0].name, email: res[0].email },
        });
      })
      .catch((err) => {
        console.log("/login - err - ", err);
        response.json({ success: false, message: err });
      });
  }
});

// register request
router.post("/register", (req, response) => {
  const { name, email, password } = req.body;
  if (email !== "" && password !== "" && name !== "") {
    AuthModel.find({ email, password })
      .then((res) => {
        if (res.length === 0) {
          const newAuthModel = new AuthModel({ name, email, password });
          newAuthModel
            .save()
            .then((res) => {
              console.log("/register - registered - res - ", res[0]);
              response.json({ success: true, message: "user_registered" });
            })
            .catch((err) => {
              console.log("/register - err - ", err);
              response.json({ success: false, message: err });
            });
        } else {
          response.json({ success: false, message: "user_present" });
        }
      })
      .catch((err) => {
        console.log("/login - err - ", err);
        response.json({ success: false, message: err });
      });
  }
});

module.exports = router;
