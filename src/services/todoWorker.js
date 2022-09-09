import todoService from './todoService';
import { delay } from '../utils';
import { TODO_STATUS } from '../constants';

let RUNNING = true;
const CRON_TIME = 15 * 1000;


const getRandomIndex = (length) => {
  if (length === 0) return -1;
  if (length === 1) return 0;
  const max = length - 1;
  return Math.floor(Math.random() * (max - 0 + 1) + 0);
}

const start = async () => {
  while (RUNNING) {
    await delay(CRON_TIME);

    const pendingTodos = (await todoService.getTodos())
      .filter(({ status }) => status === TODO_STATUS.PENDING);

    const index = getRandomIndex(pendingTodos.length);
    if (index < 0) {
      return;
    }

    const item = pendingTodos[index];
    await todoService.addTodo({
      ...item,
      status: TODO_STATUS.FINISHED
    });

  }
}

const stop = () => {
  RUNNING = false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  start,
  stop,
};