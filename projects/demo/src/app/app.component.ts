import { Component } from '@angular/core';
import { FormFieldTypes, FormSchema } from 'projects/material-smart-form/src/public-api';

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
