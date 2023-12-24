import express from "express"
import bodyParser from "body-parser"
import pino from 'pino'
import cors from 'cors'
import todosRouter from "./routes/todos.js"
import postsRouter from "./routes/posts.js"
import { resolve } from 'path'

const app = express()
const logger = pino()

let port = process.env.PORT || 5000

let loggerMiddleware = (req, res, next) => {
    logger.info(`${req.ip}: ${req.method} -> ${req.originalUrl}`)
    next()
}

app.use(bodyParser.json())
app.use(cors({
    origin: '*',
    preflightContinue: true,
}));
app.use(loggerMiddleware)

app.use('/todos', todosRouter)
app.use('/posts', postsRouter)

app.get('/health', (req, res) => {
    res.status(200).send()
})

app.get('/', (req, res) => {
    const staticHtmlFile = resolve('./src/index.html')
    res.sendFile(staticHtmlFile)
})

app.listen(port, () => {
    logger.info(`Server started on port ${port}`)
})