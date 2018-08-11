const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const db             = require('./config/db');
const bodyParser     = require('body-parser');

const app            = express();
const port = 8001;

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Accept', 'application/json');
  next();
});

MongoClient.connect(db.url, (err, database) => {
  if (err) {
    return console.error(err)
  }

  require('./app/routes')(app, database);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
