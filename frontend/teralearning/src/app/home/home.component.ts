import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  activeTab: string = "dahboard";

  userType: boolean[] = [];

  userId!: number;
  notificationCount: any[] = [];
  notificationCounts: number = 0;
  displayStyle: string = "none";
  displayStyle1: string = "none";
  displayStyle2: string = "none";
  displayStyle3: string = "none";
  @ViewChild('userTab') userTab!: ElementRef;
  @ViewChild('userTab') collapseView1!: ElementRef;
  @ViewChild('streamTab') streamTab!: ElementRef;
  @ViewChild('streamTab') collapseView2!: ElementRef;
  @ViewChild('subjectTab') subjectTab!: ElementRef;
  @ViewChild('subjectTab') collapseView3!: ElementRef;
  @ViewChild('quizTab') quizTab!: ElementRef;
  @ViewChild('quizTab') collapseView4!: ElementRef;



  ngOnInit(): void {
    // localStorage.removeItem("currentUser")
    this.authService.isTokenExpired();
    if (!this.authService.isLoggedIn()) {
      this.router.navigate([""])
      
     
  }
  
  
  this.userType  = this.authService.getUserTypes();
  console.log(this.userType)
 
    //console.log( this.router.url.split('/')[2])
    // this.getUserId();
    this.activeTab = this.router.url.split('/')[2]
    // this.authService.getServerStatus();
    // this.userType = this.authService.getUserTypes();


    // console.log(this.userType)

  }


  ngAfterViewInit() {
    this.userTab.nativeElement.onclick = () => {
      if (this.displayStyle == "none") {
        this.displayStyle = "block";
      } else {
        this.displayStyle = "none";
      }
    }
    this.streamTab.nativeElement.onclick = () => {
      if (this.displayStyle1 == "none") {
        this.displayStyle1 = "block";
      } else {
        this.displayStyle1 = "none";
      }
    }
    this.subjectTab.nativeElement.onclick = () => {
      if (this.displayStyle2 == "none") {
        this.displayStyle2 = "block";
      } else {
        this.displayStyle2 = "none";
      }
    }

    this.quizTab.nativeElement.onclick = () => {
      if (this.displayStyle3 == "none") {
        this.displayStyle3 = "block";
      } else {
        this.displayStyle3 = "none";
      }
    }


  }


  // getUserId(){
  //   this.userService.getUserByEmail(this.authService.getUserId()).subscribe(data=>{

  //     this.userId = data.id;

  //   })
  // }


  logOut() {
    this.authService.logout();

  }
  Logout() {

    this.authService.logout();
    this.router.navigate([""])

  }

  ngOnDestroy() {
    // this.sharedService.notificationUpdate.unsubscribe()
  }
}