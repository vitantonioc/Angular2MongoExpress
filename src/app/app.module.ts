import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TasksComponent } from './tasks/tasks.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './herodetail/hero-detail.component';
import { DataService } from './services/data.service';

import { ToastComponent } from './shared/toast/toast.component';



import { FileSelectDirective, FileDropDirective,  FileUploader } from 'ng2-file-upload';
import { ng2FileSelect } from './home/home.directiveSelect';
import { ng2FileDrop } from './home/home.directiveDrop';

const URL = 'localhost:4200/api/';


const routing = RouterModule.forRoot([
    { path: '',      component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'to-do', component: TasksComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'herodetail', component: HeroDetailComponent },
    { path: '*', component: HeroesComponent }
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TasksComponent,
    HeroesComponent,
    HeroDetailComponent,
    ToastComponent,
    FileDropDirective,
    FileSelectDirective,
    ng2FileSelect,
    ng2FileDrop
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    DataService,
    BrowserXhr,
    ToastComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})




export class AppModule { 

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
