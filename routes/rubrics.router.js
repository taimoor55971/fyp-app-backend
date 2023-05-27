const express=require('express')
const  {Rubric}  = require("../models/fyp-models");

const router= express.Router()

router.get("/", async (req, res) => {
    let rubric = await Rubric.find({});
    if (res.status(200)) {
      res.send(rubric);
    }
  });

  router.post('/',async(req,res)=>{
    let data =await req.body
    
    let resp={}
    let rubric;
    if(data){
        try {
            rubric = new Rubric(data);
            resp = await Rubric.save();
            
        }
        catch (err) {
            console.log(err)
        }
    }
    res.send(rubric)
  })

  module.exports = router;