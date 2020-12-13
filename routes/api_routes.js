const router = require("express").Router();
const { response } = require("express");
const path = require("path");
const Workout = require("../models/workout_models");

router.get("/api/workouts", function(req, res) {
    Workout.fin({}).sort({ createdAt: -1}).limit(1).then(function(result) {
        res.json(result);
    });
});

router.put("/api/workouts/:id", function(req, res) {
    let newWorkout = Workout.create({
        type: req.body.type,
        name: req.body.name,
        duration: req.body.duration,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets,
        distance: req.body.distance,
    }).then(function() {
        Workout.findOneAndUpdate({"id": req.params.id}, {$push: {exercises: newExercise}}, {new: true});

        res.json(newWorkout);
    });
})