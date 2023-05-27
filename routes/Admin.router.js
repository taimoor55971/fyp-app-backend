const express=require('express')
const { Administrator } = require("../models/fyp-models");

const router= express.Router()

router.get("/", async (req, res) => {
    let admin = await Administrator.find({});
    if (res.status(200)) {
      res.send(admin);
    }
  });


