import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input('todo') todo: Todo | null = null;
  @Output('update') update = new EventEmitter<Todo>();

  todoService = inject(TodoService)
  
  isEditing = false;
  editedTitle = '';

  startEditing() {
    if (!this.todo) {
      throw new Error('cannot toggle complete on null');
    }

    this.isEditing = true;
    this.editedTitle = this.todo.title;
  }

  cancelEdit() {
    this.isEditing = false;
    this.editedTitle = '';
  }

  saveEdit() {
    if (!this.todo) {
      throw new Error('cannot toggle complete on null');
    }
    if (this.editedTitle.trim()) {
      this.todo.title = this.editedTitle;
      this.isEditing = false;
      console.log(this.todo)
      this.todoService.updateTodo(this.todo).subscribe({next: (response) => {
        console.log("Todo update:", response)
      }})
    }
    
  }

  toggleCompleted() {
    if (!this.todo) {
      throw new Error('cannot toggle complete on null');
    }
    this.update.emit({
      ...this.todo,
      completed: !this.todo.completed,
    });

    console.log(this.todo)
  }
}
