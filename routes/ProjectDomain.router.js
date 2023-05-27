const {ProjectDomain}=require("../models/fyp-models")
const express=require('express')

const router=express.Router()


router.get("/",(req,res)=>{
    let pd=ProjectDomain.find({})
    res.send(pd)
})
