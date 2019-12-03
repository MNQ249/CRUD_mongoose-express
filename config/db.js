'use strict';

const mongooseBaseName = "express-mongoose-crud-app";

// Create the `MongoDB URI for development and test
const datebase = {
    development: `mongodb://localhost/${mongooseBaseName}-development`,
    test: `mongodb://localhost/${mongooseBaseName}-test`
}

//identify if development envirement is test or development
const localDB = process.env.TESTENV ? datebase.test : datebase.development;

// check if Enviroment variable MONGODB_URI is available 
const currentDB = process.env.MONGODB_URI || localDB;

module.exports = currentDB;