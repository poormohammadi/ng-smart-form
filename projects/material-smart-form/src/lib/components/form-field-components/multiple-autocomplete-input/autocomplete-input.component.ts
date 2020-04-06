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
import { ErrorStateMatcher, MatChipInputEvent, MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
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
  label: any = [];

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

  @ViewChild('autoCompleteInput', {static: false}) autoCompleteInput;
  @ViewChild('matAutocomplete', {static: false}) matAutocomplete: MatAutocomplete;

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

        if ((value || '').trim()) {
          this.value.push(value.trim());
        }

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
    this.shouldAddOnBlur = !!textInputed;
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this.options2 = this.options ? Object.keys(this.options) : null;
    }
  }
}
