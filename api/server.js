require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const Chatroom = require('./model/Chatroom');
const PORT = process.env.PORT || 3500;

const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded data / form data
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/chatrooms', require('./routes/api/chatrooms'));

app.all('*', (req,res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not Found'});
    } else {
        res.type('txt').send('404 Not Found')
    }
});

app.use(errorHandler);

// Only listen if mongoose connects via the open event
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
})

// socket.io websockets
io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('join_room', (data) => {
        console.log(`<${data.username}> joined <${data.room}>`);
        socket.join(data.room); 
    });

    socket.on('leave_room', (data) => {
        console.log(`<${data.username}> left <${data.room}>`);
        socket.leave(data.room);
    })

    socket.on('send_message', async (data) => {
        // update chatroom messages in db
        try {
            await Chatroom.updateOne(
                { "name": data.room }, 
                { "$push": { "messages": { "$each": [data.messageObj], "$slice": -50 } }}, // limits the size of the messages array to 50 by creating trailing window
                { "new": true, "upsert": true },  
            );
            console.log('Successfully added to db');
        } catch (err) {
            console.log(err);
        }

        socket.to(data.room).emit('receive_message', data);
        console.log(`${data.messageObj.user} sent message`)
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

