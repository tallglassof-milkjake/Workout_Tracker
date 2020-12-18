const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: {
              $sum: '$exercises.duration',
            },
          },
        },
      ])
        .then((dbWorkouts) => {
          res.json(dbWorkouts);
        })
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(400)
    });
});

router.post("/api/workouts", (req, res) => {

    db.Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
  });

router.put("/api/workouts/:id", ({ body,params }, res) => {
    console.log(params);
    db.Workout.findByIdAndUpdate(params.id, {$push: {exercises: body}}, 
        {new: true, runValidators: true })
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })

})

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration',
          },
        },
      },
    ])
      .sort({ _id: -1 })
      .limit(7)
      .then((dbWorkouts) => {
        console.log(dbWorkouts);
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  router.delete('/api/workouts', ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
      .then(() => {
        res.json(true);
      })
      .catch((err) => {
        res.json(err);
      });
  });

module.exports = router;