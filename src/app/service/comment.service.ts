import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  readonly baseURL = environment.apiUrl;

  constructor(
    private http: HttpClient) {
  }

  getCommentById(commentId) {
    return this.http.get(this.baseURL + 'item/' + commentId.toString() + '.json');
  }
}
