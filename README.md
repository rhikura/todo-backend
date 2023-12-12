# Start Project

1) npm install
2) node index.js

# Resources
```
GET /todos
PUT /todos/1
DELETE /todos/1
POST /todos
```

**Getting resource**
```js
fetch('http://localhost:5000/todos')
  .then((response) => response.json())
  .then((json) => console.log(json));
```

**Creating a resource**
```js
fetch('http://localhost:5000/todos', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    completed: false
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

**Updating a resource**
```js
fetch('http://localhost:5000/todos/1', {
  method: 'PUT',
  body: JSON.stringify({
    id: 1,
    title: 'foo',
    completed: false
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

**Deleting a resource**
```js
fetch('http://localhost:5000/todos/1', {
  method: 'DELETE',
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```