import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxTableComponent } from './matx-table.component';

describe('TableComponent', () => {
  let component: MatxTableComponent;
  let fixture: ComponentFixture<MatxTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatxTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
