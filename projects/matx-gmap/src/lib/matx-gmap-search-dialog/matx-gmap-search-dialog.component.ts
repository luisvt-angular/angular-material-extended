import { Component, ElementRef, Inject, NgZone, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MapsAPILoader } from '@agm/core';
import { MatxGmapAddress } from '../models/matx-gmap-address';

declare let google;

@Component({
  selector: 'matx-gmap-search-dialog',
  templateUrl: './matx-gmap-search-dialog.component.html',
  styleUrls: ['./matx-gmap-search-dialog.component.scss']
})
export class MatxGmapSearchDialogComponent implements OnInit {
  showDefaultLocation = true;
  showSuggestedAddresses = false;

  mapZoomGesture: string;
  // display
  selectedAddrress: string;
  suggestedAddresses = [];
  zoom = 12;

  geocoder = new google.maps.Geocoder();

  constructor(
    public dialogRef: MatDialogRef<MatxGmapSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public address: MatxGmapAddress,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.showSuggestedAddresses = this.address.showSuggestions || false;
  }

  ngOnInit() {
    if (this.showSuggestedAddresses) {
      this.showSuggestedAddresses = true;
      this.searchAddress();
    }
  }

  setCurrentPosition(event) {
    if (event) {
      // set default position to false
      this.showDefaultLocation = false;
      // set latitude, longitude
      this.address = {
        address: `${event.coords.lat}, ${event.coords.lng}`,
        coordinates: {
          latitude: event.coords.lat,
          longitude: event.coords.lng
        }
      };
      this.zoom = 14;
      this.geocoder.geocode({location: event.coords}, (results, status) => {
        this.ngZone.run(() => {
          if (status === google.maps.GeocoderStatus.OK) {
            this.showSuggestedAddresses = true;
            this.suggestedAddresses = results.filter(r => !['postal_code', 'political'].some(v => r.types.includes(v)));
          }
        });
      });
    }
  }

  selectAddress(address) {
    if (address.hasOwnProperty('geometry')) {
      this.address = {
        address: address.formatted_address,
        coordinates: {
          latitude: address.geometry.location.lat(),
          longitude: address.geometry.location.lng()
        }
      };
    } else {
      this.geocoder.geocode({placeId: address.id}, ((results, status) => {
        this.ngZone.run(() => {
          if (status === google.maps.GeocoderStatus.OK) {
            this.address = {
              address: results[0].formatted_address,
              coordinates: {
                latitude: results[0].geometry.location.lat(),
                longitude: results[0].geometry.location.lng()
              }
            };
          }
        });
      }));
    }
  }

  searchAddress() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const addressSearch = new google.maps.places.AutocompleteService();
      addressSearch.getPlacePredictions(
        {input: this.address.address},
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.suggestedAddresses = results.map(r => ({id: r.place_id, formatted_address: r.description}));
          }
        }
      );
    });
  }

  confirmAddress() {
    this.dialogRef.close(this.address);
  }
}
