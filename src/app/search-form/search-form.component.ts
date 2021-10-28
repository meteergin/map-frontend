import { PathLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Search } from '../model/Search';
import { SearchResult } from '../model/SearchResult';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit{
  searchForm!: FormGroup;

  zoom = 12;
  center: google.maps.LatLngLiteral | undefined;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  constructor(
    private formBuilder: FormBuilder, 
    private searchService: SearchService,
  ) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      latitude: '',
      longitude: '',
      radius: ''
    });
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom!) this.zoom--
  }

  model = new Search(41.015137, 28.979530, 200);

  submitted = false;

  searchResultList : SearchResult[] = [];

  lat = 41.015137;
  lng = 28.979530;

  search() {
    const latitude = this.searchForm.get('latitude')!.value;
    const longitude = this.searchForm.get('longitude')!.value;
    const radius = this.searchForm.get('radius')!.value;
    this.searchService.search(this.model.latitude, this.model.longitude, this.model.radius).subscribe(
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

  viewOnMap(nearbyLatitude:number, nearbyLongitude:number) {
    this.lat = nearbyLatitude;
    this.lng = nearbyLongitude;
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: this.lat,
        lng: this.lng,
      }
    });
    console.log(nearbyLatitude + " " + nearbyLongitude);
  }

  showFormControls(form: any) {
    return form && form.controls.radius &&
    form.controls.radius.value; // Dr. IQ
  }


}
