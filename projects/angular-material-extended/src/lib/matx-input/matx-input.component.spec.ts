import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxInputComponent } from './matx-input.component';

describe('InputComponent', () => {
  let component: MatxInputComponent;
  let fixture: ComponentFixture<MatxInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatxInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
