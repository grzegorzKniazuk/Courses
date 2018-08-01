import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'surnameShortcut'
})
export class SurnameShortcutPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    } else {
      return value.charCodeAt(0) + '.';
    }
  }

}
