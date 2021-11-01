const https = require('https')
const express = require('express')
const colors = require('colors')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const morgan = require('morgan')
const fs = require('fs')
require('dotenv').config()

const appRouter = require('./api/routes')
const database = require('./database')

const app = express()


/* ****
start - SETTING OF THE DATABASE
**** */

// Conection to Databse
database.connect()


// Test to connection to database
const db = database.connection
db.once('open', () => console.info('Connected to database !'.cyan.underline.bold))

// Error to connect to databse
db.on('error', (err) => console.error(err))

/* ****
end - SETTING OF THE DATABASE
**** */


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'))
}

app.use(express.urlencoded({ extended: true }, { limit: '50mb' }))
app.use(express.json({ limit: '50mb' }, { type: '*/*' }))

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// prevent cross site scrpting 'xss' attacks
app.use(xss())

app.use(cors())

// Rale Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 100, // 10 mins
    max: 100
})

app.use(limiter)

// Prevent http param pollution
app.use(hpp())

app.get('/', (req, res) => {
    const pathToHtmlFile = 'public/dist/index.html'
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8')
    res.status(200).send(contentFromHtmlFile)
})

app.use('/api', appRouter)
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {

    const serverOptions = {
        key: fs.readFileSync(process.env.SSL_KEY, 'utf8'),
        cert: fs.readFileSync(process.env.SSL_CERT, 'utf8')
        // key: fs.readFileSync('./ssl/privkey.pem'),
        // cert: fs.readFileSync('./ssl/fullchain.pem')
    }
    
    const server = https.createServer(serverOptions, app).listen(process.env.PORT, () => {
        console.log(`Express is launch: ${process.env.BASE_URL}:${process.env.PORT}`)
    })
    
    // Handle unhandled rejections
    process.on('unhandledRejection', (err) => {
        console.log(`Error: ${err.message}`)
        server.close(() => process.exit(1))
    })
}

if (process.env.NODE_ENV !== 'production') {
    const server = app.listen(process.env.PORT, () => {
        console.info('*********')
        console.info('*********')
        console.info(`The drweb ExpressJS MongoDB Boilerplate server is running on : ${process.env.BASE_URL}:${process.env.PORT} !`.yellow.bold)
    })

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err, promise) => {
        console.log(`Error: ${err.message}`)

        // Close server & exit process
        server.close(() => {
            database.close()
            process.exit(1)
        })
    })
}



module.exports = app