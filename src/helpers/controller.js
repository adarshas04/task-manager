class Controller {
    static validateTaskInfo(newTask) {
        const hasRequiredFields = newTask.hasOwnProperty("title") && typeof newTask.title === 'string' &&
                                    newTask.hasOwnProperty("description") && typeof newTask.description === 'string';
        const hasValidCompletedField = !newTask.hasOwnProperty("completed") || typeof newTask.completed === 'boolean';

        if (hasRequiredFields && hasValidCompletedField) {
            return true;
        }
        return false;
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

        if (isValidTask) {
            return true;
        } else {
            return false;
        }
    }

    static validateTaskId(newTask, taskData) {
        return taskData.tasks.some((task) => task.id === newTask.id);
    }
}

module.exports = Controller;