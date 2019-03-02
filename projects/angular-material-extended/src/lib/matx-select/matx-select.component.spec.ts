import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxSelectComponent } from './matx-select.component';

describe('MatxSelectComponent', () => {
  let component: MatxSelectComponent;
  let fixture: ComponentFixture<MatxSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatxSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatxSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
