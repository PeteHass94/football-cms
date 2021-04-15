import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { Router } from '@angular/router';

import { environment } from "../../environments/environment.prod";

const BACKEND_URL = environment.apiURL + '/posts/';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private httpClient: HttpClient, private router: Router) {}



  // private apiUrl = 'http://localhost:3000/api/posts';

  getPosts(postsPerPage: number, currentPage: number) {
    //return [...this.posts];
    //return this.posts;
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;

    // this.httpClient.get<{message: string, posts: any[]}>(this.apiUrl, {
    //   params: new HttpParams().set('pagesize', postsPerPage.toString())
    //     .append('page', currentPage.toString())

    this.httpClient
      .get<{message: string, posts: any, maxPosts: number }>( BACKEND_URL + queryParams)
      .pipe(
        map((postData) => {
            //console.log(postData);
              return {
                posts: postData.posts.map(post => {
                return {
                  title: post.title,
                  content: post.content,
                  id: post._id,
                  imagePath: post.imagePath,
                  creator: post.creator
                };
              }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe((transformedPostData) => {
        //console.log(transformedPostData);
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });

  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    //return{...this.posts.find(p => p.id === id)};
    return this.httpClient
      .get<{
        _id: string,
        title: string,
        content: string,
        imagePath: string,
        creator: string;
      }>(BACKEND_URL + id);
  }

  addPost(title: string, content: string, image: File) {
    //const post: Post = { id: null, title: title, content: content};
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);

    this.httpClient
      .post<{message: string, post: Post }>(
        BACKEND_URL, postData
        )
      .subscribe((responseData) => {
        //console.log(responseData.message);
        // const post: Post = {
        //   id: responseData.post.id,
        //   title: title,
        //   content: content,
        //   imagePath: responseData.post.imagePath
        // };
        // //const newId = responseData.postId;
        // //post.id = newId;
        // this.posts.push(post);
        // this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData;
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
         postData = {
          id: id,
          title: title,
          content: content,
          imagePath: image,
          creator: null
        };
    }

    // const post: Post = {
    //   id: id,
    //   title: title,
    //   content: content,
    //   imagePath: null
    // };


    this.httpClient
      .put(BACKEND_URL + id, postData)
      .subscribe(response =>  {
        //console.log(response));
        // const updatedPosts = [...this.posts];
        // const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        // const post: Post = {
        //   id: id,
        //   title: title,
        //   content: content,
        //   imagePath: ""
        // }
        // updatedPosts[oldPostIndex] = post;
        // this.posts = updatedPosts;
        // this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });

  }

  //DELTETE
  deletePost(postId: string) {
    // this.httpClient
    //   .delete("http://localhost:3000/api/posts/" + postId)
      // .subscribe(() => {
      //   const updatedPosts = this.posts.filter(post => post.id !== postId);
      //   this.posts = updatedPosts;
      //   this.postsUpdated.next([...this.posts]);
      //   //console.log("Deleted " + postId);
      // });
    return this.httpClient
      .delete(BACKEND_URL + postId);
  }

}
