const express = require("express");
const router=express.Router();
const Person= require("../models/person")

router.post('/',async (req,res)=>{
    try {
     const data = req.body
 
     const newPerson = new Person(data);
     const response =await newPerson.save();
     console.log("data saved");
     res.status(200).json(response);
    } catch (error) {
     console.log(error);
     res.status(500).json({error:'internal server error'})
    }
 
 })

 router.get('/',async(req,res)=> {
    try {
        const data =await Person.find();
        console.log("data fetched");
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:'filed to get person data'})
    }
})

router.get("/:worktype", async(req,res)=>{
    try {
     const worktype= req.params.worktype;
     if(worktype=='chef' || worktype=='manager' || worktype=='waiter'){
         const response = await Person.find({work:worktype});
         console.log("response fetched");
         res.status(200).json(response)
     }
    } catch (error) {
         console.log(error);
         res.status(400).json({error:"Invalid type"})
    }
 })

 router.put("/:id",async(req,res)=>{
    try {
        const personId=req.params.id;
        const updatedPerson = req.body

        const response = await Person.findByIdAndUpdate(personId,updatedPerson,{
            new:true,//Return the updateddocument
            runValidators:true// Run Mongoose validation
        })

        if(!response){
            return res.status(404).json({error:"person not found"})
        }
        console.log("data updated");
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Invalid type"})
    }
 })

 router.delete("/:id",async(req,res)=>{
    try{
        const personId = req.params.id;
        const response= await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:"person not found"})
        }
        console.log("data delete");
        res.status(200).json({message:"person Deleted Successfully"})
    }catch(err){
        console.log(err);
        res.status(400).json({error:"faild to delete from database"})
    }
 })

 

 module.exports=router;