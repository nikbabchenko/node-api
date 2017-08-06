var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    // Read
    app.get('/notes/:id', (req, res) => {
        const { id } = req.params;
        const details = {'_id': new ObjectID(id)};

        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send('Error', err);
            } else {
                res.send(item)
                console.log('go');
            }
        });
    });

    // Read all notes
    app.get('/notes', (req, res) => {
        db.collection('notes').find().toArray((err, items) => {
            console.log(items);
            res.send(items);
        });
    });


    // Create
    app.post('/notes', (req, res) => {
        const note = { title: req.body.title, text: req.body.description };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send('error', err);
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    // Delete
    app.delete('/notes/:id', (req, res) => {
        const { id } = req.params;
        const details = { '_id': new ObjectID(id) };

        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': err });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    // Update
    app.put('/notes/:id', (req, res) => {
        const { id } = req.params;
        const details = { '_id': new ObjectID(id) };
        const note = { title: req.body.title, text: req.body.description };

        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error': err});
            } else {
                res.send(note);
            }
        });
    });


};
