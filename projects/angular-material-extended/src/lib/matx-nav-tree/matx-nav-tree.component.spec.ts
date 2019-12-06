import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxNavTreeComponent } from './matx-nav-tree.component';

describe('MatxNavTreeComponent', () => {
  let component: MatxNavTreeComponent;
  let fixture: ComponentFixture<MatxNavTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatxNavTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatxNavTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
