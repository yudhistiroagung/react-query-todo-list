import { Storage } from "./Storage";

export const todoStorage = new Storage(item => item.id);