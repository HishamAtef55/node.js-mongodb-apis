const mongoose = require("mongoose");
const personSchema = mongoose.Schema(
  {
    index: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
    registered: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    eyeColor: {
      type: String,
      required: false,
    },
    favoriteFruit: {
      type: String,
      required: false,
    },
    company: {
      type: Object,
      required: false,
    },
    tags: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const person = mongoose.model("persons", personSchema);
module.exports = person;
