import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { UserDetail } from 'app/models/user-detail.model';

@Component({
  selector: 'app-view-and-search',
  templateUrl: './view-and-search.component.html',
  styleUrls: ['./view-and-search.component.scss']
})
export class ViewAndSearchComponent implements OnInit {
  @Input() tableItem:any;
  @Output() edit = new EventEmitter();
  // tableItem={
  //   headers:string[],
  //   userDetails:UserDetail[],
      // editAction:boolean
  // }
  // [table.headers] table.tableDetails
  headers=['First Name','Last Name','Phone Number','E-mail','User Type','Stream','Category','Status','Action'];
  userDetails:UserDetail[]=[];
  hasEditButton:boolean = true;
  tableHeader: String= 'Users'
  
  tableDetails=[
    {
  firstName:  'Lavanya',
  lastName:  'MS',
  PhoneNumber:  '9090909090',
  eMail:  'lavanya@mail.com',
  userType:  'Faculty',
  stream:  'CSE',
  category: 'Online',
  status: 'Active'
    },
    {
      firstName: 'Alan',
      lastName: 'S',
      PhoneNumber: '99999999999',
      eMail: 'alans@mail.com',
      userType: 'Faculty',
      stream: 'IT',
      category: 'Online',
      status: 'Active'
    }

  ]
  constructor() { }
  ngOnInit(): void {
  }
  onDelete(){
    console.log('Delete Clicked');
  }
  onEdit(){
    console.log('Edit Clicked');
    this.edit.emit();
  }
  
}
