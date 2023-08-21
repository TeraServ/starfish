import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/service/user.service';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { user } from 'src/model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {


  users!: user[];
  filterSelectObj: any[] = [];
  filterValues: any[] = [];
  ReadMore: boolean = true
  //hiding info box
  visible: boolean = false;
  showPaginator: boolean = false;

  constructor(private userService:UserService
    ,private dialog:MatDialog) { }
  displayedColumns: string[] = ['firstName','lastName','email','userStatus','userType','stream','phoneNumber','category','actions']

  @Input() dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {


  }
  ngOnInit(): void {
    this.getAllUsers()
    const deptData = this.userService.getAllUser();
    console.log(deptData, "deptdata")
    this.dataSource.filterPredicate = this.createFilter();
    this.loadUserStream();
  }

  // showPaginator(){
  //   console.log("data length",this.dataSource.data.length)
  //   return this.dataSource.data?.length>5
    
    
  // }

  onUpdateClicked(data: any) {
    this.dialog.open(UserUpdateComponent, {
      width: "500px",
      data: data,
    }).afterClosed().subscribe(data => {
      this.getAllUsers()
    })
  }

  //onclick toggling both
  ontoggleclick() {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
  }
  togglePaginator() {
    this.showPaginator = !this.showPaginator;
  }
  loadUserStream(){
    this.userService.getAllUserStream().subscribe(data=>
      console.log(data));
  }


  getAllUsers() {
    this.userService.getAllUser().subscribe(data => {
      console.log(data)
      this.dataSource.data = data;
      this.users = data;

      if (this.dataSource.data?.length >= 5) {
        this.dataSource.paginator = this.paginator;
        this.showPaginator=true
        
      }
      // this.filterSelectObj[0].options = data.map((user: { stream: { id: any; streamName: any; }; }) => {
      //   return {
      //     id: user.stream.id,
      //     name: user.stream.streamName
      //   };
      // });
      // this.filterSelectObj[1].options = data.map((user: { id: any; userStatus: any; }) => {
      //   return {
      //     id: user.id,
      //     name: user.userStatus
      //   };
      // });
      // this.filterSelectObj[2].options = data.map((user: { id: any; userType: any; }) => {
      //   return {
      //     id: user.id,
      //     name: user.userType
      //   };
      // });
    }, err => {
      console.log(err);
    })
  }
  
  getFilterObject(fullObj: any, key: string | number) {
    const uniqChk: any[] = [];
    fullObj.filter((obj: { [x: string]: any; }) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }
  // filterChange(filter: any, event: any) {
  //   console.log("fjffjfh", filter, this.dataSource.data);
  //   if (filter.columnProp == "stream") {
  //     this.dataSource.data = this.users.filter(item => item.stream.id.toString() === filter.modelValue || filter.modelValue === '');
  //     console.log("if", this.dataSource.data);
  //   }
  //   else if (filter.columnProp == "userStatus") {
  //     this.dataSource.data = this.users.filter(item => item.id.toString() === filter.modelValue || filter.modelValue === '');
  //     console.log("if", this.dataSource.data);

  //   }
  //   else if (filter.columnProp == "userType") {
  //     this.dataSource.data = this.users.filter(item => item.id.toString() === filter.modelValue || filter.modelValue === '');
  //     console.log("if", this.dataSource.data);

  //   }


  // }


  //search for firstname

  filterFirstNameTable(input: string | any) {
    console.log(input.target.value)
    this.dataSource.filterPredicate = (data: user, f: string) =>
      !f ||
      data.firstName.toLowerCase().includes(f) ||
      data.firstName.toLowerCase().includes(f.toLowerCase());

    input = input.target.value?.trim(); // Remove whitespace
    input = input?.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = input;
  }

  //search for Email
  filterEmailTable(input: string | any) {
    console.log(input.target.value);
    this.dataSource.filterPredicate = (data: user, f: string) =>
      !f ||
      data.email.toLowerCase().includes(f) ||
      data.email.toLowerCase().includes(f.toLowerCase());

    input = input.target.value?.trim(); // Remove whitespace
    input = input?.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = input;
  }

  //search for phonenumber
  filterPhoneNumberTable(input: number | any) {
    console.log(input.target.value)
    this.dataSource.filterPredicate = (data: user, f: string) =>
      !f ||
      data.phoneNumber.toString().includes(input.target.value)
    this.dataSource.filter = input.target.value;
  }
  //search for User Status
  filterUserStatusTable(input: string | any) {
    console.log(input.target.value);
    this.dataSource.filterPredicate = (data: user, f: string) =>
      !f ||
      data.userStatus == input.target.value;
    this.dataSource.filter = input.target.value;
  }

  //search for User Type
  filterUserTypeTable(input: string | any) {
    console.log(input.target.value);
    this.dataSource.filterPredicate = (data: user, f: string) =>
      !f ||
      data.userType == input.target.value;
    this.dataSource.filter = input.target.value;
  }

  //search for Streams
  filterStreamTable(input: string | any) {
    console.log(input.target.value)
    this.dataSource.filterPredicate = (data: user, f: string) =>
      !f ||
      data.stream.streamName == input.target.value;
    this.dataSource.filter = input.target.value;
  }



  //search for category

  filtercategoryTable(input: string | any) {
    console.log(input.target.value);
    this.dataSource.filterPredicate = (data: user, f: string) =>
      !f ||
      data.category == input.target.value;
    this.dataSource.filter = input.target.value;
  }

  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col]
              .trim()
              .toLowerCase()
              .split(' ')
              .forEach((word: any) => {
                if (
                  data[col]
                    .toString()
                    .toLowerCase()
                    .indexOf(word) != -1 &&
                  isFilterSet
                ) {
                  found = true;
                }
              });
          }
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
    return filterFunction;
  }

}
