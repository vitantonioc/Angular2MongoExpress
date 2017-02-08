import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { ToastComponent } from '../shared/toast/toast.component';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
 private tasks : any = [];
 private isLoadingTasks = true;

 private task = {};
 private isEditingTasks = false;

 private addTaskForm: FormGroup;
 private myTask = new FormControl('', Validators.required);

 constructor(private http: Http,
  private dataService: DataService,
  private toast: ToastComponent,
  private formBuilder: FormBuilder) { }

ngOnInit() {
this.getTasks();
 this.addTaskForm = this.formBuilder.group({
     task: this.myTask
   });
}

 getTasks() {
   this.dataService.getTasks().subscribe(
   data => this.tasks = data,
   error => console.log(error),
   () => this.isLoadingTasks = false
  );
}

 addTask() {
 console.log(this.addTaskForm.value);
 this.dataService.addTask(this.addTaskForm.value).subscribe(
  res => {
  console.log(res.json());
  let newTask = res.json();
  this.tasks.push(newTask);
  this.addTaskForm.reset();
  this.toast.setMessage('task added successfully.', 'success');
  },
 error => console.log(error)
);
}

 enableEditing(task:any) {
 this.isEditingTasks = true;
 this.task = task;
 }

 cancelEditing() {
 this.isEditingTasks = false;
 this.task = {};
 this.toast.setMessage('task editing cancelled.', 'warning');
		// reload the tasks to reset the editing
 this.getTasks();
 }

 editTask(task:any) {
 this.dataService.editTask(task).subscribe(
   res => {
   this.isEditingTasks = false;
   this.task = task;
   this.toast.setMessage('task edited successfully.', 'success');
 },
error => console.log(error)
);
}

deleteTask(task:any) {
 if ( window.confirm('Are you sure you want to mark this task as done?')) {
  this.dataService.deleteTask(task).subscribe(
  res => {
  let pos = this.tasks.map((task:any) => { return task._id }).indexOf(task._id);
   this.tasks.splice(pos, 1);
   this.toast.setMessage('Task completed successfully.', 'success');
   },
  error => console.log(error)
 );
}
}
}
