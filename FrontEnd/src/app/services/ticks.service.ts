import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicksService {
  private apiUrl = 'http://localhost:7000/tikeo20';
  constructor(private http: HttpClient) { }

  getTikeos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
