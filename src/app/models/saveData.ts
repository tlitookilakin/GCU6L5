import { Todo } from "./todo";

export interface StorageData {
    tasks: Todo[];
    taskInput: Todo;
}