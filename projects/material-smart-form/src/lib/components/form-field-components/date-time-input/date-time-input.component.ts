import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher, MatDatepickerInputEvent } from '@angular/material';
import { DateFormatPipe } from 'angular2-moment';

import { DateFormat } from '../../../interfaces/date-format.enum';
import { Dir } from '../../../interfaces/dir.enum';
import { FormControlStatus } from '../../../interfaces/form-control-status.enum';
import { FormFieldTypes } from '../../../interfaces/form-field-types.enum';


@Component({
  selector: 'lib-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeInputComponent),
      multi: true
    }
  ]
})
export class DateTimeInputComponent implements ControlValueAccessor, OnInit {

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
    this.timeStamp = dateValue + this.timeOfDayInMill(this.timeStamp);
    this.handleDatetimeFormat();
  }

  onTimeChange(e) {
    const hourMinuteValue = e.target.valueAsNumber;
    this.timeStamp = this.startOfDay(this.timeStamp) + hourMinuteValue;
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

  isoString(value: number): string {
    if (value) {
      return new Date(value).toISOString();
    }
    return null;
  }

  startOfDay(timeStamp: number): number {
    return new Date(timeStamp).setHours(0, 0, 0, 0);
  }

  timeOfDayInMill(timeStamp: number): number {
    timeStamp = new Date(timeStamp).getTime();
    if (timeStamp) {
      const timeOfDay = parseInt(timeStamp.toString(), 10) - this.startOfDay(timeStamp);
      return timeOfDay;
    }
    return null;
  }

  reset() {
    this.value = null;
  }

  ngOnInit() { }
}
