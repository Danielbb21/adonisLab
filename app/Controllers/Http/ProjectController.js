'use strict'

const Project = use('App/Models/Project');

class ProjectController {

  async index({ request, response, view }) {

    const projects = await Project.query().with('user').with('tasks').fetch();

    return projects;
  }



  async store({ request, response, auth}) {
    try {
      const user_id = auth.user.id;
      console.log(user_id);
      const data = request.only(['title', 'description']);
      const project = await Project.create({...data, user_id: user_id});
      return project;
    }
    catch (err) {
      console.log(err.message);
      return response.status(err.status).send({ error: 'Sommeting went wrong' });
    }

  }


  async show({ params, request, response, view }) {
    const projectId  = params;
    const project = await Project.findOrFail(params.id);
    await project.load('user');
    await project.load('tasks');
    return project;
  }


  async update({ params, request, response }) {
    const data = request.only(['title', 'description']);

    const project = await Project.findOrFail(params.id);
    project.merge(data);
    await project.save();
    return project;
  }


  async destroy({ params, request, response }) {
    const project = await Project.findOrFail(params.id);
    await project.delete();

  }
}

module.exports = ProjectController
