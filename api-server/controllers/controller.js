'use strict';

var model = require('../models/models');

exports.list_all_tasks = function(request, response) {
  var tasksResponse = new Object();
  tasksResponse.tasks = model.tasksList;
  response.json(tasksResponse);
};

exports.create_a_task = function(request, response) {
  console.log('Create task: ' + JSON.stringify(request.body));
  var taskRequest = request.body;
  taskRequest.id = model.tasksList[model.tasksList.length - 1].id + 1;
  model.tasksList.push(taskRequest);
  var taskResponse = new Object();
  taskResponse.task = model.tasksList[model.tasksList.length - 1];
  response.status(201);
  response.json(taskResponse);
};

exports.read_a_task = function(request, response) {
  console.log('Get task: '+ request.params.taskId);
  var taskId = request.params.taskId;
  var requestedTask;
  for(var i = model.tasksList.length - 1; i >= 0; i--) {
    if(model.tasksList[i].id == taskId) {
       requestedTask = model.tasksList[i];
       break;
    }
  }
  var taskResponse = new Object();
  taskResponse.task = requestedTask;
  response.json(taskResponse);
};
