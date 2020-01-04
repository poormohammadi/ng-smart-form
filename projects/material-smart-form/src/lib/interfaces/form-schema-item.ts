import { ValidatorFn } from '@angular/forms';

import { DateFormat } from './date-format.enum';
import { Dir } from './dir.enum';
import { FormFieldTypes } from './form-field-types.enum';
import { OptionValueLabels } from './option-value-labels';
import { TimeFormat } from './time-format.enum';

export interface FormSchemaItem {
  type: FormFieldTypes;
  placeholder?: string;
  options?: any[];
  disabled?: boolean;
  optionValueLabels?: OptionValueLabels;
  multiple?: boolean;
  validators?: ValidatorFn[];
  dir?: Dir;
  onChange?: (e: any) => any;
  onSearch?: (e: any) => any;
  dateOutputFormat?: DateFormat;
  hint?: string;
  isNewLine?: boolean;
  required?: boolean;
  additionalInfo?: any;
  outputFormat?: TimeFormat;
  showSeparators?: boolean;
  grow?: 1 | 2 | 3 | 4;
}
