import express from 'express'
import { JSONPreset } from 'lowdb/node'

const db = await JSONPreset('db/todos.json', [])
const todosRouter = express.Router()

let getNextMaxId = () => {
    let ids = db.data.map(t => t.id)
    let maxId = Math.max(...ids)

    if (ids.length === 0) maxId = 0

    return maxId + 1
}

todosRouter.get('/', (req, res) => {
    res.json(db.data);
})

todosRouter.post("/", (req, res) => {
    const body = req.body
    const title = body.title || ""
    const completed = body.completed || false

    if (!title.trim()) {
        logger.error("Title cannot by empty")
        res.status(400).json({ error: "Title cannot by empty" })
    }
    let todo = { title, completed, id: getNextMaxId() }
    db.data.push(todo);
    db.write()
    res.status(201).json(todo);
});

todosRouter.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = db.data.findIndex((t) => t.id === id);
    let todo = db.data[todoIndex]
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    todo.title = req.body.title || todo.title;
    todo.completed = req.body.completed || todo.completed;
    db.data[todoIndex] = todo
    db.write()
    res.json(todo);
});

todosRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = db.data.findIndex((t) => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }
    db.data.splice(index, 1)
    db.write()
    res.status(204).send();
});

export default todosRouter