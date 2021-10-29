import { PathLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Search } from '../model/Search';
import { SearchResult } from '../model/SearchResult';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {

  searchForm!: FormGroup;
  //Center of İstanbul
  model = new Search(41.015137, 28.97953, 200);
  submitted = false;
  searchResultList: SearchResult[] = [];
  lat = 0.0;
  lng = 0.0;
  zoom = 12;
  center: google.maps.LatLngLiteral | undefined;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 8,
  };

  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      latitude: '',
      longitude: '',
      radius: '',
    });

    //Center of New York
    this.viewOnMap(40.73061, -73.935242);
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom!) this.zoom--;
  }

  search() {
    this.searchService
      .search(this.model.latitude, this.model.longitude, this.model.radius)
      .subscribe(
        (res: any[]) => {
          this.searchResultList = res;
          this.submitted = true;
          console.log(this.searchResultList);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  newSearch() {
    this.model = new Search(0.0, 0.0, 0);
  }

  back() {
    this.submitted = false;
  }

  viewOnMap(nearbyLatitude: number, nearbyLongitude: number) {
    this.lat = nearbyLatitude;
    this.lng = nearbyLongitude;
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: this.lat,
        lng: this.lng,
      };
    });
  }
}
