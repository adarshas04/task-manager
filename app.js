const express = require('express');
const app = express();
const port = 3000;
const taskActions = require('./src/routes/taskActions');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send('Welcome to task manager app!');
})

app.use('/tasks', taskActions);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;