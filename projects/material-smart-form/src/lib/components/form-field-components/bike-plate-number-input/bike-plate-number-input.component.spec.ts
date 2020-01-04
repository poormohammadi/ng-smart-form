import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikePlateNumberInputComponent } from './BikePlateNumberInputComponent';

describe('BikePlateNumberInputComponent', () => {
  let component: BikePlateNumberInputComponent;
  let fixture: ComponentFixture<BikePlateNumberInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikePlateNumberInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikePlateNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
