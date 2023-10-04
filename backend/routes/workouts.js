const express = require("express");
const Workout = require("../models/workoutModels");
const router = express.Router();
const {
  createWorkout,
  singleWorkouts,
  getWorkouts,
  deleteWorkout,
  updateWorkout
} = require("../controllers/workoutControllers");
router.get("/", getWorkouts);
router.get("/:id", singleWorkouts);
router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);
module.exports = router;
