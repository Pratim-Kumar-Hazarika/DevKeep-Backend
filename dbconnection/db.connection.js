const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI

async function initializeDbConnection(){
    try {
        const connection =  await mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false})
        if(connection){
            console.log("Successfully connected to database")
        }
    } catch (error) {
        console.log("Connection was not established with database")
    }
}

module.exports = { initializeDbConnection }