import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Post } from '../post';
@Injectable()
export class PostsService {
  private postsUrl:string = "https://jsonplaceholder.typicode.com/posts";
  constructor(
    private http: HttpClient,
  ) { }

  getAllPosts():Observable<Post[]> {
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<Post[]>(this.postsUrl, httpOptions);
  }

  addPost(body):Observable<any> {
    console.log(body);
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var data = JSON.stringify(body);
    var postData = new HttpRequest('POST', this.postsUrl, data, httpOptions );
    
    return this.http.request<any>(postData);
  }

  editPost(id):Observable<Post> {
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<Post>(this.postsUrl+"/"+id, httpOptions);
  }

  updatePost(body):Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var data = JSON.stringify(body);
    var postData = new HttpRequest('PUT', this.postsUrl+"/"+body.id, data, httpOptions );
    
    return this.http.request<any>(postData);
  }

  deletePost(id):Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var data = "";
    var postData = new HttpRequest('DELETE', this.postsUrl+"/"+id, data, httpOptions );

    return this.http.request(postData);
  }
}
