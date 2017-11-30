import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class EmpFilterPipe implements PipeTransform {
  transform(value: any, args: string[], args1: any): any {
    let filter = args.toString().toLowerCase();
    let temp = args1;
    return filter ? value.filter(invoice => invoice.FirstName.toString().toLowerCase().indexOf(filter) != -1) : value;
  }

}