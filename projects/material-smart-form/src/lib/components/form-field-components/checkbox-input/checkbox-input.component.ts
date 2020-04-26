import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Dir } from '../../../interfaces/dir.enum';
import { FormControlStatus } from '../../../interfaces/form-control-status.enum';
import { FormFieldTypes } from '../../../interfaces/form-field-types.enum';
import { OptionValueLabels } from '../../../interfaces/option-value-labels';


@Component({
  selector: 'ng-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxInputComponent),
      multi: true
    }
  ]
})
export class CheckboxInputComponent implements ControlValueAccessor, OnInit {

  private innerValue: any = null;
  get value(): any {
    return this.innerValue;
  }
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  @Input() placeholder: string;
  @Input() type: FormFieldTypes;
  @Input() status: FormControlStatus;
  @Input() disabled = false;
  @Input() dir: Dir = Dir.Ltr;
  @Input() hint: string;
  @Input() name: string;
  @Input() formControl: FormControl;
  @Input() required: boolean;
  @Input() errorMatcher: ErrorStateMatcher;
  @Input() options: object;
  @Input() multiple: boolean;
  @Input() optionKeyValues: OptionValueLabels;

  @Output() change = new EventEmitter();

  FormControlStatus: typeof FormControlStatus = FormControlStatus;
  objectKeys = Object.keys;

  constructor() { }

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  handleSelectChange(e: any) {
    if (this.change) {
      this.change.emit(e);
    }
  }

  ngOnInit() {
  }
}
