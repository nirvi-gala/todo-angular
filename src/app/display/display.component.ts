import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TasksService } from "../tasks.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})

export class DisplayComponent implements OnInit,OnChanges {
	public open: []
	public progress: []
	public completed: []
	public statusObj = {
		"open": "open",
		"completed": "completed",
		"progress": "in-progress",
	}
	constructor(private tasks: TasksService) { }
	@Input() data: any
	@Input() cdkDragData: any

	ngOnInit(): void {
		this.tasks.getTodos().subscribe((data) => {
			let todos = data["result"]
			Object.keys(this.statusObj).map((key) => {
				this[key] = todos.filter((td) => {
					return td.status  === this.statusObj[key];
				});
			})
		},(err) => {
			console.log(err)
		})
	}

	ngOnChanges(){
		if(this.data && this.data["status"]){
			let value = this.data["status"];
			let key = Object.keys(this.statusObj).find(key => this.statusObj[key] === value);
			if(key){
				this[key].push(this.data);
			}
		}
	}

	updateItemStatus(itemId,item){
		this.tasks.updateTodo(itemId,item).subscribe((res) => {
			console.log(res)
		},(err) => console.log(err))
	}

	drop(event: CdkDragDrop<string[]>) {
		let draggedItemId = event.item.data["_id"];	
		event.item.data["status"] = event.container.id;
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		}else {
			transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
		}
		this.updateItemStatus(draggedItemId,event.item.data)
	}
}
