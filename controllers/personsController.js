const Persons = require("../models/PersonModel");
let msg = "persons retrived successfully";
async function index(req, res) {
  try {
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
      { $match: { favoriteFruit: "strawberry" } },
      {
        $group: { _id: { age: "$age", eyeColor: "$eyeColor" } },
      },
      //   { $sort: { _id: 1 } }, // the sorting is done on _id because the pervious stage end with _id carry the output document
          const response = await PackageModel.aggregate([
      {
        $match: {
          "plan.packages.name": packageType,
        }
      },
      {
        $project: {
          company_name: 1,
          plan: {
            packages: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$plan.packages",
                    as: "pkg",
                    cond: { $eq: ["$$pkg.name", packageType] },
                  }
                },
                0
              ]
            }
          }
        }
      },
      {
        $unwind: "$plan.packages.price_list",

      },
      {
        $match: {
          $expr: {
            $and: [
              { $in: [ manufacturingYear, "$plan.packages.price_list.manufacturing_year" ] },
              { $lt: [+(packagePrice), "$plan.packages.price_list.avg.max"] },
              { $gte: [+(packagePrice), "$plan.packages.price_list.avg.min"] }
            ]
          }
        }
      },
      {
        $sort:{
          "plan.packages.price_list.avg.min": sort_value
        }
      }
    ]);
    ]);
    res.status(200).json({
      message: msg,
      data: persons,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = { index };
