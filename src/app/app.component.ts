import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { Todo } from './models/todo';
import { FormsModule } from '@angular/forms';
import { Priorty } from './models/taskPriority';
import { StorageData } from './models/saveData';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, KeyValuePipe, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public enumPriority = Priorty;
  title = 'To-Do List';
  tasks: Todo[] = [
    {task: "Groceries", priority: Priorty.Normal, duration: .5, completed: false},
    {task: "Shave the dog", priority: Priorty.High, duration: 2, completed: true},
    {task: "Cook dinner", priority: Priorty.Normal, duration: 1.5, completed: false},
    {task: "Preorder Skyrim", priority: Priorty.Low, duration: .1, completed: true},
    {task: "Preorder Starfield", priority: Priorty.Low, duration: .1, completed: false},
    {task: "Do taxes", priority: Priorty.High, duration: .5, completed: false}
  ];
  filteredTasks: Todo[] = this.tasks;
  taskInput: Todo = this.createDefaultTask();
  filter: string = '';
  taskToReplace: Todo | null = null;

  constructor() {
    this.loadList();
  }

  removeTask(index: number) : void{
    this.tasks.splice(index, 1);
    this.updateFilter();
    this.saveList();
  }

  completeTask(task: Todo) : void{
    task.completed = true;
    this.saveList();
  }

  addTask() : void {
    let index: number = this.taskToReplace ? this.tasks.indexOf(this.taskToReplace!) : -1;

    if (index >= 0) {
      this.tasks.splice(index, 1, this.taskInput);
    }
    else {
      this.tasks.push(this.taskInput);
    }

    this.taskToReplace = null;
    this.taskInput = this.createDefaultTask();
    this.updateFilter();
    this.saveList();
  }

  removeCompleted() : void {
    this.tasks = this.tasks.filter(t => !t.completed);
    this.updateFilter();
    this.saveList();
  }

  createDefaultTask() : Todo {
    return {task: "", completed: false, duration: 0, priority: Priorty.Normal};
  }

  updateFilter() : void {
    let lfilter = this.filter.toLowerCase();
    this.filteredTasks = this.tasks.filter(t => t.task.toLowerCase().includes(lfilter));
  }

  edit(task: Todo) : void {
    if (task.completed) {
      return;
    }
    if (this.taskToReplace === task) {
      this.taskInput = this.createDefaultTask();
      this.taskToReplace = null;
    } else {
      this.taskInput = {... task};
      this.taskToReplace = task;
    }
    this.saveList();
    this.updateFilter();
  }

  loadList() : void {
    let stored = localStorage.getItem("todo_data");
    if (stored) {
      let data : StorageData = JSON.parse(stored) as StorageData;
      this.tasks = data.tasks;
      this.taskInput = data.taskInput;
      this.updateFilter();
    }
  }

  saveList() : void {
    let data : StorageData = {tasks: this.tasks, taskInput: this.taskInput};
    localStorage.setItem("todo_data", JSON.stringify(data));
  }
}
