import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { FormControlStatus } from '../../../interfaces/form-control-status.enum';

@Component({
  selector: 'lib-bike-plate-number-input',
  templateUrl: './bike-plate-number-input.component.html',
  styleUrls: ['./bike-plate-number-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BikePlateNumberInputComponent),
      multi: true
    }
  ]
})
export class BikePlateNumberInputComponent implements ControlValueAccessor, OnInit {

  private innerValue: string;
  get value(): string {
    return this.innerValue;
  }
  set value(v: string) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  isFocused: boolean = true;

  @Input() placeholder: string;
  @Input() status: FormControlStatus;
  @Input() hint: string;
  @Input() name: string;
  @Input() formControl: FormControl;
  @Input() required: boolean;
  @Input() errorMatcher: ErrorStateMatcher;

  FormControlStatus: typeof FormControlStatus = FormControlStatus;

  first: string = null;
  second: string = null;

  constructor() { }

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
    this.updateViewWithValue();
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  updateViewWithValue() {
    if (this.value) {
      const first = this.value.split('-')[0] || '';
      const second = this.value.split('-')[1] || '';
      this.first = first;
      this.second = second;
    }
  }

  updateBikePlate() {
    const first = this.first || '';
    const second = this.second || '';
    this.value = first + '-' + second;
  }

  reset() {
    this.value = null;
    this.first = null;
    this.second = null;
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    if (!this.value) {
      // this.isFocused = false;
    }
  }

  ngOnInit() {
  }
}
