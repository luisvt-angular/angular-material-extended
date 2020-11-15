import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxNavTreeDemoComponent } from './matx-nav-tree-demo.component';

describe('MatxNavTreeDemoComponent', () => {
  let component: MatxNavTreeDemoComponent;
  let fixture: ComponentFixture<MatxNavTreeDemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatxNavTreeDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatxNavTreeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
