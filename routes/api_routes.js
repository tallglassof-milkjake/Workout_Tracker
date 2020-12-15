const router = require("express").Router();
const { response, json } = require("express");
const path = require("path");
const db = require("../models");

router.get("/api/workouts", async (req, res) => {
    db.Workout.find({}).sort({day: -1}).limit(1).then(result => {
        res.json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.post("/api/workouts", (req, res) => {
    let newWorkout = {
        type: req.body.type,
        name: req.body.name,
        distance: req.body.distance,
        duration: req.body.duration,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets,
    };

    db.Workout.create({exercises: newWorkout}).then((result) => {
        res.json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
  });

router.put("/api/workouts/:_id", (req, res) => {
    let newWorkout = {
        type: req.body.type,
        name: req.body.name,
        distance: req.body.distance,
        duration: req.body.duration,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets,
    };

    db.Workout.findByIdAndUpdate(req.params.id, {$push: {exercises: newWorkout}}, {new: true}, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.json(result)
        };
    }).catch(err => {
        res.status(400).json(err);
    });
  });

module.exports = router;