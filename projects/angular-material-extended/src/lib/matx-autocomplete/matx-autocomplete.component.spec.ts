import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxAutocompleteComponent } from './matx-autocomplete.component';

describe('MatxAutocompleteComponent', () => {
  let component: MatxAutocompleteComponent;
  let fixture: ComponentFixture<MatxAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatxAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatxAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
