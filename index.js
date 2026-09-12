require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('node:path');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger");
const connectDB = require('./connections/db-connection');
const courseRouter = require('./routes/courses.routes');
const userRouter = require('./routes/users.routes');
const httpStatusText = require('./utils/httpStatusText');



const app = express();



//Connect to MongoDB
connectDB();

//enable cors for all origins
app.use(cors());


//middleware so the apis will read the body in a json format (use express.json or body-parser)
app.use(express.json());

//static route: Allow clients to access files stored in the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/courses', courseRouter);
app.use('/api/users', userRouter);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//for not found routes
app.use((req, res) => {
    res.status(404).json({
        status: "fail",
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

//global middleware for errors
app.use( (error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null });
} )



app.listen(process.env.PORT, (req,res) => {
    console.log('listening on port 5000');
})
