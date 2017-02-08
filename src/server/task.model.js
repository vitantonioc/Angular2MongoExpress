var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    task: String
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;