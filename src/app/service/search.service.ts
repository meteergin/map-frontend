import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../model/SearchResult';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(latitude: number, longitude: number, radius: number): Observable<any[]> {
    const httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Cache-Control', 'no-cache')
       ;
    const options = { headers: httpHeaders, withCredentials: true};
    return this.http.post<any[]>("http://localhost:8070/search/nearbysearch", { latitude, longitude, radius }, options);
  }
}
