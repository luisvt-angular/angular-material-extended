import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxGmapAutocompleteComponent } from './gmap-autocomplete.component';

describe('MatxGmapAutocompleteComponent', () => {
  let component: MatxGmapAutocompleteComponent;
  let fixture: ComponentFixture<MatxGmapAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatxGmapAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatxGmapAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
