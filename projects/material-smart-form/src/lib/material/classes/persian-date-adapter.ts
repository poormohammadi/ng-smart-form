
import { DateAdapter } from '@angular/material/core';

// TODO: solve jalali moment issue
import * as jalaliMoment_ from 'jalali-moment';

const jalaliMoment = jalaliMoment_;
// import * as jalaliMoment from "moment-jalaali";

// Source:
// https://github.com/VahidN/AngularMaterialLab
// https://www.dotnettips.info/post/2890/%D8%B4%D9%85%D8%B3%DB%8C-%D8%B3%D8%A7%D8%B2%DB%8C-date-picker-%D8%AA%D9%88%DA%A9%D8%A7%D8%B1-angular-material-6x

export const PERSIAN_DATE_FORMATS = {
  parse: {
    dateInput: 'jYYYY/jMM/jDD'
  },
  display: {
    dateInput: 'jYYYY/jMM/jDD',
    monthYearLabel: 'jYYYY jMMMM',
    dateA11yLabel: 'jYYYY/jMM/jDD',
    monthYearA11yLabel: 'jYYYY jMMMM'
  }
};

export class PersianDateAdapter extends DateAdapter<jalaliMoment_.Moment> {

  constructor() {
    super();
    super.setLocale('fa');
  }

  getYear(date: jalaliMoment_.Moment): number {
    return this.clone(date).jYear();
  }

  getMonth(date: jalaliMoment_.Moment): number {
    return this.clone(date).jMonth();
  }

  getDate(date: jalaliMoment_.Moment): number {
    return this.clone(date).jDate();
  }

  getDayOfWeek(date: jalaliMoment_.Moment): number {
    return this.clone(date).day();
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
      case 'short':
        return jalaliMoment.localeData('fa').jMonths().slice(0);
      case 'narrow':
        return jalaliMoment.localeData('fa').jMonthsShort().slice(0);
    }
  }

  getDateNames(): string[] {
    const valuesArray = Array(31);
    for (let i = 0; i < 31; i++) {
      valuesArray[i] = String(i + 1);
    }
    return valuesArray;
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
        return jalaliMoment.localeData('fa').weekdays().slice(0);
      case 'short':
        return jalaliMoment.localeData('fa').weekdaysShort().slice(0);
      case 'narrow':
        return ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'];
    }
  }

  getYearName(date: jalaliMoment_.Moment): string {
    return this.clone(date).jYear().toString();
  }

  getFirstDayOfWeek(): number {
    return jalaliMoment.localeData('fa').firstDayOfWeek();
  }

  getNumDaysInMonth(date: jalaliMoment_.Moment): number {
    return this.clone(date).jDaysInMonth();
  }

  clone(date: jalaliMoment_.Moment): jalaliMoment_.Moment {
    return date.clone().locale('fa');
  }

  createDate(year: number, month: number, date: number): jalaliMoment_.Moment {
    if (month < 0 || month > 11) {
      throw Error(
        `Invalid month index "${month}". Month index has to be between 0 and 11.`
      );
    }
    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }
    const result = jalaliMoment()
      .jYear(year).jMonth(month).jDate(date)
      .hours(0).minutes(0).seconds(0).milliseconds(0)
      .locale('fa');

    if (this.getMonth(result) !== month) {
      throw Error(`Invalid date ${date} for month with index ${month}.`);
    }
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }

  today(): jalaliMoment_.Moment {
    return jalaliMoment().locale('fa');
  }

  parse(value: any, parseFormat: string | string[]): jalaliMoment_.Moment | null {
    if (value && typeof value === 'string') {
      return jalaliMoment(value, parseFormat, 'fa');
    }
    return value ? jalaliMoment(value).locale('fa') : null;
  }

  format(date: jalaliMoment_.Moment, displayFormat: string): string {
    date = this.clone(date);
    if (!this.isValid(date)) {
      throw Error('JalaliMomentDateAdapter: Cannot format invalid date.');
    }
    return date.format(displayFormat);
  }

  addCalendarYears(date: jalaliMoment_.Moment, years: number): jalaliMoment_.Moment {
    return this.clone(date).add(years, 'jYear');
  }

  addCalendarMonths(date: jalaliMoment_.Moment, months: number): jalaliMoment_.Moment {
    return this.clone(date).add(months, 'jmonth');
  }

  addCalendarDays(date: jalaliMoment_.Moment, days: number): jalaliMoment_.Moment {
    return this.clone(date).add(days, 'jDay');
  }

  toIso8601(date: jalaliMoment_.Moment): string {
    return this.clone(date).format();
  }

  isDateInstance(obj: any): boolean {
    return jalaliMoment.isMoment(obj);
  }

  isValid(date: jalaliMoment_.Moment): boolean {
    return this.clone(date).isValid();
  }

  invalid(): jalaliMoment_.Moment {
    return jalaliMoment.invalid();
  }

  deserialize(value: any): jalaliMoment_.Moment | null {
    let date;
    if (value instanceof Date) {
      date = jalaliMoment(value);
    }
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      date = jalaliMoment(value).locale('fa');
    }
    if (date && this.isValid(date)) {
      return date;
    }
    return super.deserialize(value);
  }
}
