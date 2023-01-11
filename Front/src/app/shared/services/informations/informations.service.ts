import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Etat} from "../../interfaces/Etat";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Categorie} from "../../interfaces/Categorie";

@Injectable({
  providedIn: 'root'
})
export class InformationsService {

  constructor(private http: HttpClient) { }

  getAllEtats():Observable<Etat[]> {
    return this.http.get<Etat[]>(`${environment.apiUrl}/etats`);
  }

  getAllCategories():Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${environment.apiUrl}/categories`);
  }
}
