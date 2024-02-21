const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
require('dotenv').config()

const app = express()
const taskRoutes = require('./Routes/taskRoutes')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(helmet())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get("/", (req,res) => {
    res.send("Hello World!")
})

app.use('/', taskRoutes)

// mongoose.connect(process.env.MONG_URI)
//     .then(() => {
        app.listen((process.env.PORT), () => {
            console.log('Listening to port', process.env.PORT)
        })
    // })
    // .catch((error) => {
    //     console.log(error)
    // })