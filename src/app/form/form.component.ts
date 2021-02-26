import { TasksService } from './../tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  public todos: any;
  public title: String;
  public description: String;
  public status: 'open' | 'in-progress' | 'completed' = "open";
  public newTask: {};
  public result: any;

  constructor(private service:TasksService) { }

  ngOnInit(): void {
  }

  addTask(){
    this.newTask = {
      "title": this.title,
      "description": this.description,
      "status": this.status,
    }
    this.service.postTodo(this.newTask).subscribe((res) => {
      this.result = res["result"];
    },(err) => {
      console.log(err)
    });

    console.log(this.newTask)
  }
}
