import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
@Injectable()
export class WeekviewFilterPipe implements PipeTransform {
  transform(value: any[], args: string[], args1: any): any {
    let filter = args.toString().toLowerCase();
    let temp = args1;
    return filter ? value.filter(day => day.Task.toString().toLowerCase().indexOf(filter) != -1) : value;
  }



}
// filter:listFilter.value