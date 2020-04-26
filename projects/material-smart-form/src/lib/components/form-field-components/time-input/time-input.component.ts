import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as moment_ from 'jalali-moment';

import { Dir } from '../../../interfaces/dir.enum';
import { FormControlStatus } from '../../../interfaces/form-control-status.enum';
import { FormFieldTypes } from '../../../interfaces/form-field-types.enum';
import { TimeFormat } from '../../../interfaces/time-format.enum';

const moment = moment_;

@Component({
  selector: 'ng-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeInputComponent),
      multi: true
    }
  ]
})
export class TimeInputComponent implements ControlValueAccessor, OnInit {

  private innerValue: string = '00:00:00';
  get value(): string {
    return this.innerValue;
  }
  set value(v: string) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(this.innerValue);
    }
  }

  FormControlStatus: typeof FormControlStatus = FormControlStatus;

  @Input() placeholder: string;
  @Input() type: FormFieldTypes;
  @Input() status: FormControlStatus;
  @Input() disabled = false;
  @Input() dir: Dir = Dir.Ltr;
  @Input() hint: string;
  @Input() name: string;
  @Input() formControl: FormControl;
  @Input() required: boolean;
  @Input() outputFormat: TimeFormat;
  @Input() errorMatcher: ErrorStateMatcher;

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

  blur(e: any) {
    switch (this.outputFormat) {
      case TimeFormat.ShortTime: {
        this.value = e.target.valueAsNumber != null ? moment(e.target.valueAsNumber).utc().format('HH:mm') : null;
        break;
      }
      case TimeFormat.LongTime: {
        this.value = e.target.valueAsNumber != null ? moment(e.target.valueAsNumber).utc().format('HH:mm:ss') : null;
        break;
      }
      default: {
        this.value = e.target.valueAsNumber != null ? moment(e.target.valueAsNumber).utc().format('HH:mm:ss') : null;
        break;
      }
    }
  }

  ngOnInit() {
  }
}
