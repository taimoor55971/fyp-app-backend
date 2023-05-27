const express=require('express')
const  {FacultySpecialization}  = require("../models/fyp-models");

const router= express.Router()

router.get("/", async (req, res) => {
    let faculty = await FacultySpecialization.find({});
    if (res.status(200)) {
      res.send(faculty);
    }
  });

  router.post('/',async(req,res)=>{
    let data =await req.body
    
    let resp={}
    let faculty;
    if(data){
        try {
            faculty = new FacultySpecialization(data);
            resp = await faculty.save();
            
        }
        catch (err) {
            console.log(err)
        }
    }
    res.send(faculty)
  })
  router.get('/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    let facultySpecialization=await FacultySpecialization.findOne({id}) 
    res.send(facultySpecialization)
})

router.put("/:id",async (req,res)=>{
    
  let id=req.params.id;
  let data=req.body;
  let facultySpecialization=await FacultySpecialization.findOneAndReplace({id}, {data});
  res.send(facultySpecialization)

})

router.delete("/:id",async(req,res)=>{
  let id=req.params.id
  let facultySpecialization=await FacultySpecialization.findOneAndDelete({id})
  res.send(facultySpecialization)
})





  module.exports = router;


