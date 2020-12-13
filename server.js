import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Application now running on ${PORT}`);
});