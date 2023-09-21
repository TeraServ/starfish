import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from 'src/model/course.model';
import { Page } from 'src/model/page.model';
@Injectable({
  providedIn: 'root'
})
export class CourseDataService {

  private dataSource = new BehaviorSubject(Course);
  private pageSource = new BehaviorSubject(Page);
  public pageData = this.pageSource.asObservable();
  public data = this.dataSource.asObservable();
  
  
  constructor() { 
    
  }

  shareData(value:any){
    this.dataSource.next(value);
  }
  sharePageData(value:any){
    this.pageSource.next(value);
  }
}
