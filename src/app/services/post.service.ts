import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
    apiUrl="http://localhost:3000/posts"
  constructor() { }
  http=inject(HttpClient)

  addPost(post:Post){
  return this.http.post(`${this.apiUrl}`,post)
  }

  getPostsResource():HttpResourceRef<Post[] | undefined>{
    return httpResource<Post[]>(`${this.apiUrl}`)
  }

  getPostRs(id: Signal<number>) {
    return httpResource<Post | undefined>(() => ({
      url: `${this.apiUrl}/${id()}`,
    }));
  }
  
  deletePost(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  updatePost(post: Post,id:number): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

}
