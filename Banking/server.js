const express = require('express')
require('dotenv').config()
const morgan = require('morgan');
const helmet = require('helmet');

const app = express()

app.use(express.json())
app.use(morgan('dev'));
app.use(helmet());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.listen(process.env.PORT, () => {
    console.log('Listening to port', process.env.PORT);
});