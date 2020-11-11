import { FormControl } from '@angular/forms';


export function requiredFileType(type: string) {
  return function (control: FormControl) {
    const file = control.value;
    var extension = null;
    if (file) {
      if (file.name === undefined) {
        extension = file.file.name.split('.')[1].toLowerCase();
      }
      else {
        extension = file.name.split('.')[1].toLowerCase();
      }
      if (type.toLowerCase() !== extension.toLowerCase()) {
        return {
          requiredFileType: true
        };
      }

      return null;
    }

    return null;
  };
}
