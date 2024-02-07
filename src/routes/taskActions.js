const express = require("express");
const taskActions = express.Router();
const taskData = require("../../task.json");
const fs = require("fs");
const path = require("path");
const validator = require("../helpers/validator");

taskActions.get("/", (req, res) => {
    return res.status(200).json(taskData);
});

taskActions.get("/:id", (req, res) => {
    const tasks = taskData.tasks;
    let filteredTask = tasks.filter((task) => {
        return task.id == req.params.id;
    });
    if (filteredTask.length == 0) {
        return res.status(404).send("Task not found");
    } else {
        return res.status(200).json(filteredTask);
    }
});

taskActions.post("/", (req, res) => {
    const newTask = req.body;
    let writePath = path.resolve(__dirname, "../../task.json");

    if (validator.validateTaskInfo(newTask, taskData).status) {
        let allTasks = JSON.parse(JSON.stringify(taskData));
        allTasks.tasks.push(newTask);

        fs.writeFileSync(writePath, JSON.stringify(allTasks), {
            encoding: "utf8",
            flag: "w",
        });
        res.status(200).json(validator.validateTaskInfo(newTask, taskData));
    } else {
        res.status(400).json(validator.validateTaskInfo(newTask, taskData));
    }
});

taskActions.put("/:id", (req, res) => {
    const newTask = req.body;
    const taskId = parseInt(req.params.id);
    let writePath = path.resolve(__dirname, "../../task.json");

    if (validator.validateTaskInfoForUpdate(newTask, taskData).status && taskId === newTask.id) {
        let allTasks = JSON.parse(JSON.stringify(taskData));
        let taskIndex = allTasks.tasks.findIndex((task) => task.id === taskId)
        if (taskIndex !== -1) {
            allTasks.tasks[taskIndex] = newTask;

            fs.writeFileSync(writePath, JSON.stringify(allTasks), {
                encoding: "utf8",
                flag: "w",
            });

            res.status(200).json(validator.validateTaskInfoForUpdate(newTask, taskData));

        } else {
            res.status(404).send("Task not found");
        }
    } else {
        res.status(400).send("Invalid task update request");
    }
});

taskActions.delete("/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    let writePath = path.resolve(__dirname, "../../task.json");
    let allTasks = JSON.parse(JSON.stringify(taskData));

    const taskIndex = allTasks.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        allTasks.tasks.splice(taskIndex, 1);
        fs.writeFileSync(writePath, JSON.stringify(allTasks), {
            encoding: "utf8",
            flag: "w",
        });

        res.status(200).json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }

})

module.exports = taskActions;