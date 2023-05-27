const express=require('express')
const  {Presentation}  = require("../models/fyp-models");

const router= express.Router()

router.get("/", async (req, res) => {
    let presentation = await Presentation.find({});
    if (res.status(200)) {
      res.send(presentation);
    }
  });

  router.post('/',async(req,res)=>{
    let data =await req.body
    
    let resp={}
    let presentation;
    if(data){
        try {
            presentation = new Presentation(data);
            resp = await presentation.save();
            
        }
        catch (err) {
            console.log(err)
        }
    }
    res.send(presentation)
  })

  module.exports = router;