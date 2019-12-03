// Require necessary NPM Packages
const express = require('express');

// pull in mongoose model for log
const Log = require ('../models/log');


// Instantiate a router (mini app that only handle routes)
const router = express.Router();


// CRUD

/** 
 * Action:         INDEX
 * Method:         GET
 * URI:            /logs
 * Description: Get all Logs
*/
router.get('/logs', (req, res) => {
    Log.find({}, (error, logs) => {
        // Return all logs 
        if (!error) {
            res.status(200).json({ logs: logs });
        } else {
            // if there area any errors
            res.status(500).json({ error: error})
        }
    });
});



/** 
 * Action:         
 * Method:         GET
 * URI:            /logs/seed
 * Description: Seed data to database
*/
router.get('/logs/seed', (req, res) => {
    Log.insertMany([
        {
            title: 'title1',
            entry: 'one',
            
          },
          {
            title: 'title2',
            entry: 'two',
            
          },
          {
            title: 'title3',
            entry: 'three',
          }
    ], (error, logs) => {
        if(!error){
            res.status(200).json({ logs: logs });
        } else {
            res.status(500).json({ error: error })
        }
    });
})


/** 
 * Action:         CREATE
 * Method:         POST
 * URI:            /logs
 * Description: Create new Logs
*/
router.post('/logs', (req, res) => {
         Log.create(req.body, (error, log) => {
            if (!error) {
                res.status(201).json({ log })
            } else {
                res.status(500).json({ error: error })
            }
        })
    
});




/** 
 * Action:         SHOW
 * Method:         GET
 * URI:            /logs/:id
 * Description: GET one log by ID
*/

router.get('/logs/:id', (req, res) => {
    Log.findById(req.params.id, (error, log) => {
        if (!error) {
            // return log if exist
            if (log) {
                res.status(200).json({ log: log });
            } else {
                // if there is no log with a matching id
                res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided id doesn\'t match any document'
                    }
                })
            }
        } else {
            res.status(500).json({ error: error });
        }
    })
});




/** 
 * Action:         UPDATE
 * Method:         PUT
 * URI:            /logs/:id
 * Description: Update fruit by ID
*/

router.put('/logs/:id', (req,res)=>{
    Log.findById(req.params.id, (error, log)=>{
        if(!error){
            if(log){
                log.update(req.body, (error, log)=>{
                    if(!error){
                        res.status(204).end();
                    }else{
                        res.status(500).json({error: error})
                    }
                })
            }else{
                 // if there is no log with a matching id
                 res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided id doesn\'t match any document'
                    }
                })
            }
        }else{
            res.status(500).json({error:error});
        }
    })
})



/** 
 * Action:         DESTROY
 * Method:         DELETE
 * URI:            /logs/:id
 * Description: Delete log by ID
*/

router.delete('/logs/:id', (req, res) => {
    Log.findById(req.params.id, (error, log) => {
        if (!error) {
            if (log) {
                log.remove((error, log) => {
                    if (!error) {
                        res.status(204).end();
                    } else {
                        res.status(500).json({ error: error })
                    }
                })
            } else {
                res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided id doesn\'t match any document'
                    }
                })
            }
        } else {
            res.status(500).json({ error: error })
        }
    })
})



module.exports = router;