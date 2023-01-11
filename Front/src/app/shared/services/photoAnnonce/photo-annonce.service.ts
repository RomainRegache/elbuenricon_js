import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Article} from "../../interfaces/Article";
import {PhotoAnnonce} from "../../interfaces/PhotoAnnonce";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PhotoAnnonceService {

  constructor(private http: HttpClient) { }

  URL = "http://localhost:8888/"

  getArticlePhotos(id: string | undefined): Observable<PhotoAnnonce[]> {
    return this.http.get<PhotoAnnonce[]>(`${environment.apiUrl}/photosAnnonce/${id}`);
  }
}
