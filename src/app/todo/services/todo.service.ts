import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  http = inject(HttpClient)

  getToDos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}/todo`)
  }
  
  addTodo(todo: Todo) {
    return this.http.post(`${environment.apiUrl}/todo`, todo)
  }

  updateTodo(todo:Todo) {
    return this.http.put(`${environment.apiUrl}/todo/${todo.id}`, todo)
  }
}
