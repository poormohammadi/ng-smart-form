import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  BikePlateNumberInputComponent,
} from './components/form-field-components/bike-plate-number-input/bike-plate-number-input.component';
import { CheckboxInputComponent } from './components/form-field-components/checkbox-input/checkbox-input.component';
import { DateInputComponent } from './components/form-field-components/date-input/date-input.component';
import { DateTimeInputComponent } from './components/form-field-components/date-time-input/date-time-input.component';
import { FileInputComponent } from './components/form-field-components/file-input/file-input.component';
import {
  AutocompleteInputComponent,
} from './components/form-field-components/multiple-autocomplete-input/autocomplete-input.component';
import { NumberInputComponent } from './components/form-field-components/number-input/number-input.component';
import { SelectInputComponent } from './components/form-field-components/select-input/select-input.component';
import { TextAreaComponent } from './components/form-field-components/text-area/text-area.component';
import { TextInputComponent } from './components/form-field-components/text-input/text-input.component';
import { TimeInputComponent } from './components/form-field-components/time-input/time-input.component';
import {
  VanPlateNumberInputComponent,
} from './components/form-field-components/van-plate-number-input/van-plate-number-input.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { MaterialModule } from './material/material.module';
import { CamelCaseToHumanPipe } from './pipes/camel-case-to-human/camel-case-to-human.pipe';
import { SmartFormComponent } from './components/smart-form/smart-form.component';


@NgModule({
  declarations: [
    FormFieldComponent,
    TextInputComponent,
    TextAreaComponent,
    CheckboxInputComponent,
    DateInputComponent,
    DateTimeInputComponent,
    FileInputComponent,
    AutocompleteInputComponent,
    NumberInputComponent,
    SelectInputComponent,
    TimeInputComponent,
    VanPlateNumberInputComponent,
    BikePlateNumberInputComponent,
    CamelCaseToHumanPipe,
    SmartFormComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [SmartFormComponent]
})
export class MaterialSmartFormModule { }
