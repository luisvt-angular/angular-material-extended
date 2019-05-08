import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxDatepickerComponent } from './matx-datepicker.component';

describe('MatxDatepickerComponent', () => {
  let component: MatxDatepickerComponent;
  let fixture: ComponentFixture<MatxDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatxDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatxDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
