import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatValue',
  standalone: true
})
export class FormatValuePipe implements PipeTransform {

  transform(value: any, format: string): any {
    if (value == null) return null;

    let formattedValue = value;

    switch (format) {
      case 'number':
        formattedValue = value > 0 ? '+' + value : '-' + Math.abs(value);
        break;
      case 'percentage':
        formattedValue = value + '%';
        break;
      case 'currency':
        formattedValue = '$' + value.toFixed(2);
        break;
      case 'none':
        formattedValue = value;
        break;
      case 'seconds':
        formattedValue = value  + 's';
        break;
    }

    return formattedValue;
  }

}
