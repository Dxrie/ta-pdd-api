const express = require("express");
const router = express.Router();

const echionomyModel = require("../Models/echionomyModel");
const userModel = require("../Models/userModel");

router.post("/create", async (req, res, next) => {
  const {id, tipe, keterangan, jumlah} = req.body;

  const user = await userModel.findById(id);

  if (!user) return res.status(404).json("The user with that id doesn't exist");

  const echionomy = new echionomyModel({
    _id: id,
    tipe: tipe,
    keterangan: keterangan,
    jumlah: jumlah,
  });

  await echionomy.save();

  res.status(201).json(echionomy);
});

router.delete("/delete", async (req, res, next) => {
  const {id, tipe, keterangan, jumlah} = req.body;

  const echionomy = await echionomyModel.find({
    _id: id,
    tipe: tipe,
    keterangan: keterangan,
    jumlah: jumlah,
  });

  if (!echionomy)
    return res
      .status(404)
      .json("The echionomy report you were trying to delete doesn't exist.");

  await echionomyModel.deleteMany({
    _id: id,
    tipe: tipe,
    keterangan: keterangan,
    jumlah: jumlah,
  });

  return res.status(204).json("Successfully deleted.");
});

module.exports = router;
