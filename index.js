require('dotenv').config();
const express = require('express');
const connectDB = require('./connections/db-connection');
const courseRouter = require('./routes/courses.routes');



const app = express();

// Connect to MongoDB
connectDB();

//middleware so the apis will read the body in a json format (use express.json or body-parser)
app.use(express.json());

app.use('/api/courses', courseRouter);


app.listen(process.env.PORT, (req,res) => {
    console.log('listening on port 5000');
})
