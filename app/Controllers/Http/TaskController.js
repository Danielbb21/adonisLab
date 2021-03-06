'use strict'

const Task = use('App/Models/Task');

class TaskController {

  async index ({ params,request, response, view }) {
    console.log(params);
    const projects = Task.query().where('project_id', params.projects_id).with('user').fetch();
    return projects;
  }



  async store ({ params,request, response, auth }) {
    const data = request.only(['title', 'description', 'user_id', 'due_date', 'file_id']);
    const task = await Task.create({...data, project_id: params.projects_id });
    return task;
  }


  async show ({ params, request, response, view }) {

    const task = await Task.findOrFail(params.id);
    return task;
  }




  async update ({ params, request, response }) {
    const data = request.only(['title', 'description', 'user_id', 'due_date', 'file_id']);
    const task = await Task.findOrFail(params.id);
    task.merge(data);
    await task.save();
    return task;
  }


  async destroy ({ params, request, response }) {

    const task = await Task.findOrFail(params.id);
    await task.delete();
  }
}

module.exports = TaskController
