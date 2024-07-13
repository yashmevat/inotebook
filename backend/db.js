const mongoose = require('mongoose');

const connectToMongo =()=>{
    const connect = mongoose.connect(process.env.MONGO_URI)
    if(connect){
        console.log('successfully connected');
    }
}

module.exports = connectToMongo