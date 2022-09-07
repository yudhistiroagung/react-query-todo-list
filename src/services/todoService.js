import { v4 } from 'uuid';

import { todoStorage } from '../storage/TodoStorage';
import { TODO_STATUS } from '../constants';

const addTodo = async ({ todoname }) => {
  return todoStorage.add({
    id: v4(),
    name: todoname,
    createdAt: new Date().toISOString(),
    status: TODO_STATUS.PENDING
  });
};

const getTodos = async () => {
  return todoStorage.getAll()
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addTodo,
  getTodos
}