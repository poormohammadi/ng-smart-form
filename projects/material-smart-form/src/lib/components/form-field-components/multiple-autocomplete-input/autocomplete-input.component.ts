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
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ErrorStateMatcher } from '@angular/material/core';

import { FormControlStatus } from '../../../interfaces/form-control-status.enum';
import { FormFieldTypes } from '../../../interfaces/form-field-types.enum';
import { OptionValueLabels } from '../../../interfaces/option-value-labels';

@Component({
  selector: 'ng-autocomplete-input',
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
  label: any;

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
  @Input() options: any[];
  @Input() multiple: boolean = true;
  @Input() optionValueLabels: OptionValueLabels;

  @Output() change = new EventEmitter();
  @Output() search = new EventEmitter();

  @ViewChild('autoCompleteInput') autoCompleteInput;
  @ViewChild('matAutocomplete') matAutocomplete: MatAutocomplete;

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

  add(e: MatChipInputEvent) {
    const input = e.input;
    const value = e.value;

    if (this.matAutocomplete && !this.matAutocomplete.isOpen) {
      if (this.multiple) {

        this.value.push(value.trim());

        if (input) {
          input.value = '';
        }
      } else {
        this.value = value;
        input.value = '';
      }
    }
  }

  selected(e: MatAutocompleteSelectedEvent) {
    if (this.multiple) {
      // should be cleaner
      const itemExists = this.value.find(item => item === e.option.value);
      const isEmpty = e.option.value === '';

      if (itemExists) {
        this.remove(e.option.value);
      }

      if (this.value.length < 1) {
        this.value = [];
        this.label = [];
      }

      if (!isEmpty) {
        this.value.push(e.option.value);
        this.label.push(e.option.viewValue);
      }

      this.autoCompleteInput.nativeElement.value = null;

    } else {
      if (e.option) {
        if (e.option.value) {
          this.value = e.option.value;
          this.label = e.option.viewValue;
          // this.options = [];
        }
      } else {
        // this is because of a bug in autocomplete:
        // when user clicks on found result it does not fire select event correctly
        let foundValuesInOptions;
        if (this.optionValueLabels) {
          foundValuesInOptions = this.options.find(o => o[this.optionValueLabels.label] === e.option.value);
        } else {
          foundValuesInOptions = this.options.find(o => o === e.option.value);
        }

        this.value = foundValuesInOptions ? foundValuesInOptions.value : e.option.value;
      }
    }

    this.change.emit(this.value);
  }

  remove(e) {
    if (this.multiple) {
      const index = this.value.indexOf(e);
      this.value.splice(index, 1);
      this.label.splice(index, 1);
    } else {
      this.value = null;
      this.label = null;
    }
  }

  input(e) {
    const textInputed = this.autoCompleteInput.nativeElement.value;
    this.search.emit(e.target.value);
  }

  blur(e) {
    const textInputed = this.autoCompleteInput.nativeElement.value;
    if (textInputed) {

      if (this.multiple) {

        this.value.push(textInputed.trim());

        if (textInputed) {
          this.autoCompleteInput.nativeElement.value = '';
        }
      } else {
        this.value = textInputed;
        this.autoCompleteInput.nativeElement.value = '';
      }
    }
  }

  getLabel(item: any): string {
    const obj = this.options.find(i => i[this.optionValueLabels.value] === item);
    if (obj == null || !this.optionValueLabels) { return; }
    return obj[this.optionValueLabels.label];
  }

  ngOnInit() {
    this.label = this.multiple ? [] : null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this.options2 = this.options ? Object.keys(this.options) : null;
    }
  }
}
