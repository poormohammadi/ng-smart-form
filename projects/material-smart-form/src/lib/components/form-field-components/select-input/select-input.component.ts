import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

import { Dir } from '../../../interfaces/dir.enum';
import { FormControlStatus } from '../../../interfaces/form-control-status.enum';
import { FormFieldTypes } from '../../../interfaces/form-field-types.enum';
import { OptionValueLabels } from '../../../interfaces/option-value-labels';

@Component({
  selector: 'lib-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true
    }
  ]
})
export class SelectInputComponent implements ControlValueAccessor, OnInit, OnChanges {

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

  options2: string[];
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
  @Input() optionValueLabels: OptionValueLabels;

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

  compareFn(optionOne, optionTwo): boolean {
    if (optionOne && optionTwo) {
      if (optionOne.id) {
        return optionOne.id === optionTwo.id;
      } else {
        return optionOne === optionTwo;
      }
    }
    return false;
  }

  handleSelectChange(e: any) {
    if (this.change) {
      this.change.emit(e);
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.options) {
      this.options2 = Object.keys(this.options);
    }
  }
}
