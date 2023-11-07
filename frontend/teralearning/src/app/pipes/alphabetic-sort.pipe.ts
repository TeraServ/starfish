import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphabeticSort'
})
export class AlphabeticSortPipe implements PipeTransform {

  transform(value: string[], ascending = true): string[] {
    return [...value].sort((a,b)=>{
      a = a.toLowerCase();
      b = b.toLowerCase();
      return ascending ? a.localeCompare(b) : b.localeCompare(a);
    })
  }

}
