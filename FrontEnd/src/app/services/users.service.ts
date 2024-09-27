import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:7000/user';

  constructor(private http: HttpClient) { }
  getPersonal(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
