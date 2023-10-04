require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRouters = require("./routes/workouts");
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log((req.path, req.method));
  next();
});
app.use("/api/workouts", workoutRouters);

mongoose.connect(process.env.MONG_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("haii server");
    });
    
  })
  .catch((error) => {
    console.log(error);
  });
