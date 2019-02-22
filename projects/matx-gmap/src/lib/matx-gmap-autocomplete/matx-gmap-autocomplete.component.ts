import { Component, ElementRef, forwardRef, Input, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DefaultValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatxGmapAddress } from '../models/matx-gmap-address';
import { MatDialog } from '@angular/material';
import { MatxGmapSearchDialogComponent } from '../matx-gmap-search-dialog/matx-gmap-search-dialog.component';

declare var google: any;

@Component({
  selector: 'matx-gmap-autocomplete,' +
    ' matx-gmap-autocomplete[ngModel],' +
    ' matx-gmap-autocomplete[name],' +
    ' matx-gmap-autocomplete[formControl],' +
    ' matx-gmap-autocomplete[formControlName]' +
    ' matx-gmap-autocomplete[ngDefaultControl]',
  templateUrl: './matx-gmap-autocomplete.component.html',
  styleUrls: ['./matx-gmap-autocomplete.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatxGmapAutocompleteComponent), multi: true}]
})
export class MatxGmapAutocompleteComponent extends DefaultValueAccessor implements OnInit {

  autocompleteService;

  /** @type google.maps.Geocoder */
  geocoder;
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
          this.geocoder.geocode({placeId: value.id}, results => {
            this.ngZone.run(() => {
              this.textBoxControl.setValue(<MatxGmapAddress>{
                address: results[0].formatted_address,
                coordinates: {latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng()}
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
              this.geocoder.geocode({address: value}, geocodeResults =>
                this.ngZone.run(() => {
                  this.options = geocodeResults && geocodeResults.map(result => (<MatxGmapAddress>{
                    address: result.formatted_address || `${result.geometry.location.lat()}, ${result.geometry.location.lng()}`,
                    coordinates: {latitude: result.geometry.location.lat(), longitude: result.geometry.location.lng()}
                  }));
                }));
            }
          }));
      });

    this.mapsApiLoader.load().then(() => {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.geocoder = new google.maps.Geocoder();
    });
  }

  writeValue(address: MatxGmapAddress): void {
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
      this.matDialog.open(MatxGmapSearchDialogComponent, {
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
        this.matDialog.open(MatxGmapSearchDialogComponent, {
          maxHeight: '650px',
          maxWidth: '800px',
          width: '90%',
          height: '90%',
          data: <MatxGmapAddress>{
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