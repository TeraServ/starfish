import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CSVRecord } from 'app/models/csvrecord.model';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-csv-form',
  templateUrl: './csv-form.component.html',
  styleUrls: ['./csv-form.component.scss']
})
export class CsvFormComponent implements OnInit {
  @Input() invalidData!:CSVRecord;
  @Output() editedData: EventEmitter<CSVRecord> = new EventEmitter <CSVRecord> ();
 
  constructor( 
    private formBuilder: FormBuilder,
    public snackbar: MatSnackBar) {
      // this.invalidData = [];
      // this.invalidData = new CSVRecord;
      this.editForm = new FormGroup({
      formArray : this.formBuilder.array([])
      
    })
   }

  ngOnInit(){
    this.editForm = new FormGroup(
      {
        firstName: new FormControl()
      }
    )
    console.log(this.invalidData)
  }
editForm: FormGroup;
editedFirstName!: string;
editedLastName!:string;
editedPhoneNumber!:string;
editedEmail!:FormControl;
editedStream!:string;
buildForm(){
  // const controlArray = this.editForm.get('formArray') as FormArray;
  // this.invalidData.forEach((item)=>{
  //   controlArray.push(
  //     this.formBuilder.group({
  //       firstName: new FormControl( )
  //     })
  //   )
  // })
}

onUpdate(){
  console.log(this.invalidData);
  // this.editedData.emit(this.invalidDataRecords)
}
onUpdateClicked(el:any){
  console.log('Update');
}

onDelete(record:any){
  let uniqueField: string = record.email 
  // const index = this.invalidData.findIndex(x=>x.email === uniqueField);
  
  // if(index==(-1)){
  //   console.warn('Record not found in Data set:',record);
  // }
  // else{
  //   this.invalidData.splice(index,1);
  //   console.log('Record Deleted',record)
  //   this.snackbar.open('Record Deleted Successfully', 'Close', {
  //     duration: 3000,
  //   });
  // }
}

}