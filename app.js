const express = require('express');
const path = require("path");
const app = express();
const ejsMate = require("ejs-mate");
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');
const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/Manikarnika';

// ========================all the imports================================= 
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));
app.engine('ejs', ejsMate);


// ========================all the routes=================================
app.use('/', publicRoutes);
app.use('/admin', adminRoutes); 
app.use('/client',clientRoutes);
// ========================database connection=================================
async function main(){
    await mongoose.connect(dbUrl);
}

main().then(()=>{
    console.log("Connection successful");
    app.listen(4000,()=>{
        console.log("listening on port 4000");
    });
}).catch( (err) =>{
    console.log("Connection unsuccessful");
    console.error(err); // Log the actual error for better debugging
});