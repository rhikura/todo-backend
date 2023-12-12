import express from 'express'
import { JSONPreset } from 'lowdb/node'

const db = await JSONPreset('db/data.json', [])
const todoRouter = express.Router()

let getNextMaxId = () => {
    let ids = db.data.map(t => t.id)
    let maxId = Math.max(...ids)
    return maxId + 1
}

todoRouter.get('/', (req, res) => {
    res.json(db.data);
})

todoRouter.post("/", (req, res) => {
    const { title, completed } = req.body
    if (!title.trim()) {
        logger.error("Title cannot by empty")
        res.status(400).json({ error: "Title cannot by empty" })
    }
    let todo = { title, completed: completed || false, id: getNextMaxId() }
    db.data.push(todo);
    db.write()
    res.status(201).json(todo);
});

todoRouter.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = db.data.findIndex((t) => t.id === id);
    let todo = db.data[todoIndex]
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    todo.title = req.body.title || todo.title;
    todo.completed = req.body.completed || todo.completed;
    res.json(todo);
});

todoRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = db.data.findIndex((t) => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }
    db.data.splice(index, 1)
    db.write()
    res.status(204).send();
});

export default todoRouter