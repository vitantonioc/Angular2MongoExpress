import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {


  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
 

  constructor(private http: Http ) { }

  /* Methods for Cats */
  private expressdata = 'http://localhost:4200';
  private webdata = 'http://localhost:8080';


  getCats() {
     return this.http.get(this.expressdata+'/api/cats').map(res => res.json());
  }

  addCat(cat:any) {
    return this.http.post(this.expressdata+'/api/cat', JSON.stringify(cat), this.options);
  }

  editCat(cat:any) {
    return this.http.put(this.expressdata+`/api/cat/${cat._id}`, JSON.stringify(cat), this.options);
  }

  deleteCat(cat:any) {
    return this.http.delete(this.expressdata+`/api/cat/${cat._id}`, this.options);
  }

  /* Methods for Tasks */

  getTasks() {
    return this.http.get(this.expressdata+'/api/tasks').map(res => res.json());
  }

  addTask(task:any) {
    return this.http.post(this.expressdata+'/api/task', JSON.stringify(task), this.options);
  }

  editTask(task:any) {
    return this.http.put(this.expressdata+`/api/task/${task._id}`, JSON.stringify(task), this.options);
  }

  deleteTask(task:any) {
    return this.http.delete(this.expressdata+`/api/task/${task._id}`, this.options);
  }
  
}
