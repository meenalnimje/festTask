const express= require("express");
const app=express();
const port=4000;
app.get("/",(req,res)=>{
    res.send("this is the home side")
})
app.listen(port,(req,res)=>{
    console.log(`server started at port ${port}`)
})