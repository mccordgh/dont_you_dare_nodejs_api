const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.delete('/items/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id' : new ObjectID(id) };

        db.collection('items').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });

                return;
            }

            res.send(`item ${id} deleted!`);
        })
    })

    app.get('/items', (req, res) => {
        db.collection('items').find().toArray((err, items) => {
            if (err) {
                res.send({ 'error': 'An error occured' });

                return;
            }

            res.send(items)
        })
    })

    app.get('/items/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        db.collection('items').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });

                return;
            }

            res.send(item);
        })
    })

    app.post('/items', (req, res) => {
        const item = {
            description: req.body.description,
            title: req.body.title,
            completed: req.body.completed,
        };

        db.collection('items').insert(item, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });

                return;
            }

            res.send(result.ops[0]);
        })
    });

    app.put('/items/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const item = {
            description: req.body.description,
            title: req.body.title,
            completed: req.body.completed,
        };

        db.collection('items').update(details, item, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });

                return;
            }

            res.send(item);
        });
    });
};
