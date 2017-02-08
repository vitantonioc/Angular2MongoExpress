import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { ToastComponent } from '../shared/toast/toast.component';

import { DataService } from '../services/data.service';

import { FileSelectDirective, FileDropDirective,  FileUploader } from 'ng2-file-upload';
import { ng2FileSelect } from './home.directiveSelect';
import { ng2FileDrop } from './home.directiveDrop';


const URL = 'localhost:4200/api/';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})



export class HomeComponent implements OnInit {

  private cats: any = [];
  private isLoading = true;

  private cat: any = {};
  private isEditing = false;

  private addCatForm: FormGroup;
  private name = new FormControl('', Validators.required);
  private age = new FormControl('', Validators.required);
  private weight = new FormControl('', Validators.required);

  constructor(private http: Http,
              private dataService: DataService,
              private toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCats();

    this.addCatForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });
  }

  getCats() {
    //console.log( this.dataService);
    this.dataService.getCats().subscribe(
      data => this.cats = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCat() {
    this.dataService.addCat(this.addCatForm.value).subscribe(
      res => {
        let newCat = res.json();
        this.cats.push(newCat);
        this.addCatForm.reset();
        this.toast.setMessage('item added successfully.','success');
      },
      error => console.log(error)
    );
  }

  enableEditing(cat:any) {
    this.isEditing = true;
    this.cat = cat;
  }

  cancelEditing() {
    this.isEditing = false;
    this.cat = {};
    this.toast.setMessage("item editing cancelled.", "warning");
    // reload the cats to reset the editing
    this.getCats();
  }

  editCat(cat:any) {
    this.dataService.editCat(cat).subscribe(
      res => {
        this.isEditing = false;
        this.cat = cat;
        this.toast.setMessage("item edited successfully.", "success");
      },
      error => console.log(error)
    );
  }

  deleteCat(cat:any) {
    if(window.confirm("Are you sure you want to permanently delete this item?")) {
      this.dataService.deleteCat(cat).subscribe(
        res => {
          var pos = this.cats.map((cat:any) => { return cat._id }).indexOf(cat._id);
          this.cats.splice(pos, 1);
          this.toast.setMessage("item deleted successfully.", "success");
        },
        error => console.log(error)
      );
    }
  }

 // upload file
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  } 



}
