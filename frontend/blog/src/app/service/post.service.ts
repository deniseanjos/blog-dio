import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get('http://localhost:3000/posts')
  }

  postMensagem(post: Post) {
    return this.http.post('http://localhost:3000/posts', post)
  }

  getPostByTitulo(titulo: string): Observable<Post[]> {
    return this.http.get<Post[]>(`http://localhost:3000/posts/http://localhost:3000/posts/${titulo}`)
  }

}
