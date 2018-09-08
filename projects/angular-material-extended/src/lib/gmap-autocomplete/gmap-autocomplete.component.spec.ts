import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapAutocompleteComponent } from './gmap-autocomplete.component';

describe('MatxGmapAutocompleteComponent', () => {
  let component: GmapAutocompleteComponent;
  let fixture: ComponentFixture<GmapAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmapAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
