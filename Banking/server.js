const express = require('express')
const cors = require('cors');
require('dotenv').config()
const morgan = require('morgan');
const helmet = require('helmet');
const router = require('./routes')

const app = express()

app.use(express.json())
app.use(morgan('dev'));
app.use(helmet());
app.use(cors()); 

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api', router)

app.listen(process.env.PORT, () => {
    console.log('Listening to port', process.env.PORT);
});