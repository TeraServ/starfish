import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/service/user.service';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private userService:UserService
    ,private dialog:MatDialog) { }
  displayedColumns: string[] = ['firstName','lastName','email','userStatus','userType','stream','phoneNumber','category','actions']
  @Input() dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.getAllUsers()
    //this.dataSource.data = [{"firstName":"Alan","lastName":"R S","stream":"CSE","email":"alanrs@gmail.com","phoneNumber":"9743838386","userStatus":"Active","userType":"Admin"}]
  }
  onUpdateClicked(data:any){
    this.dialog.open(UserUpdateComponent,{
      width:"500px",
      data:data,
    }).afterClosed().subscribe(data=>{
      this.getAllUsers()
    })

 
  }

  getAllUsers(){
    this.userService.getAllUser().subscribe(data=>{
      console.log(data)
      this.dataSource.data = data;
      
    },err=>{
      console.log(err);
    })
  }

}
