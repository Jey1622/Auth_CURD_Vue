const express = require("express");
const router = express.Router();
const Todolist  = require("../models/todo"); // Importing the Sequelize model

// POST route for creating a new todo
router.post("/", async (req, res) => {
  try {
    const { todo } = req.body;
    if (!todo) {
      return res.status(400).json({ error: "Todo content is required" });
    }
    console.log(todo)
    // Using Sequelize's create method
    const newTodo = await Todolist.create({ todo });
    res.status(201).json(newTodo); // Returns the newly created record
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET route to fetch all todos
router.get("/", async (req, res) => {
  try {
    // Fetching all records using Sequelize's findAll method
    const allTodos = await Todolist.findAll();
    res.json(allTodos);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// PUT route for updating a todo by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todo } = req.body;

    // Find the record by ID
    const existingTodo = await Todolist.findByPk(id);
    if (!existingTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Update the record
    existingTodo.todo = todo;
    await existingTodo.save();
    res.json({ message: "Todo was updated", updatedTodo: existingTodo });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// DELETE route for deleting a todo by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the record by ID
    const todoToDelete = await Todolist.findByPk(id);
    if (!todoToDelete) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Delete the record
    await todoToDelete.destroy();
    res.json({ message: "Todo was deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
