const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp', (err)=> {
    if(!err){
        console.log("MongoDb connection succeeded!")
    }
    else{
        console.log("Err in DB connection: ", JSON.stringify(err, undefined, 2));
    }
});

// "name": "Lakshya",
//     "phoneNumber": "6392142491",
//     "emailId": "random.com",
//     "organizationName": "Random Pvt Lmt",
//     "username": "name409",
//     "password": "pass4990"
module.exports=mongoose;