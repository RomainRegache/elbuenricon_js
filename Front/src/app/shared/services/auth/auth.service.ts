import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { DecodedToken } from '../../interfaces/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();

  constructor(private _localStorage: LocalStorageService) { }

  isConnected(): boolean {
    const token = this.getToken();
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  isDisconnected(): boolean {
    return !this.isConnected();
  }

  disconnect(): void {
    this._localStorage.removeData('token');
  }

  saveToken(token: string) {
    this._localStorage.saveData('token', token);
  }

  getToken(): string {
    return this._localStorage.getData('token');
  }

  getPseudo(): string {    
    if (this.isConnected()) {
      const token = this.getToken();
      const decodedToken: DecodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.pseudo;
    }
    
    return "";
  }
}
