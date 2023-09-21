import { Pipe, PipeTransform } from '@angular/core';

type cacheDataType = string | number;
@Pipe({
  name: 'cacheResult',
  pure: false
})

export class CacheResultPipe implements PipeTransform {
  private cachedValue!: cacheDataType;
  //Memoized Pipes to improve performance
  transform(value: cacheDataType) {
    if(!this.cachedValue){
      this.cachedValue = value;
    }
    return this.cachedValue;
  }

}
