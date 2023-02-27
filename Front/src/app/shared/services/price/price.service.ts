import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Price} from "../../interfaces/Price";

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http: HttpClient) { }

  postArticle(arti: Price): Observable<Price> {
    return this.http.post<Price>(`${environment.apiUrl}/price`, {
      ...arti
    });
  }
}
