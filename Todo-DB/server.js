const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Express app setup
const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todoDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// ToDo schema and model
const toDoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ToDo = mongoose.model('ToDo', toDoSchema);

// Routes
// Add a new ToDo item
app.post('/todos', async (req, res) => {
    try {
        const newToDo = new ToDo({
            text: req.body.text
        });
        const savedToDo = await newToDo.save();
        res.status(201).json(savedToDo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all ToDo items
app.get('/todos', async (req, res) => {
    try {
        const todos = await ToDo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a ToDo item
app.patch('/todos/:id', async (req, res) => {
    try {
        const todo = await ToDo.findById(req.params.id);
        if (req.body.text != null) {
            todo.text = req.body.text;
        }
        if (req.body.completed != null) {
            todo.completed = req.body.completed;
        }
        const updatedToDo = await todo.save();
        res.json(updatedToDo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a ToDo item
app.delete('/todos/:id', async (req, res) => {
    try {
        const result = await ToDo.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Cannot find item' });
        }
        res.json({ message: 'Deleted ToDo item' });
    } catch (err) {
        console.error("Error on delete:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// Start the server
const PORT = process.env.PORT || 2023;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

