(function() {
    'use strict';

    const express = require('express');
    const MongoClient = require('mongodb').MongoClient;
    const bodyParser = require('body-parser');
    const db = require('./config/db');
    const app = express();
    const port = 8080;

    // adding body parser
    app.use(bodyParser.urlencoded({extended: true}));




    // db connect
    MongoClient.connect(db.url, (err, db) => {
        if (err) {
            throw err;
        }

        // adding routes
        require('./app/routes')(app, db);
    })

    // starting app
    app.listen(port, () => {
        console.log(`We are live on  ${port}`);

    })
}());
