import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(public http: HttpClient) { }
  private url = 'http://localhost:5000/todos';

  getTodos(){
    let result = this.http.get(this.url)
    return result
  }

  postTodo(todo){
    let req = this.http.put(this.url,todo);
    return req
  }

  updateTodo(todoId,todo){
    let req = this.http.patch(`${this.url}/${todoId}`,todo);
    return req
  }

}
