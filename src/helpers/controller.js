//Responsible for sanitizing inputs
class Controller {
    static validateTaskInfo(newTask) {
    if (newTask.hasOwnProperty("title") && typeof newTask.title === 'string' &&
        newTask.hasOwnProperty("description") && typeof newTask.description === 'string' &&
        (!newTask.hasOwnProperty("completed") || (newTask.hasOwnProperty("completed") && typeof newTask.completed === 'boolean'))
    ) {
        return {
            status: true,
            message: "Task has been created",
        };
    }
    return {
        "status": false,
        "message": "Task data does not contain complete info. Please check your inputs"
    }
}

    static validateTaskInfoForUpdate(newTask, taskData) {
        const isValidTask = (
            newTask.hasOwnProperty("id") &&
            newTask.hasOwnProperty("title") &&
            newTask.hasOwnProperty("description") &&
            newTask.hasOwnProperty("completed") &&
            typeof newTask.title === 'string' &&
            typeof newTask.description === 'string' &&
            typeof newTask.completed === 'boolean' &&
            Number.isInteger(newTask.id) &&
            this.validateTaskId(newTask, taskData)
        );
    
        return isValidTask ? {
            code: 201,
            status: true,
            message: "Task has been updated.",
        } : {
            code: 404,
            status: false,
            message: "Malformed request. Please check your inputs."
        };
    }

    static validateTaskId(newTask, taskData) {
        console.log(taskData.tasks.some(
            (task) => task.id === newTask.id
        ))
        return taskData.tasks.some(
            (task) => task.id === newTask.id
        );
    }

}

module.exports = Controller