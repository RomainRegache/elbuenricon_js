import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../../interfaces/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _http: HttpClient) { }

  getAllComments(): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${environment.apiUrl}/comments`);
  }

  getCommentById(id: string): Observable<Comment> {
    return this._http.get<Comment>(`${environment.apiUrl}/comments/${id}`);
  }

  postComment(comm: Comment): Observable<Comment> {
    return this._http.post<Comment>(`${environment.apiUrl}/comments`, {
      ...comm
    });
  }

  putComment(id: string, comm: Comment): Observable<Comment> {
    return this._http.put<Comment>(`${environment.apiUrl}/comments/${id}`, {
      ...comm
    });
  }

  deleteComment(id: string): Observable<Comment> {
    return this._http.delete<Comment>(`${environment.apiUrl}/comments/${id}`);
  }
}
