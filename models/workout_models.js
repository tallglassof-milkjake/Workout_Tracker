import mongoose from "mongoose";
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: {
        type: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true,
            min: 0
        },
        weight: {
            type: Number,
            min: 0
        },
        reps: {
            type: Number,
            min: 0
        },
        sets: {
            type: Number,
            min: 0
        },
        distance: {
            type: Number,
            min: 0
        }
    }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;