const { default: mongoose } = require("mongoose");
const Workout = require("../models/workoutModels");

const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  return res.status(200).json(workouts);
};
const singleWorkouts = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such directory" });
  }
  const workouts = await Workout.findById(id);
  if (!workouts) {
    return res.status(404).json({ error: "no such workout" });
  }
  return res.status(200).json(workouts);
};
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({ title, load, reps });
    return res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such directory" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(400).json({ error: "no such workout" });
  }
  return res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, reps, load } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such directory" });
  }
  const workout = await Workout.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(400).json({ error: "no such workout" });
  }
  return res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  deleteWorkout,
  singleWorkouts,
  updateWorkout
};
