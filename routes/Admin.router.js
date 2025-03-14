const express=require('express')
const  {Administrator}  = require("../models/fyp-models");

const router= express.Router()

router.get("/", async (req, res) => {
    let admin = await Administrator.find({});
    if (res.status(200)) {
      res.send(admin);
    }
  });

  router.post('/',async(req,res)=>{
    let data =await req.body
    
    let resp={}
    let admin;
    if(data){
        try {
            admin = new Administrator(data);
            resp = await admin.save();
            
        }
        catch (err) {
            console.log(err)
        }
    }
    res.send(admin)
  })


  module.exports = router;


