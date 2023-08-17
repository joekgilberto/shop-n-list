const mongoose = require('mongoose')

const connectionString = process.env.DATABASE_URL

mongoose.connect(connectionString)

const db = mongoose.connection

db.on('connected', function(){
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
})

db.on('error', function(err){
    console.log('something went wrong')
})