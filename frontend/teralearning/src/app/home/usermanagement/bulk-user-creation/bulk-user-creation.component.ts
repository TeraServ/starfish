
import { first } from 'rxjs';
import { Component, OnInit  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import { read, utils } from 'xlsx';
import { CSVRecord } from 'src/model/csvrecord.model';
import { MatDialog } from '@angular/material/dialog';
import { user } from 'src/model/user.model';
import { CSVHandlerService } from 'src/app/core/services/csvhandler.service';
import { CustomValidatorService } from 'src/app/core/services/custom-validator.service';
import { UserService } from 'src/app/service/user.service';
import { PasswordService } from 'src/app/core/services/password.service';
import { SuccessDialogComponent } from 'src/app/dialogBoxs/success-dialog/success-dialog.component';
import { StreamService } from 'src/app/service/stream.service';
import { Stream } from 'src/model/stream.model';




@Component({
  selector: 'app-bulk-user-creation',
  templateUrl: './bulk-user-creation.component.html',
  styleUrls: ['./bulk-user-creation.component.scss']
})
export class BulkUserCreationComponent implements OnInit {

  constructor(private csvService: CSVHandlerService, 
    private customValidator: CustomValidatorService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private streamService : StreamService,
    private passwordService: PasswordService,
    private dialog: MatDialog,
    public snackbar: MatSnackBar) {
      this.editForm = new FormGroup({
        formArray : this.formBuilder.array([])
      })
     }

  ngOnInit(): void {
    this.pageReset();
  }
  ngOnChanges(){
    this.onValidate(this.invalidData);
  }

  dataFromCSV!: any[]
  validatedData!: CSVRecord[];
  invalidData!: CSVRecord[];
  hasInvalidEntry!: boolean;
  duplicateEntry!: number; 
  validStreamAcronym:string[]=[];
  private readonly csvHeaders= [[
    'firstName',
    'lastName',
    'phoneNumber',
    'email',
    'stream'
]];
private readonly userStatus:number = 103;
private readonly userType: number = 102;
private readonly exportFileName: string = 'Bulk Create User';
private readonly category: string = "classroom";
streamList:Stream[]=[];
editForm: FormGroup;

foundStream!:Stream | any;

pageReset(){
  this.dataFromCSV = [];
  this.validatedData = [];
  this.invalidData = [];
  this.hasInvalidEntry= false;
  this.duplicateEntry = 0 ;
  this.getAcronymFromStreamList();
}

getAcronymFromStreamList(){
  this.streamService.getStreamList().subscribe(data => {
    this.streamList= data;
    data.forEach(stream=>{
     this.validStreamAcronym.push(stream.acronym);
    })
   })
}


    handleImport($event: any) {
      // this.dataFromCSV = this.csvService.importCSVData($event);
    this.pageReset();
      const files = $event.target.files;
      if (files.length) {
          const file = files[0];
          const reader = new FileReader();
          reader.onload = (event: any) => {
              const wb = read(event.target.result);
              const sheets = wb.SheetNames;

              if (sheets.length) {
                  const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                  this.dataFromCSV = rows;
                  // console.log(rows)
                  if(this.dataFromCSV.length!=0){
                    this.onValidate(this.dataFromCSV);
                  }
              }
          }
          reader.readAsArrayBuffer(file);
      }
    }


    handleSampleCSVDownload() {
      this.csvService.exportCSV(this.csvHeaders,[0], this.exportFileName);
    }
  
    onValidate(dataset:any){
     dataset.forEach((data:any)=>{this.validateRecord(data)});
    }
    validateRecord(data:any){
      let hasName :boolean = (data.hasOwnProperty('firstName') && ( data.firstName != null && data.firstName != undefined) && data.firstName.length !== 0 && data.firstName !=="") && (data.hasOwnProperty('lastName') && (data.lastName != null && data.lastName !=undefined)&& data.lastName.length !== 0 ); 
      let hasPhoneNumber : boolean = (data.hasOwnProperty('phoneNumber') && (data.phoneNumber !=null && data.phoneNumber != undefined) && data.phoneNumber.length !== 0);
      let hasEmail :boolean = (data.hasOwnProperty('email') && (data.email !=null && data.email != undefined) && data.email.length !==0 && data.email !=="");
      let hasStream : boolean = data.hasOwnProperty('stream') && (data.stream != null && data.stream != undefined) && (data.stream.length !==0 && data.stream !=="");
      let hasValidEmail: boolean = this.customValidator.emailValidator(data.email);
      let hasValidPhoneNumber: boolean = this.customValidator.phoneNumberValidator(data.phoneNumber);
      let hasValidStream: boolean = this.validStreamAcronym.includes(data.stream);
      let csvRecord: CSVRecord = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        streamAcronym: data.stream,
        checkerFlags:[hasName,(hasPhoneNumber && hasValidPhoneNumber),(hasEmail && hasValidEmail),(hasStream && hasValidStream)]
      }
      if((!hasName) || (!hasPhoneNumber) ||  (!hasEmail) || (!hasStream)){
        // console.log("Null Entry:",csvRecord);
        this.hasInvalidEntry = true;
        this.addDataToInvalidRecord(csvRecord);
      }
      else if (hasName &&  (!hasValidEmail || !hasValidPhoneNumber || !hasValidStream)){
        // console.log("Invalid Entry:",csvRecord);
        this.hasInvalidEntry = true;
        this.addDataToInvalidRecord(csvRecord);
      }
      else if ((hasName && hasValidEmail && hasValidPhoneNumber && hasValidStream) && (this.validatedData.includes(csvRecord) || this.invalidData.includes(csvRecord))){
        // console.log("Valid Entry:",csvRecord);
        this.hasInvalidEntry = true;
        this.addDataToInvalidRecord(csvRecord);
      }
      else if ((hasName && hasValidEmail && hasValidPhoneNumber && hasValidStream) || !this.validatedData.includes(csvRecord)){
        this.hasInvalidEntry = false;
        this.addDataToValidRecord(csvRecord);
      }}
    
      addDataToValidRecord(data:CSVRecord){
        this.validatedData.findIndex(x => x.email === data.email) === -1 ?
        this.validatedData.push(data):this.updateValidRecord(data);
      }
      updateValidRecord(data:CSVRecord){
        let index = this.validatedData.indexOf(data);
        this.validatedData[index] = data;
      }
      addDataToInvalidRecord(data:CSVRecord){
       // this.invalidData.findIndex(x=> x.email === data.email) == -1 ?
        this.invalidData.push(data)
      }
      // updateInvalidRecord(data:any){
      //   let index = this.invalidData.indexOf(data);
      //   this.invalidData[index] = data;
      //   this.invalidEntry--;
      // }
      onDelete(record:any){
        let uniqueField: string = record.email 
        const index = this.invalidData.findIndex(x=>x.email === uniqueField);
        
        if(index==(-1)){
          console.warn('Record not found in Data set:',record);
        }
        else{
          this.invalidData.splice(index,1);
          console.log('Record Deleted',record)
          this.snackbar.open('Record Deleted Successfully', 'Close', {
            duration: 3000,
          });
        }
      }
      onDataEmitted(editedData: any[]){
        this.invalidData =[];
        this.onValidate(editedData);
        console.log(editedData);
        this.onSubmit();
      }
      csvRecordToUserList(records: CSVRecord[]): user[] {
        const userList: user[]=[];
        records.forEach(async record=>{
          let user: user = {
            id:0,
            firstName: record.firstName,
            lastName:record.lastName,
            userStatus: this.userStatus,
            userType: this.userType,
            modifiedDate:"",
            email:record.email,
            phoneNumber: parseInt(record.phoneNumber),
            category: this.category,
            stream:this.getStreamFromAcronym(record.streamAcronym),
            password:this.passwordService.generatePassword(10),
            createdDate:""
          }
          userList.push(user)
        })
        return userList;
      }
     getStreamFromAcronym(acronymName:string){
      let stream;
        this.streamList.forEach(value=>{
          if(value.acronym == acronymName){
            console.log(value)
           stream =  value;
            
          }
        })
        return stream;
      }

    onSubmit(){
      console.log('Validated Data:',this.validatedData);
      console.log('Invalid Data:',this.invalidData);
      if(this.validatedData.length!=0 && this.invalidData.length==0){     
        this.userService.bulkUserCreate(this.csvRecordToUserList(this.validatedData)).subscribe(data=>{
        },err=>{
          console.log(err);
          if(err.error == 201){
            this.dialog.open(SuccessDialogComponent,{data:"Successfully created !"})
            this.pageReset();
            // window.location.reload();
          }
          else{
            this.snackbar.open(err.error.text,'Close',{duration:1000 });
            this.dialog.open(SuccessDialogComponent,{data:"Successfully created !"})
            // window.location.reload();
          }
        }) 
        console.log(this.csvRecordToUserList(this.validatedData));
      }
      else{
        this.snackbar.open('Invalid Entry','Close',{duration:1000 });
      }
    }



  
}