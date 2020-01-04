import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

import { Dir } from '../../../interfaces/dir.enum';
import { FormControlStatus } from '../../../interfaces/form-control-status.enum';


const noop = () => { };

@Component({
  selector: 'lib-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})
export class TextAreaComponent implements ControlValueAccessor, OnInit, OnChanges {

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

  @Input() placeholder: string;
  @Input() status: FormControlStatus;
  @Input() disabled = false;
  @Input() dir: Dir = Dir.Ltr;
  @Input() hint: string;
  @Input() name: string;
  @Input() formControl: FormControl;
  @Input() required: boolean;
  @Input() errorMatcher: ErrorStateMatcher;

  FormControlStatus: typeof FormControlStatus = FormControlStatus;

  constructor() { }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

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

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
