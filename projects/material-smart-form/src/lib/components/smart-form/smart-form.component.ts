import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormControlStatus } from '../../interfaces/form-control-status.enum';
import { FormFieldTypes } from '../../interfaces/form-field-types.enum';
import { FormSchema } from '../../interfaces/form-schema';
import { FormSchemaItem } from '../../interfaces/form-schema-item';

@Component({
  selector: 'ng-smart-form',
  templateUrl: './smart-form.component.html',
  styleUrls: ['./smart-form.component.scss']
})
export class SmartFormComponent implements OnChanges, OnDestroy {
  // TODO: refactor this component and all its children
  valueChangesSubscription: Subscription;

  @ViewChild('form') form: Form;

  @Input() jsonSchema: any; // TODO: refactor html side so interface could be FormSchema
  @Input() isInModal: boolean;
  @Input() fGroup: FormGroup;
  @Input() values: object;
  @Input() isLoading = false;
  @Input() isLoadingFormValues = false;
  @Input() hasDelete = false;
  @Input() hasReset = false;
  @Input() hasSubmit = true;
  @Input() hasAdditionalButton = false;
  @Input() submitTitle = 'Submit';
  @Input() additionalButtonTitle = 'Back';
  @Input() deleteTitle = 'Delete';
  @Input() isButtonFullWidth: boolean;

  @Output() delete = new EventEmitter();
  @Output() formSubmit = new EventEmitter();
  @Output() formChange = new EventEmitter();
  @Output() formReset = new EventEmitter();
  @Output() additionalButtonClicked = new EventEmitter();
  @Output() arrayAddClicked: EventEmitter<string> = new EventEmitter();
  @Output() removeFromArrayClicked = new EventEmitter();

  ObjectKeys = Object.keys;
  FormControlStatus = FormControlStatus;
  FormFieldTypes = FormFieldTypes;

  constructor() { }

  private getObjForFormGroup(values, jsonSchema) {
    const obj: { [key: string]: AbstractControl } = {};
    if (values) {
      for (const item of Object.keys(jsonSchema)) {
        if (jsonSchema[item]) {
          obj[item] = new FormControl(
            { value: values[item] == null ? null : values[item], disabled: jsonSchema[item].disabled },
            {
              validators: jsonSchema[item].validators,
              updateOn: 'change'
            }
          );
        }
      }
    }
    return obj;
  }

  private getFormGroupFromValues(values: object, jsonSchema: FormSchema): FormGroup {
    const obj: { [key: string]: AbstractControl } = {};
    if (values) {
      for (const item of Object.keys(jsonSchema)) {
        if (jsonSchema[item]) {
          if ((jsonSchema[item] as FormSchemaItem).type) {
            obj[item] = new FormControl(
              {
                value: values[item] == null ? null : values[item],
                disabled: (jsonSchema[item] as FormSchemaItem).disabled
              },
              {
                validators: (jsonSchema[item] as FormSchemaItem).validators,
                updateOn: 'change'
              }
            );
          } else {
            if (Array.isArray(jsonSchema[item])) {
              const objj: { [key: string]: AbstractControl } = {};
              for (const jtem of Object.keys(jsonSchema[item])) {
                objj[jtem] = new FormGroup(
                  this.getObjForFormGroup(values[item][jtem], jsonSchema[item][jtem])
                ) as any;
              }
              const arr = [];
              for (const i of Object.keys(objj)) {
                arr.push(objj[i]);
              }
              const fb = new FormBuilder();
              obj[item] = fb.array(arr);
            } else {
              obj[item] = new FormGroup(
                this.getObjForFormGroup(values[item], jsonSchema[item])
              ) as any;
            }
          }
        }
      }
    }

    return new FormGroup(obj);
  }

  onFormSubmitted = () => this.formSubmit.emit(this.fGroup.getRawValue());

  onDelete = () => this.delete.emit(this.fGroup.value);

  addToArray(item: string) {
    this.arrayAddClicked.emit(item);
  }

  removeFromArray(item: string) {
    this.removeFromArrayClicked.emit(item);
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.fGroup || (changes.values) || (changes.jsonSchema)) {

      this.fGroup = this.getFormGroupFromValues(this.values, this.jsonSchema);

      this.valueChangesSubscription = this.fGroup.valueChanges.subscribe(val => {
        this.formChange.emit(val);
      });
    }
  }
}
