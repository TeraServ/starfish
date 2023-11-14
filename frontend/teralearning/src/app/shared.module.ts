import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlphabeticSortPipe } from './pipes/alphabetic-sort.pipe';
import { CustomeArraySortPipe } from './custome-array-sort.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { CacheResultPipe } from './pipes/cache-result.pipe';



@NgModule({
  declarations: [
    
    SafeHtmlPipe,
    CacheResultPipe,
    AlphabeticSortPipe,
    CustomeArraySortPipe
    
  ],
  exports:[
    
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
