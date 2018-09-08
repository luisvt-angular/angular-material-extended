import { Component, ElementRef, forwardRef, Input, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Address } from '../models/address';
import { MatDialog } from '@angular/material';
import { GmapSearchDialogComponent } from '../gmap-search-dialog/gmap-search-dialog.component';

declare var google: any;

@Component({
  selector: 'matx-gmap-autocomplete,' +
    ' matx-gmap-autocomplete[ngModel],' +
    ' matx-gmap-autocomplete[name],' +
    ' matx-gmap-autocomplete[formControl],' +
    ' matx-gmap-autocomplete[formControlName]' +
    ' matx-gmap-autocomplete[ngDefaultControl]',
  templateUrl: './gmap-autocomplete.component.html',
  styleUrls: ['./gmap-autocomplete.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GmapAutocompleteComponent), multi: true}]
})
export class GmapAutocompleteComponent extends DefaultValueAccessor implements OnInit {

  @ViewChild('search') searchElement: ElementRef;

  autocompleteService;
  placesService;
  options = [];
  textBoxControl = new FormControl();
  loading = false;

  @Input() label: string;
  @Input() placeholder: string;
  @Input() required: boolean | '';

  constructor(private mapsApiLoader: MapsAPILoader,
              private matDialog: MatDialog,
              private ngZone: NgZone,
              _renderer: Renderer2,
              _elementRef: ElementRef) {
    super(_renderer, _elementRef, false);
  }

  ngOnInit() {
    this.textBoxControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value): Observable<any[]> => {
        if (!value) {
          this.onChange(value);
          return;
        }
        if (value.hasOwnProperty('id')) {
          this.placesService.getDetails({placeId: value.id, fields: ['formatted_address', 'geometry']}, result => {
            this.ngZone.run(() => {
              this.textBoxControl.setValue(<Address>{
                address: result.formatted_address,
                coordinates: {latitude: result.geometry.location.lat(), longitude: result.geometry.location.lng()}
              });
            });
          });
        }

        if (value.hasOwnProperty('coordinates')) {
          this.onChange(value);
        }

        if (typeof value === 'string') {
          this.onChange(undefined);
          this.textBoxControl.setErrors({'required': {value: undefined}});
        }

        if (typeof value !== 'string') {
          return;
        }

        this.autocompleteService.getQueryPredictions({input: value}, autocompletePredictions =>
          this.ngZone.run(() => {
            if (autocompletePredictions) {
              this.options = autocompletePredictions.map(result => ({
                address: result.description,
                id: result.place_id
              }));
            } else {
              this.placesService.findPlaceFromQuery({query: value, fields: ['formatted_address', 'geometry']}, placeResults =>
                this.ngZone.run(() => {
                  this.options = placeResults && placeResults.map(result => (<Address>{
                    address: result.formatted_address || `${result.geometry.location.lat()}, ${result.geometry.location.lng()}`,
                    coordinates: {latitude: result.geometry.location.lat(), longitude: result.geometry.location.lng()}
                  }));
                }));
            }
          }));
      });

    this.mapsApiLoader.load().then(() => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(this.searchElement.nativeElement);
    });
  }

  writeValue(address: Address): void {
    this.textBoxControl.setValue(address);
  }

  displaySelectedAddress(option) {
    return option ? option.address : undefined;
  }

  getMyCurrentAddress(event: MouseEvent) {
    event.stopPropagation();
    let address;
    if (typeof this.textBoxControl.value === 'string') {
      address = {address: this.textBoxControl.value};
    } else {
      address = this.textBoxControl.value;
    }
    if (address && address.coordinates) {
      this.matDialog.open(GmapSearchDialogComponent, {
        maxHeight: '650px',
        maxWidth: '800px',
        width: '90%',
        height: '90%',
        data: address
      }).afterClosed().subscribe(result => {
        if (result) {
          this.textBoxControl.setValue(result);
        }
      });
    } else if ('geolocation' in navigator) {
      this.loading = true;
      navigator.geolocation.getCurrentPosition(result => {
        this.loading = false;
        this.matDialog.open(GmapSearchDialogComponent, {
          maxHeight: '650px',
          maxWidth: '800px',
          width: '90%',
          height: '90%',
          data: <Address>{
            showSuggestions: !!(address && address.address),
            address: address && address.address || `${result.coords.latitude}, ${result.coords.longitude}`,
            coordinates: {
              latitude: result.coords.latitude,
              longitude: result.coords.longitude
            }
          }
        }).afterClosed().subscribe(result2 => {
          if (result2) {
            this.textBoxControl.setValue(result2);
          }
        });
      });
    }
  }
}
