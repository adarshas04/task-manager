const express = require("express");
const taskActions = express.Router();
const taskData = require("../../task.json");
const fs = require("fs");
const path = require("path");
const controller = require("../helpers/controller");

taskActions.use(express.json());

taskActions.get("/", (req, res) => {
    let filteredTasks = [...taskData.tasks];

    // Filtering based on completion status
    const { completed } = req.query;
    console.log(completed)
    if (completed) {
        filteredTasks = filteredTasks.filter(task => task.completed === (completed === 'true'));
    }

    return res.status(200).json(filteredTasks);
});

taskActions.get("/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = taskData.tasks.find((task) => task.id === taskId);
    if (!task) {
        return res.status(404).send("Task not found");
    }
    return res.status(200).json(task);
});

taskActions.post("/", (req, res) => {
    const newTask = req.body;
    if (controller.validateTaskInfo(newTask, taskData).status) {
        // Generate and assign a new task ID
        const maxId = taskData.tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
        newTask.id = maxId + 1;

        taskData.tasks.push(newTask);
        fs.writeFileSync(path.resolve(__dirname, "../../task.json"), JSON.stringify(taskData), { encoding: "utf8", flag: "w" });
        res.status(201).json({ status: true, message: "Task has been created" });
    } else {
        res.status(400).json({ status: false, message: "Task data does not contain complete info. Please check your inputs" });
    }
});

taskActions.put("/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const newTask = req.body;
    newTask.id = taskId;
    if (!controller.validateTaskId(newTask, taskData)) {
        return res.status(404).send("Task not found");
    }
    if (controller.validateTaskInfo(newTask, taskData).status) {
        const taskIndex = taskData.tasks.findIndex((task) => task.id === taskId);
        taskData.tasks[taskIndex] = newTask;
        fs.writeFileSync(path.resolve(__dirname, "../../task.json"), JSON.stringify(taskData), { encoding: "utf8", flag: "w" });
        res.status(200).json({ status: true, message: "Task has been updated" });
    } else {
        res.status(400).send("Invalid task update request");
    }
});

taskActions.delete("/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = taskData.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
        taskData.tasks.splice(taskIndex, 1);
        fs.writeFileSync(path.resolve(__dirname, "../../task.json"), JSON.stringify(taskData), { encoding: "utf8", flag: "w" });
        res.status(200).json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

module.exports = taskActions;