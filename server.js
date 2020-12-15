const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("./routes/api_routes"));
app.use(require("./routes/html_routes"));
app.use(express.static("public"));

app.use(logger("dev"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/Workout_db',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

const mongooseConnection = mongoose.connection;
mongooseConnection.on('error', console.error.bind(console, 'connection error:'));
mongooseConnection.once('open', function() {
  console.log("connected to mongoosedb!");
});

app.listen(PORT, () => {
    console.log(`Application now running on ${PORT}`);
});