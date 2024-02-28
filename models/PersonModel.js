const mongoose = require("mongoose");
const personSchema = mongoose.Schema(
  {
    index: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    registered: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    eyeColor: {
      type: String,
      required: true,
    },
    favoriteFruit: {
      type: String,
      required: true,
    },
    company: {
      type: Object,
      required: false,
    },
    tags: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const person = mongoose.model("persons", personSchema);
module.exports = person;
