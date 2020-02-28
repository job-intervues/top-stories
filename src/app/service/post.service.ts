import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  readonly baseURL = environment.apiUrl;

  constructor(
    private http: HttpClient) {
  }

  getPostList() {
    return this.http.get(this.baseURL + 'topstories.json');
  }

  getPostById(postId) {
    return this.http.get(this.baseURL + 'item/' + postId.toString() + '.json');
  }
}
