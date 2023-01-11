import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../../interfaces/Auth';
import { Credential, User } from '../../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  login(cred: Credential): Observable<Auth> {
    return this._http.post<Auth>(`${environment.apiUrl}/login`, {
      ...cred
    });
  }

  register(cred: Credential): Observable<User> {
    return this._http.post<User>(`${environment.apiUrl}/register`, {
      ...cred
    });
  }
}
