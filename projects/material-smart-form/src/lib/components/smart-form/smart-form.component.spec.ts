import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFormComponent } from './smart-form.component';

describe('SmartFormComponent', () => {
  let component: SmartFormComponent;
  let fixture: ComponentFixture<SmartFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
