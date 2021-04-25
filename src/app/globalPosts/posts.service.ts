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


  getPosts(postsPerPage: number, currentPage: number, clubName: string) {
    //console.log(clubName);
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}&clubname=${clubName}`;

    this.httpClient
      .get<{message: string, posts: any, maxPosts: number }>( BACKEND_URL + queryParams)
      .pipe(
        map((postData) => {
            console.log(postData);
              return {
                posts: postData.posts.map(post => {
                return {
                  title: post.title,
                  content: post.content,
                  id: post._id,
                  imagePath: post.imagePath,
                  creator: post.creator,
                  club: post.club
                };
              }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe((transformedPostData) => {
        console.log(transformedPostData);
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

  addPost(title: string, content: string, image: File, clubName: string) {
    //const post: Post = { id: null, title: title, content: content};
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    postData.append("club", clubName);

    this.httpClient
      .post<{message: string, post: Post }>(
        BACKEND_URL, postData
        )
      .subscribe((responseData) => {
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



    this.httpClient
      .put(BACKEND_URL + id, postData)
      .subscribe(response =>  {
        this.router.navigate(["/"]);
      });

  }

  //DELTETE
  deletePost(postId: string) {
      return this.httpClient
      .delete(BACKEND_URL + postId);
  }

}
