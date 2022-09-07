import { v4 } from 'uuid';

import { todoStorage } from '../storage/TodoStorage';
import { TODO_STATUS } from '../constants';
import { delay } from '../utils';
const addTodo = async (todo) => {
  await delay(5000);
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
}