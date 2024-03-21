const express = require("express");
const uniqid = require("uniqid");
const router = express.Router();

const userModel = require("../Models/userModel");

router.get("/", async (req, res, next) => {
  const users = await userModel.find();

  try {
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

router.post("/register", async (req, res, next) => {
  const {name, password} = req.body;

  if (!name || !password) return res.status(400).json("Please fill out all the required fields.")

  let user = await userModel.findOne({name: name});

  if (user)
    return res.status(400).json("User with the same username was found.");

  let id = uniqid();

  while (true) {
    id = uniqid();
    user = await userModel.findById(id);

    if (user) continue;

    break;
  }

  user = new userModel({_id: id, name: name, password: password});

  await user.save();

  res.status(201).json(user);
});

router.post("/login", async (req, res, next) => {
  const {name, password} = req.body;

  const user = await userModel.findOne({name: name, password: password});

  if (!user)
    return res.status(404).json("Please check your username or password.");

  res.status(200).json(user);
});

router.delete("/", async (req, res, next) => {
  await userModel.deleteMany();

  return res.status(200).json(await userModel.find());
});

module.exports = router;
