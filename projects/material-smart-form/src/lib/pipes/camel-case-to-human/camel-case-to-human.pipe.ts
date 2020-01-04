import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToHuman'
})
export class CamelCaseToHumanPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return value.replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase());
    }
    return;
  }

}
