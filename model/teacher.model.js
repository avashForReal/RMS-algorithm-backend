const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  workload: {
    required: true,
    type: Number,
  },
  // type: {
  //   required: true,
  //   type: String,
  // },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  initial: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
