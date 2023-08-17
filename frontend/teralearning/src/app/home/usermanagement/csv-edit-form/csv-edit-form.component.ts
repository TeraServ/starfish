import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { StreamValidator } from 'src/app/custom-validators/stream-validator';


import { SnackbarNotificationService } from 'src/app/service/snackbar-notification.service';
import { StreamService } from 'src/app/service/stream.service';
import { CSVRecord } from 'src/model/csvrecord.model';



@Component({
  selector: 'app-csv-edit-form',
  templateUrl: './csv-edit-form.component.html',
  styleUrls: ['./csv-edit-form.component.scss']
})
export class CsvEditFormComponent implements OnInit {

  @Input() invalidData:CSVRecord[]=[];
  @Output() editedDataEmitter: EventEmitter<any[]> = new EventEmitter <any[]> ();
  readonly displayedColumns = ['firstName', 'lastName', 'phoneNumber', 'email', 'streamAcronym','actions'];
  csvTableForm!:FormGroup;
  dataSource:MatTableDataSource<any> = new MatTableDataSource();
  constructor( 
    private formBuilder: FormBuilder,
    public snackbar: SnackbarNotificationService,
    private _streamService: StreamService) {
      this.buildForm();
      }
      ngOnInit(){
        
        this.loadInvalidData();
        console.log(this.csvTableForm)
       
      }
  buildForm(){
      this.csvTableForm = this.formBuilder.group({
        rows: this.formBuilder.array([])});
      }

  loadInvalidData(){
    this.dataSource.data = (this.csvTableForm.get('rows') as FormArray).controls;
    this.invalidData.forEach((data)=>{
      const row = this.formBuilder.group({
        firstName: [data.firstName,Validators.required],
        lastName: [data.lastName,Validators.required],
        phoneNumber: [data.phoneNumber, Validators.pattern('[0-9]{11}')],
        email: [data.email,Validators.email],
        stream: [data.streamAcronym,StreamValidator.acronym(this._streamService.getStreamAcronym())],
        checkers: [data.checkerFlags]
      });
      (this.csvTableForm.get('rows') as FormArray).push(row);
    });
    console.log(this.dataSource)
  }


  get rows(): FormArray {
    return this.csvTableForm.get('rows') as FormArray;
  }
  onDelete(record:any, uq?:string){
    // let uniqueField: string = uq === '' ? record.email : record.uq ; 
    let index = this.invalidData.indexOf(record) ; 
    // const index = this.invalidData.findIndex(x=>x.email === uniqueField);
    if(index==(-1)){
      console.warn('Record not found in Data set:',record);
    }
    else{
      this.invalidData.splice(index,1);
      console.log('Record Deleted',record);
      this.snackbar.warning('Record Deleted Successfully');
    }
  }

 
  onRemoveRow(index:any){
    const formValues = this.csvTableForm.value;
    console.warn("Removing Row:",formValues.rows[index]);
    const uniqValue: string = formValues.rows[index].email !==null ? 'email' : formValues.rows[index].phoneNumber.length !==0 ? 'phoneNumber' : '';
    this.onDelete(formValues.rows[index], uniqValue );
    this.rows.removeAt(index);
    this.updateTable();
    this.snackbar.warning('Row Removed');
  }

addNewRow() {
  const newRow = this.formBuilder.group({
    firstName: ['',{Validators:[Validators.required,Validators.minLength(3)]}],
    lastName: [''],
    phoneNumber: [''],
    email: ['',{Validators:[Validators.required,Validators.email]}],
    stream: ['',StreamValidator.acronym(this._streamService.getStreamAcronym())],
    checkers:new Array <boolean> (false,false,false,false)
  });
  this.rows.push(newRow);
  this.updateTable();
  this.snackbar.success('Row Added');


}



submitForm() {
  console.log('Emit Data:',this.csvTableForm.value)

  this.emitData(this.csvTableForm.value.rows);
  if(this.csvTableForm.valid){
    console.log(this.csvTableForm.value.rows);
  }else{
    this.snackbar.warning('Invalid Submission');
  }
  
  // if (this.csvTableForm.valid && this.invalidData.length==0) {
  //   const formValues = this.csvTableForm.value;
  // } 
}
emitData(data:any[]){
  this.editedDataEmitter.emit(data);
}
updateTable(){
  this.dataSource._updateChangeSubscription();
  this.invalidData = this.rows.value;
}

}