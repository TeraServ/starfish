import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlphabeticSortPipe } from 'src/app/pipes/alphabetic-sort.pipe';
import { CustomeArraySortPipe } from 'src/app/custome-array-sort.pipe';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';



@NgModule({
  declarations: [
    AlphabeticSortPipe,
    CustomeArraySortPipe,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AlphabeticSortPipe,
    CustomeArraySortPipe,
    SafeHtmlPipe
  ]
})
export class SharedElementModule { }
