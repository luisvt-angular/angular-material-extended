import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxLoadingComponent } from './matx-loading.component';

describe('MatxLoadingComponent', () => {
  let component: MatxLoadingComponent;
  let fixture: ComponentFixture<MatxLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatxLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatxLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
