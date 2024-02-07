//Responsible for sanitizing inputs
class Validator {
    static validateTaskInfo(newTask, taskData) {
        if (newTask.hasOwnProperty("id") &&
            newTask.hasOwnProperty("title") &&
            newTask.hasOwnProperty("description") &&
            newTask.hasOwnProperty("completed") &&
            this.validateTaskId(newTask, taskData)
        ) {
            return {
                status: true,
                message: "Task has been created",
            };
        } else if (!this.validateTaskId(newTask, taskData)) {
            return {
                status: false,
                message: "Please provide a new task Id",
            };
        } else {
            return {
                "status": false,
                "message": "Task data does not contain complete info. Please check your inputs"
            }
        }
    }

    static validateTaskInfoForUpdate(newTask, taskData) {
        if (newTask.hasOwnProperty("id") &&
            newTask.hasOwnProperty("title") &&
            newTask.hasOwnProperty("description") &&
            newTask.hasOwnProperty("completed")
        ) {
            return {
                status: true,
                message: "Task has been updated",
            };
        } else if (!this.validateTaskId(newTask, taskData)) {
            return {
                status: false,
                message: "Please provide a new task Id",
            };
        } else {
            return {
                "status": false,
                "message": "Task data does not contain complete info. Please check your inputs"
            }
        }
    }

    static validateTaskId(newTask, taskData) {
        let taskFound = taskData.tasks.some(
            (t) => t.id === newTask.id
        );
        if (taskFound) return false;
        return true;
    }

    static validateRating(ratingRecieved) {
        if (ratingRecieved.hasOwnProperty("rating") && Number.isFinite(ratingRecieved.rating)) {
            return true;
        }
        return false;
    }
}

module.exports = Validator