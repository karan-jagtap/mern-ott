const express = require("express");
const AuthModel = require("../models/Auth.Model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

const router = express.Router();

// login request
router.post("/login", (req, response) => {
  const { email, password } = req.body;
  if (email !== "" && password !== "") {
    AuthModel.findOne({ email, password })
      .then((res) => {
        if (res !== undefined && res !== null) {
          console.log("/login - res - ", res);
          const token = jwt.sign({ id: res._id }, JWT_SECRET);
          response.json({
            success: true,
            token,
            user: {
              id: res._id,
              name: res.name,
              email: res.email,
              role: res.role,
            },
          });
        } else {
          response.json({
            success: false,
            message: "invalid_credentials",
          });
        }
      })
      .catch((err) => {
        console.log("/login - err - ", err);
        response.json({ success: false, message: err });
      });
  }
});

// login google request
router.post("/login_google", (req, response) => {
  const { email, name } = req.body;
  if (email !== "" && name !== "") {
    AuthModel.findOne({ email })
      .then((res) => {
        if (res !== undefined && res !== null) {
          console.log("/login_google - res - ", res);
          const token = jwt.sign({ id: res._id }, JWT_SECRET);
          response.json({
            success: true,
            token,
            user: {
              id: res._id,
              name: res.name,
              email: res.email,
              role: res.role,
            },
          });
        } else {
          const newAuthModel = new AuthModel({ name, email });
          newAuthModel
            .save()
            .then((res) => {
              console.log("/login_google - registered - res - ", res);
              const token = jwt.sign({ id: res._id }, JWT_SECRET);
              response.json({
                success: true,
                token,
                user: {
                  id: res._id,
                  name: res.name,
                  email: res.email,
                  role: res.role,
                },
              });
            })
            .catch((err) => {
              console.log("/login_google - err - ", err);
              response.json({ success: false, message: err });
            });
        }
      })
      .catch((err) => {
        console.log("/login_google - err - ", err);
        response.json({ success: false, message: err });
      });
  }
});

// register request
router.post("/register", (req, response) => {
  const { name, email, password } = req.body;
  if (email !== "" && password !== "" && name !== "") {
    AuthModel.find({ email })
      .then((res) => {
        if (res.length === 0) {
          const newAuthModel = new AuthModel({ name, email, password });
          newAuthModel
            .save()
            .then((res) => {
              console.log("/register - registered - res - ", res);
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

// user details request
router.get("/user_details", (req, response) => {
  jwt.verify(req.headers["auth-token"], JWT_SECRET, (err, data) => {
    if (data !== undefined) {
      AuthModel.findOne({ _id: data.id })
        .then((res) => {
          console.log("/user_details - res - ", res);
          if (res !== undefined) {
            response.json({ success: true, user: res });
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

module.exports = router;
