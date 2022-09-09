import { todoStorage } from '../storage/TodoStorage';
import { delay } from '../utils';

const addTodo = async (todo) => {
  await delay(1000);
  // throw new Error('An Error occured');
  return todoStorage.add(todo);
};

const getTodos = async () => {
  await delay(500);
  return todoStorage.getAll()
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addTodo,
  getTodos
};