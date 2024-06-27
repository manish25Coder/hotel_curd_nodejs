const mongoose = require("mongoose");

const connectToDatabase = async()=>{mongoose.connect(process.env.DB)
    .then((conn)=>{
        console.log("Data base connected successfully");
    })
    .catch((err)=>{
        console.log("Erroe to connect Database",err.message);
    })

}

module.exports=connectToDatabase;




















