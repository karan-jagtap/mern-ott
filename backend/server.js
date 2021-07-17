const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/keys");

const app = express();
// app.use(express.json());
app.use(express.json({ limit: "50mb" })); // this is because the thumbnail file size is in MBs
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

// connect to db
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to MongoDB successful.");
  })
  .catch((err) => {
    console.log("Error connecting database :: ", err);
  });

// this is for login and register
app.use("/api/auth/", require("./api/auth"));
app.use("/api/categories/", require("./api/categories"));
app.use("/api/videos/", require("./api/videos"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Connection established at PORT : ", PORT);
});
