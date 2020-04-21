import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlStatus } from '../../../interfaces/form-control-status.enum';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'lib-van-plate-number-input',
  templateUrl: './van-plate-number-input.component.html',
  styleUrls: ['./van-plate-number-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VanPlateNumberInputComponent),
      multi: true
    },
  ]
})
export class VanPlateNumberInputComponent implements ControlValueAccessor, OnInit {
  // TODO: refactor this component using material custom form fields
  private innerValue: string = '';
  get value(): string {
    return this.innerValue;
  }
  set value(v: string) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
    this.isValid = this.errorMatcher.formControl.status === FormControlStatus.Valid;
  }

  readonly persianLetters = ['ا', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'ژ', 'س', 'ش',
    'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'و', 'ه', 'ی'];

  @Input() placeholder: string;
  @Input() status: FormControlStatus;
  @Input() hint: string;
  @Input() name: string;
  @Input() formControl: FormControl;
  @Input() required: boolean;
  @Input() errorMatcher;

  isFocused: boolean = true;
  isValid: boolean = this.required;
  FormControlStatus = FormControlStatus;
  first: string = null;
  second: string = null;
  third: string = null;
  fourth: string = null;


  constructor() { }

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
    this.updatePartsWithValue();
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  // vanPlate
  updateVanPlate() {
    const first = this.first || '';
    const second = this.second || '';
    const third = this.third || '';
    const fourth = this.fourth || '';

    this.value =
      first +
      '-' +
      second +
      '-' +
      third +
      '-' +
      fourth;
  }

  // reset
  reset() {
    this.value = null;

    this.first = null;
    this.second = null;
    this.third = null;
    this.fourth = null;
  }

  updatePartsWithValue() {
    if (this.value) {
      const first = this.value.split('-')[0] || '';
      const second = this.value.split('-')[1] || '';
      const third = this.value.split('-')[2] || '';
      const fourth = this.value.split('-')[3] || '';
      this.first = first;
      this.second = second;
      this.third = third;
      this.fourth = fourth;
    }
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
    this.isValid = this.errorMatcher.formControl.status === FormControlStatus.Valid;
  }
}
