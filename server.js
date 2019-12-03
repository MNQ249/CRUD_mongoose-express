// reqire NPM packages
const express = require('express');
const mongoose = require('mongoose');

//requir routes file
const logRouter = require('./routes/log_routes');

//requir db configure file
const db = require('./config/db')


//port 
const port = 5000;

//create express app
const app = express();

//establish connection db
mongoose.connect(`mongodb://localhost:27017/express-mongoose-crud-app-development`, {useNewUrlParser: true, useUnifiedTopology: true}, ()=> {
    console.log("Connected to MongoDB")
});

/*** Middleware ***/
// Add bodyParser middleware
app.use(express.json())
/*** Routes ***/
app.use(logRouter);


// Run API on designated port
app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});