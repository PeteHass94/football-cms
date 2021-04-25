import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  clubMatch = false;

  posts: Post[] = [];

  isLoading = false;
  totalPosts = 0;
  postPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [2,5,10,25];

  userId: string;

  private postsSub: Subscription;
  private authStatusSub: Subscription;

  clubName = localStorage.getItem('club');

  userIsAuthenticated = false;

  constructor(public postsService: PostsService, private authService: AuthService) {}

  ngOnInit() {
    this.clubName = localStorage.getItem('club');
    this.isLoading = true;
    this.postsService.getPosts(this.postPerPage, this.currentPage, this.clubName);
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
        this.userId = this.authService.getUserId();
      });

    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });

  }
//pagination
onChangedPage(pageData: PageEvent) {
  this.isLoading = true;
  this.currentPage = pageData.pageIndex + 1; //starts at 0
  this.postPerPage = pageData.pageSize;
  this.postsService.getPosts(this.postPerPage, this.currentPage, this.clubName);

}


  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() =>{
      if(this.currentPage > (this.totalPosts/this.postPerPage))
        this.postsService.getPosts(this.postPerPage, this.currentPage-1, this.clubName)
      else
        this.postsService.getPosts(this.postPerPage, this.currentPage, this.clubName)
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
