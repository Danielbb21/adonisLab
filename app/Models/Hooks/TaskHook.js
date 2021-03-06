'use strict'

const TaskHook = exports = module.exports = {}
const Kue = use('Kue');
const Job = use('App/Jobs/NewTaskMail');


TaskHook.sendNewTaskMail = async (taskInstance) => {

  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return;
  const { email, username } = await taskInstance.user().fetch();
  console.log(email, username);

  const file = await taskInstance.file().fetch();
  const { title } = taskInstance;
  Kue.dispatch(Job.key, {email, username, title, file}, {attempts: 1});




}


