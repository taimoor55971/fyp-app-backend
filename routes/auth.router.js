require("dotenv").config(); // load .env variables
const { User,Administrator } = require("../models/fyp-models");
const mongoose = require("../database/connection");
const _ = require("lodash"); // For some extra utilities
const express = require("express");
const bcrypt = require("bcrypt"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens

const router = express.Router();
//DESTRUCTURE ENV VARIABLES WITH DEFAULTS
const { SECRET } = process.env;

router.post("/signup", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User already registered.");
    }

    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);

    // creating a user object to be stored in db
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // A better way to write the above would be
    // user = new User(_.pick(req.body, ['name', 'email', 'password']));

    await user.save();

    res.send(_.pick(user, ["id", "name", "email"]));
  } catch (e) {
    res.status(400).json({ e });
  }
});

router.post("/login", async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = await jwt.sign(
          { email: user.email, name: user.name },
          SECRET
        );
        res.json({ token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});
//User Routes
router.get("/", async (req, res) => {
  let user = await User.find({});
  if (res.status(200)) {
    res.send(user);
  }
});

router.get('/:name',async(req,res)=>{
    let name=req.params.name
    let user=await User.find({name}) 
    res.send(user)
})


router.post('/',async (req,res)=>{
    let data =await req.body
    
    let resp={}
    let user;
    if(data){
        try {
            user = new User(data);
            resp = await user.save();
            
        }
        catch (err) {
            console.log(err)
        }
    }
    res.send(user)
})


router.put("/:name",async (req,res)=>{
    
    let name=req.params.name;
    let data=req.body;
    let user=await User.findOneAndReplace({name}, {data});
    res.send(user)

})

router.delete("/:name",async(req,res)=>{
    let name=req.params.name
    let user=await User.findOneAndDelete({name})
    res.send(user)
})
//



module.exports = router;
