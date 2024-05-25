const mongoose = require("mongoose");


const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    company: String,
    location: String,
    salary: Number,
    createAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.model("Job", jobSchema);