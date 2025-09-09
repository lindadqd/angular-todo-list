import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  taskForm: FormGroup
  formBuilder = inject(FormBuilder)
  todoService = inject(TodoService)

  constructor() {
    this.taskForm = this.formBuilder.group({
      title: ["", Validators.required]
    })
  }

  addTask() {
    if(this.taskForm.invalid) {
      alert('Please enter a task title.')
      return 
    }
    this.todoService.addTodo(this.taskForm.value).subscribe({next: (response) => {
      console.log('Todo added:', response);
      this.taskForm.reset();
      this.reloadPage();
    },
    error: (err) => {
      console.error('Error adding todo:', err);
    }
  })}

  reloadPage() {
    window.location.reload()
  }
}
