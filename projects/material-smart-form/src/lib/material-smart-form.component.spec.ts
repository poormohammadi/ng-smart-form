import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSmartFormComponent } from './material-smart-form.component';

describe('MaterialSmartFormComponent', () => {
  let component: MaterialSmartFormComponent;
  let fixture: ComponentFixture<MaterialSmartFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialSmartFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSmartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
