import { Storage } from "./Storage";

export const todoStorage = new Storage(item => item.id);

// add one dummy data
todoStorage.add({
  id: 'initial-id',
  name: 'Learn React Query',
  status: 'PENDING',
  createdAt: new Date().toISOString()
});