import { Component, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { DateFormat } from '../../interfaces/date-format.enum';
import { Dir } from '../../interfaces/dir.enum';
import { FormControlStatus } from '../../interfaces/form-control-status.enum';
import { FormFieldTypes } from '../../interfaces/form-field-types.enum';
import { OptionValueLabels } from '../../interfaces/option-value-labels';
import { TimeFormat } from '../../interfaces/time-format.enum';

@Component({
  selector: 'lib-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }
  ]
})

export class FormFieldComponent implements ControlValueAccessor, ErrorStateMatcher, OnInit {

  timeStamp: number;
  errors: string[];

  private innerValue: any;
  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  @Input() placeholder: string;
  @Input() type: FormFieldTypes;
  @Input() options: object;
  @Input() multiple: boolean;
  @Input() optionValueLabels: OptionValueLabels;
  @Input() disabled = false;
  @Input() dir: Dir = Dir.Ltr;
  @Input() hint: string;
  @Input() dateOutputFormat: DateFormat;
  @Input() outputFormat: TimeFormat;
  @Input() name: string;
  @Input() formControl: FormControl;
  @Input() required: boolean;

  @Output() change = new EventEmitter();
  @Output() search = new EventEmitter();

  @HostBinding('class.hidden') hidden: boolean;
  types = FormFieldTypes;
  FormControlStatus = FormControlStatus;

  constructor() { }

  // // Placeholders for the callbacks which are later providesd
  // // by the Control Value Accessor
  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = (v) => () => {};

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  // ErrorStateMatcher for vaidation errors
  isErrorState(): boolean {
    const control = this.formControl;
    return !!(control && control.invalid);
  }

  ngOnInit() {
    this.hidden = this.type === FormFieldTypes.Hidden;
  }
}
