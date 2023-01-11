import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Article} from "../../interfaces/Article";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Comment} from "../../interfaces/Comment";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getAllArticle(): Observable<Article[]> {
    return this.http.get<Article[]>(`${environment.apiUrl}/articles`)
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${environment.apiUrl}/articles/${id}`);
  }

  postArticle(arti: Article): Observable<Article> {
    return this.http.post<Article>(`${environment.apiUrl}/articles`, {
      ...arti
    });
  }

  putArticle(id: number, arti: Article): Observable<Article> {
    return this.http.put<Article>(`${environment.apiUrl}/articles/${id}`, {
      ...arti
    });
  }

  deleteArticle(id: string): Observable<Article> {
    return this.http.delete<Article>(`${environment.apiUrl}/articles/${id}`);
  }
}
