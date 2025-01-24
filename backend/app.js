//server app
const express = require('express');
const app = express();
const httpLogger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3000;
const routes = require('./routes/routes');
app.use('/', routes);

app.use(httpLogger('dev'));
app.use(cors()) //see more at https://www.npmjs.com/package/cors
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) //we expect JSON data to be sent as payloads




app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});