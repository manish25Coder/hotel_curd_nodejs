const express = require("express");
const router=express.Router();

const MenuItem=require("../models/menu")

router.post('/',async (req,res)=>{
    try {
     const data = req.body
 
     const newMenu = new MenuItem(data);
     const response =await newMenu.save();
     console.log("data saved");
     res.status(200).json(response);
    } catch (error) {
     console.log(error);
     res.status(500).json({error:'internal server error'})
    }
 
 })


router.get('/',async(req,res)=> {
    try {
        const data =await MenuItem.find();
        console.log("data fetched");
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:'filed to get person data'})
    }
})
router.get("/:tastetype", async(req,res)=>{
    try {
     const tastetype= req.params.tastetype;
     if(tastetype=='spicy' || tastetype=='Sour' || tastetype=='Sweet'){
         const response = await MenuItem.find({taste:tastetype});
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
        const menuId=req.params.id;
        const updtaedMenu = req.body

        const response = await MenuItem.findByIdAndUpdate(menuId,updtaedMenu,{
            new:true,//Return the updateddocument
            runValidators:true// Run Mongoose validation
        })

        if(!response){
            return res.status(404).json({error:"menu not found"})
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
        const menuId = req.params.id;
        const response= await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error:"menu not found"})
        }
        console.log("data delete");
        res.status(200).json({message:"menu Deleted Successfully"})
    }catch(err){
        console.log(err);
        res.status(400).json({error:"faild to delete from database"})
    }
 })



module.exports=router;