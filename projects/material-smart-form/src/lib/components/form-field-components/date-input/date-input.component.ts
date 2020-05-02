import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateFormatPipe } from 'angular2-moment';

import { DateFormat } from '../../../interfaces/date-format.enum';
import { Dir } from '../../../interfaces/dir.enum';
import { FormControlStatus } from '../../../interfaces/form-control-status.enum';
import { FormFieldTypes } from '../../../interfaces/form-field-types.enum';

@Component({
  selector: 'ng-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent implements ControlValueAccessor, OnInit {

  private innerValue: any;
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
  @Input() dateOutputFormat: DateFormat;

  timeStamp: number;
  FormControlStatus: typeof FormControlStatus = FormControlStatus;

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

  onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    const d = new Date(new Date(event.value).toUTCString());
    const dateValue = d.getTime();
    this.timeStamp = dateValue;
    this.handleDatetimeFormat();
  }

  handleDatetimeFormat() {
    switch (this.dateOutputFormat) {
      case DateFormat.LongDateTime:
        this.value = DateFormatPipe.prototype.transform(
          this.timeStamp,
          'YYYY-MM-DD HH:mm:ss'
        );
        break;
      case DateFormat.LongDateShortTime:
        this.value = DateFormatPipe.prototype.transform(
          this.timeStamp,
          'YYYY-MM-DD HH:mm'
        );
        break;
      case DateFormat.Date:
        this.value = DateFormatPipe.prototype.transform(
          this.timeStamp,
          'YYYY-MM-DD'
        );
        break;
      case DateFormat.FormattedDateTime:
        this.value = DateFormatPipe.prototype.transform(
          this.timeStamp,
          'YYYY-MM-DD HH:mm:ss'
        ).split(' ').join('T');
        break;
      default:
        this.value = this.timeStamp;
    }
  }

  isoString(value: number) {
    if (value) {
      return new Date(value).toISOString();
    }
    return null;
  }

  reset() {
    this.value = null;
  }

  ngOnInit() { }
}
