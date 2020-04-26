import { Component } from '@angular/core';
import { FormFieldTypes } from 'projects/material-smart-form/src/lib/interfaces/form-field-types.enum';
import { FormSchema } from 'projects/material-smart-form/src/lib/interfaces/form-schema';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  schema: FormSchema = {
    name: {
      type: FormFieldTypes.Text,
    },
    lastName: {
      type: FormFieldTypes.Text,
    }
  };

  values = {
    name: 'hi',
    lastName: 'ho'
  };

  change = console.log;
}
