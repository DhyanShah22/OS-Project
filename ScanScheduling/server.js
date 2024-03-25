const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

const router = require('./Routes/scanRoute');
const { handleRequest } = require('./Controllers/scanScheduling');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors()); 

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api', router)

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log('Listening to port', process.env.PORT);
});
