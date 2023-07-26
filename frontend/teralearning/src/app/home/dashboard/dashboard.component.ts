import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  greetingMessage!:String;
  ngOnInit(): void {
    this.greetUser();
  }
  greetUser(){
    const greetings: String[] = ['Good Morning','Good Afternoon','Good Evening'];
    const currentDate: Date = new Date();
    const currentHour:number = currentDate.getHours();
    let index:number = currentHour >= 12 && currentHour < 17 ? 1 : currentHour >= 17 ? 2 : 0 ;
    this.greetingMessage = greetings[index];
  }

}
