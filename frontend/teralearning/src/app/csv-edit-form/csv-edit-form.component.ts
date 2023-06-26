import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CSVRecord } from 'app/models/csvrecord.model';

@Component({
  selector: 'app-csv-edit-form',
  templateUrl: './csv-edit-form.component.html',
  styleUrls: ['./csv-edit-form.component.scss']
})
export class CsvEditFormComponent implements OnInit {

  @Input() invalidData:CSVRecord[]=[];
  @Output() editedDataEmitter: EventEmitter<any[]> = new EventEmitter <any[]> ();
  csvTableForm!:FormGroup;
  touchedRows: any;
  constructor( 
    private formBuilder: FormBuilder,
    public snackbar: MatSnackBar) {
      this.csvTableForm = this.formBuilder.group({
        rows: this.formBuilder.array([])});
      }


  ngOnInit(){
    console.log(this.invalidData);
    this.invalidData.forEach((data)=>{
      const row = this.formBuilder.group({
        firstName: [data.firstName,Validators.required],
        lastName: [data.lastName],
        phoneNumber: [data.phoneNumber, Validators.pattern('[0-9]{11}')],
        email: [data.email,Validators.email],
        stream: [data.streamAcronym, Validators.pattern('[A-Za-z]{3}')],
        checkers: [data.checkerFlags]
      });
      (this.csvTableForm.get('rows') as FormArray).push(row);
    });

  }
 
onDelete(record:any, uq?:string){
  let uniqueField: string = uq === '' ? record.email : record.uq ; 
  let index = this.invalidData.indexOf(record) ; 
  // const index = this.invalidData.findIndex(x=>x.email === uniqueField);
  if(index==(-1)){
    console.warn('Record not found in Data set:',record);
  }
  else{
    this.invalidData.splice(index,1);
    console.log('Record Deleted',record);
    this.snackbar.open('Record Deleted Successfully', 'Close', {
      duration: 3000,
    });
  }
}
 
get rows(): FormArray {
  return this.csvTableForm.get('rows') as FormArray;
}
addNewRow() {
  const newRow = this.formBuilder.group({
    firstName: ['',{Validators:[Validators.required,Validators.minLength(5)]}],
    lastName: [''],
    phoneNumber: [''],
    email: ['',{Validators:[Validators.required,Validators.email]}],
    stream: ['']
  });

  this.rows.push(newRow);
  this.snackbar.open('New Row Added', 'Close', {
    verticalPosition: 'top',
    horizontalPosition:'right',
    duration: 3000,
  });
}

removeRow(index: number) {
  const formValues = this.csvTableForm.value;
  console.warn("Removing Row:",formValues.rows[index]);
  const uniqValue: string = formValues.rows[index].email !==null ? 'email' : formValues.rows[index].phoneNumber.length !==0 ? 'phoneNumber' : '';
  this.onDelete(formValues.rows[index], uniqValue );
  this.rows.removeAt(index);
  this.snackbar.open('Row Removed', 'Close', {
    duration: 3000,
  });
}

submitForm() {
  this.emitData(this.csvTableForm.value.rows);
  // if (this.csvTableForm.valid && this.invalidData.length==0) {
  //   const formValues = this.csvTableForm.value;
  // } else {
  //   this.snackbar.open('Invalid Submission', 'Close', {
  //     duration: 3000,
  //   });
  
}
emitData(data:any[]){
  this.editedDataEmitter.emit(data);
}

}