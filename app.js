const express = require('express');
const path = require("path");
const app = express();
const ejsMate = require("ejs-mate");
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
// ========================all the imports================================= 
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));
app.engine('ejs', ejsMate);


// ========================all the routes=================================
app.use('/', publicRoutes);
app.use('/admin', adminRoutes); 

app.listen(4000,()=>{
    console.log("listening on port 4000");
})