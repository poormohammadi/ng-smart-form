import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorIntl,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTooltipModule,
} from '@angular/material';

import { PaginatorIntlFa } from './classes/paginator-intl-fa';
import { PERSIAN_DATE_FORMATS, PersianDateAdapter } from './classes/persian-date-adapter';

@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatCardModule,
    MatDialogModule,
    CommonModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatCardModule,
    MatDialogModule,
    CommonModule
  ],
  providers: [
    { provide: DateAdapter, useClass: PersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
    { provide: MatPaginatorIntl, useClass: PaginatorIntlFa },
  ],
})
export class MaterialModule { }
