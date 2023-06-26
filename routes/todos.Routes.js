const express = require("express");
const todoModel = require("../models/todo.model");

const todosRouter = express.Router();

todosRouter.get("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const { status, tag } = req.query;

    const filter = { userId };
    if (status) {
      filter.status = status;
    }

    if (tag) {
      filter.tag = tag;
    }

    const todos = await todoModel.find(filter);

    if (!todos) {
      res.status(400).send({ msg: "Todo Not Found" });
    }

    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send({ msg: "Failed to Load Todos" });
  }
});

todosRouter.get("/:todoId", async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { userId } = req.body;

    const todo = await todoModel.findOne({ _id: todoId, userId });

    if (!todo) {
      res.status(400).send({ msg: "Todo Not Found" });
    }

    res.status(200).send(todo);
  } catch (error) {
    res.status(500).send({ msg: "Failed to Find todo" });
  }
});

todosRouter.post("/", async (req, res) => {
  try {
    const { taskname, status, tag, userId } = req.body;
    const newTodo = new todoModel({
      taskname,
      status,
      tag,
      userId,
    });
    await newTodo.save();
    res.status(200).send({ msg: "New TOdo Added" });
  } catch (error) {
    res.status(500).send({ msg: "Adding Todo Failed" });
  }
});

todosRouter.put("/:todoId", async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { taskname, status, tag, userId } = req.body;

    const todo = await todoModel.findOne({ _id: todoId, userId });

    if (!todo) {
      res.status(400).send({ msg: "Todo Not Found" });
    }

    todo.taskname = taskname;
    todo.status = status;
    todo.tag = tag;

    await todo.save();
    res.status(200).send({ msg: "Todo is updated" });
  } catch (error) {
    res.status(500).send({ msg: "Failed to update todo" });
  }
});

todosRouter.delete("/:todoId", async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { userId } = req.body;

    const todo = await todoModel.findOne({ _id: todoId, userId });

    if (!todo) {
      res.status(400).send({ msg: "Todo Not Found" });
    }

    await todo.remove();
    res.status(200).send({ msg: "Todo is deleted" });
  } catch (error) {
    res.status(500).send({ msg: "Failed to delete todo" });
  }
});

module.exports = todosRouter;
