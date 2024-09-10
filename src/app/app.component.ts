import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { Todo } from './models/todo';
import { FormsModule } from '@angular/forms';
import { Priorty } from './models/taskPriority';

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

  removeTask(index: number) : void{
    this.tasks.splice(index, 1);
    this.updateFilter();
  }

  completeTask(task: Todo) : void{
    task.completed = true;
  }

  addTask() : void {
    this.tasks.push(this.taskInput);
    this.taskInput = this.createDefaultTask();
    this.updateFilter();
  }

  removeCompleted() : void {
    this.tasks = this.tasks.filter(t => !t.completed);
    this.updateFilter();
  }

  createDefaultTask() : Todo {
    return {task: "", completed: false, duration: 0, priority: Priorty.Normal};
  }

  updateFilter() : void {
    let lfilter = this.filter.toLowerCase();
    this.filteredTasks = this.tasks.filter(t => t.task.toLowerCase().includes(lfilter));
  }
}
