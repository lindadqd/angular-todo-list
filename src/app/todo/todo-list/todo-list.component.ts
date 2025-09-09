import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todoService = inject(TodoService)

  todo$ = new Observable<Todo[]>()

  ngOnInit():void {
    this.todo$ = this.todoService.getToDos()
    console.log(this.todo$)
  }
}
