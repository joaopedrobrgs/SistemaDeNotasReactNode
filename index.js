const express = require('express');
const app = express();
const studentRoute = require("./routes/studentRoute")
const path = require("path");
require('dotenv').config();
const mongoose = require('mongoose');
const socketIO = require('socket.io');

mongoose.connect(process.env.MONGO_CONNECTION_URL, (error, db) => {
    if (!error) {
        console.log("-Database loaded");
    }
});

var db = mongoose.connection;
db.watch().on('change', data => console.log(data));

if (process.env.NODE_ENV != 'development') {

    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build/index.html'), (err) => {
            if (err) {
                res.status(500).send(err);
            }
        });
    })

}

app.use('/', studentRoute);

const server = app.listen(process.env.PORT, (err) => {
    if (!err) {
        console.log('- Server Running on Port: ' + process.env.PORT);
    }
})

const io = socketIO(server)

io.on('connection', (socket) => {
    console.log('New connection');
    db.watch().on('change', data => {
        socket.emit('updateData', {data});
    });
}) 
