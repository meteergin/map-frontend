import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(
    latitude: number,
    longitude: number,
    radius: number
  ): Observable<any[]> {
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    const options = { headers: httpHeaders, withCredentials: true };
    return this.http.get<any[]>(
      'http://localhost:8070/search/nearbysearch?latitude=' + latitude +'&longitude=' + longitude + '&radius=' + radius,
    );
  }
}
