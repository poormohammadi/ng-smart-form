import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { FormFieldTypes } from '../../../interfaces/form-field-types.enum';
import { FormControlStatus } from '../../../interfaces/form-control-status.enum';
import { OptionValueLabels } from '../../../interfaces/option-value-labels';

@Component({
  selector: 'lib-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteInputComponent),
      multi: true
    }
  ]
})
export class AutocompleteInputComponent implements ControlValueAccessor, OnInit, OnChanges {

  options2: string[];
  shouldAddOnBlur: boolean;

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
  @Input() dir: 'ltr' | 'rtl' = 'ltr';
  @Input() hint: string;
  @Input() name: string;
  @Input() formControl: FormControl;
  @Input() required: boolean;
  @Input() errorMatcher: ErrorStateMatcher;
  @Input() options: object;
  @Input() multiple: boolean = true;
  @Input() optionValueLabels: OptionValueLabels;

  @Output() change = new EventEmitter();
  @Output() search = new EventEmitter();

  @ViewChild('autoCompleteInput', {static: false}) autoCompleteInput;

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

  selected(e) {
    if (this.multiple) {
      // should be cleaner
      const found = this.value.find(item => {
        return e.option ? item === e.option.value : item === e.value;
      });
      const isEmpty = e.option ? e.option.value === '' : e.value === '';

      if (found) {
        if (e.option) {
          this.remove(e.option.value);
        } else {
          this.remove(e.value);
        }
      }
      if (this.value.length < 1) {
        this.value = [];
      }
      if (!isEmpty) {
        if (e.option) {
          if (e.option.value) {
            this.value.push(e.option.value);
            // this.options = [];
          }
        } else {
          this.value.push(e.value);
        }
      }

      this.autoCompleteInput.nativeElement.value = null;

    } else {
      if (e.option) {
        if (e.option.value) {
          this.value = e.option.value;
          // this.options = [];
        }
      } else {
        this.value = e.value;
      }
    }

    this.change.emit(this.value);
  }

  remove(e) {
    if (this.multiple) {
      this.value.splice(this.value.indexOf(e), 1);
    } else {
      this.value = null;
    }
  }

  input(e) {
    const textInputed = this.autoCompleteInput.nativeElement.value;
    if (!textInputed) {
      this.shouldAddOnBlur = false;
    } else {
      this.shouldAddOnBlur = true;
    }
    this.search.emit(e.target.value);
  }

  blur(e) {
    const textInputed = this.autoCompleteInput.nativeElement.value;
    if (!textInputed) {
      this.shouldAddOnBlur = false;
    } else {
      this.shouldAddOnBlur = true;
    }
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this.options2 = this.options ? Object.keys(this.options) : null;
    }
  }
}
