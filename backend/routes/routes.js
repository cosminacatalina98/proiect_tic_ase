const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello World2!')
  });
  
  router.post('/data', (req, res) => {
    let data = req.body
    console.log('trying to post the following data: ', data)
    res.send('Succes')
  });

  module.exports = router;