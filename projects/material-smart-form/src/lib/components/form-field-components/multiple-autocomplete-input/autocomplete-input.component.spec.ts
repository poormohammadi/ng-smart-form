import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteInputComponent } from './autocomplete-input.component';

describe('MultipleAutocompleteInputComponent', () => {
  let component: AutocompleteInputComponent;
  let fixture: ComponentFixture<AutocompleteInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
