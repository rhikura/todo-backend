import express from "express"
import bodyParser from "body-parser"
import pino from 'pino'
import cors from 'cors'
import todosRouter from "./routes/todos.js"
import postsRouter from "./routes/posts.js"

const app = express()
const logger = pino()

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

app.listen(5000, () => {
    logger.info("Server started on port 5000")
})