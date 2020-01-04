import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VanPlateNumberInputComponent } from './van-plate-number-input.component';

describe('VanPlateNumberInputComponent', () => {
  let component: VanPlateNumberInputComponent;
  let fixture: ComponentFixture<VanPlateNumberInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VanPlateNumberInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VanPlateNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
