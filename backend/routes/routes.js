const express = require('express');
const router = express.Router();
const  db  = require("../firebaseadmin.js");


router.get('/', (req, res) => {
    res.send('Hello World5!')
  });
  
  router.post('/data', (req, res) => {
    let data = req.body
    console.log('trying to post the following data: ', data)
    res.send('Succes')
  });

  module.exports = router;