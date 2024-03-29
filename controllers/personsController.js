const Persons = require("../models/PersonModel");
let msg = "persons retrived successfully";
let createMsg = "persons created successfully";
let updatedMsg = "persons upadted successfully";

async function index(req, res) {
  try {
    const gender = req.body.gender;
    const age = req.body.age;
    const sort_value = req.body.sort_value;
    const eye_color = req.body.eyeColor;
    const is_active = req.body.is_Active;
    const location = req.body.location;
    const persons = await Persons.aggregate([
      // first task return only index - name - asActive with limit 5 of persons collection
      //   { $limit: 5 },
      //   {
      //     $project: {
      //       index: 1,
      //       name: 1,
      //       isActive: 1,
      //     },
      //   },
      //  group
      //   { $group: { _id: "$age" } },
      //   { $group: { _id: { age: "$age", gender: "$gender" } } },
      //   { $match: { $and: [{ gender: "male" }, { isActive: true }] } },
      //   { $group: { _id: "$company" } },
      //   {
      //     $group: {
      //       _id: { eyeColor: "$eyeColor", favoriteFruit: "$favoriteFruit" },
      //     },
      //   },
      //   {
      //     $count: "groupCount",
      //   },
      //   { $group: { _id: "$company.location.country" } },
      //   { $group: { _id: "$name", total: { $sum: "$price" } } },
      //   { $group: { _id: "$name", count: { $sum: 1 } } },
      // match
      //   { $match: { age: { $gt: 25 } } },
      //   { $project: { index: 1, name: 1, isActive: 1 } },
      //   { $match: { $and: [{ gender: "female" }, { age: { $lte: 45 } }] } },
      //   { $limit: 10 },
      //   { $sort: { _id: -1 } },
      //   { $project: { _id: 0, index: 1, name: 1, company: 1 } },
      //   { $match: { isActive: true } },
      // { $match: { favoriteFruit: "strawberry" } },
      // {
      //   $group: { _id: { age: "$age", eyeColor: "$eyeColor" } },
      // },
      //   { $sort: { _id: 1 } }, // the sorting is done on _id because the pervious stage end with _id carry the output document

      {
        $match: {
          $expr: {
            $and: [
              { $eq: ["$isActive", is_active] },
              { $eq: ["$gender", gender] },
              { $gt: ["$age", age] },
              { $eq: ["$eyeColor", eye_color] },
              { $eq: ["$company.location.country", location] },
            ],
          },
        },
      },
      {
        $project: {
          name: 1,
          index: 1,
          age: 1,
          favoriteFruit: 1,
          tags: 1,
        },
      },
      {
        $unwind: "$tags",
      },
      {
        $addFields: {
          count: { $multiply: ["$index", "$age"] },
        },
      },
      { $sort: { age: +sort_value } },
      {
        $project: {
          name: 1,
          count: 1,
          favoriteFruit: 1,
          tags: 1,
        },
      },
    ]);
    res.status(200).json({
      message: createMsg,
      data: persons,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function create(req, res) {
  const {
    index,
    name,
    isActive,
    registered,
    age,
    gender,
    eyeColor,
    favoriteFruit,
    company,
    tags,
  } = req.body;
  try {
    const personData = new Persons({
      index,
      name,
      isActive,
      registered,
      age,
      gender,
      eyeColor,
      favoriteFruit,
      company,
      tags,
    });
    const newPerson = await personData.save();
    res.status(200).json({
      message: createMsg,
      data: newPerson,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function update(req, res) {
  // const newCompany = req.body;
  // const newLocation = req.body;
  try {
    const { id } = req.params;
    // added an array element
    // await Persons.updateOne({ _id: id }, { $push: { company: newCompany } });
    // update an array element
    // await Persons.updateOne(
    //   { _id: id, "company.title": "cairo" },
    //   { $set: { "company.$.location": newLocation } }
    // );
    // delete an array element
    // await Persons.updateOne(
    //   { _id: id },
    //   { $pull: { company: { title: "cairo" } } }
    // );
    // Add a New Field to all Objects in the Array

    await Persons.updateOne({ _id: id }, { $set: { "company.$[].likes": 0 } });

    const updatedPerson = await Persons.findById(id);
    res.status(200).json({
      message: updatedMsg,
      data: updatedPerson,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
module.exports = { index, create, update };
