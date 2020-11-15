import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxErrorsComponent } from './errors.component';

describe('ErrorsComponent', () => {
  let component: MatxErrorsComponent;
  let fixture: ComponentFixture<MatxErrorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatxErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatxErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
