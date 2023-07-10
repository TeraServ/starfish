import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/service/user.service';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private userService:UserService
    ,private dialog:MatDialog) { }
  displayedColumns: string[] = ['firstName','lastName','email','userStatus','userType','stream','phoneNumber','actions']
  @Input() dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
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
