import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxTextareaComponent } from './matx-textarea.component';

describe('MatxTextareaComponent', () => {
  let component: MatxTextareaComponent;
  let fixture: ComponentFixture<MatxTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatxTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatxTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
