import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ParamMap } from "@angular/router";
import { PostListComponent } from "../post-list/post-list.component";
import { Post } from "../post.model";
import { mimeType } from "./mime-type.validator";

import { PostsService } from "../posts.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: 'app-post-club',
  templateUrl: './post-club.component.html',
  styleUrls: ['./post-club.component.css']
})
export class PostClubComponent implements OnInit, OnDestroy {

  clubName = localStorage.getItem('club');
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string;
  public post: Post;

  isLoading = false;
  private authStatusSub: Subscription;

  //create form programmatically
  form: FormGroup;
  imagePreview: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );

    //initalise form
    this.form = new FormGroup({
      //FormControl beginning form state, validaters/options
      'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'content': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        //
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          //
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            creator: postData.creator,
            club: this.clubName
          };
          this.form.setValue({
            'title': this.post.title,
            'content': this.post.content,
            'image' : this.post.imagePath
          });
        });

      }
      else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  //addImage
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
     'image': file
    });
    this.form.get('image').updateValueAndValidity();
    //console.log(file);
    //console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }

  onSavePost() {

    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image,
        this.clubName
      );
    }
    else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
        );
    }

    this.form.reset();
    //form.resetForm();

  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
