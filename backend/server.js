const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use((req, res, next) => {
  res.header("Access-control-Allow-origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const mongoose = require("mongoose");

const dbName = "workout";

mongoose.connect("mongodb://localhost:27017/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Workout Schema
const workoutSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  sets: Number,
  repetitions: Number
});

// ChatRoom Schema

var roomSchema = new mongoose.Schema({
  room_name: String
});

// Chat Schema
var chatSchema = new mongoose.Schema({
  nickname: String,
  message: String,
  created_date: { type: Date, default: Date.now }
});

// Workout Model

const Workout = mongoose.model("Workout", workoutSchema);
const Chat = mongoose.model("Chat", chatSchema);
const Room = mongoose.model("Room", roomSchema);

/* Workout Routes */

// Add new workout

app.post("/api/workout", async (req, res) => {
  const workout = new Workout({
    title: req.body.title,
    description: req.body.description,
    sets: req.body.sets,
    repetitions: req.body.repetitions
  });
  try {
    await workout.save();
    res.send(workout);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Get all workout

app.get("/api/workout", async (req, res) => {
  try {
    let workouts = await Workout.find();
    res.send(workouts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// delete workout
app.delete("/api/workout/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Workout.deleteOne({ _id: id });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

// edit workout

app.put("/api/workout/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, sets, repetitions } = req.body;
  try {
    const workout = await Workout.findById(id);
    workout.title = title || workout.title;
    workout.description = description || workout.description;
    workout.sets = sets || workout.sets;
    workout.repetitions = repetitions || workout.repetitions;
    await workout.save();
    res.send(workout);
  } catch (error) {
    res.sendStatus(500);
  }
});

/* Socket IO Connection */

io.on("connection", socket => {
  socket.username = "anonymous";
  socket.on("change username", name => (socket.username = name));
  socket.on("message", msg => console.log(msg));
  socket.on("join", username => {
    if (username != null) {
      socket.username = username;
    }
    socket.broadcast.emit("message", {
      user: "Server",
      message: socket.username + " has joined!"
    });
  });
});

http.listen(3000, () => console.log("Server listening on port 3000!"));
