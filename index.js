require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./connections/db-connection');
const courseRouter = require('./routes/courses.routes');
const httpStatusText = require('./utils/httpStatusText');



const app = express();

// Connect to MongoDB
connectDB();

//enable cors for all origins
app.use(cors());


//middleware so the apis will read the body in a json format (use express.json or body-parser)
app.use(express.json());

app.use('/api/courses', courseRouter);

//for not found routes
app.use((req, res) => {
    res.status(404).json({
        status: "fail",
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

//global middleware for errors
app.use( (error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: httpStatusText.ERROR, message: error.message });
} )

app.listen(process.env.PORT, (req,res) => {
    console.log('listening on port 5000');
})
