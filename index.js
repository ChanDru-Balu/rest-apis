const express = require('express');
const app = express();
const todoRoutes = require('./routes/todo.routes');

app.use(express.json());

app.use('/todo', todoRoutes);

app.get('/', (req, res) => {
    res.send('Welcome, but this is the Boilerplate place only. Use proper routes!');
});

// Handle 404 routes
app.use((req, res) => {
    res.status(404).send('Path not found!');
});

// Export the app instead of using `app.listen()`
module.exports = app;
