
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './post.model';
import{PostService}  from './posts.service';
import { Subscription } from 'rxjs';
import { AuthSevice } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit,OnDestroy {
posts: Post[] = [];
private postsSub!: Subscription;
isLoading = false;
private authStatusSub: Subscription;
userIsAuthenticated= false;
  constructor(public postsService: PostService, private authService: AuthSevice) { 

  }

  ngOnInit(){
    this.isLoading=true;
    this.postsService.getPosts();
    
    this.postsSub = this.postsService
    .getPostUpdateListener()
    .subscribe((posts: Post[]) =>{
      this.isLoading=false;
      this.posts = posts;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub= this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated= isAuthenticated;
    });
  }

onDelete(postId: any){
  this.postsService.deletePost(postId);
}

ngOnDestroy(){
  this.postsSub.unsubscribe();
  this.authStatusSub.unsubscribe();
}
}
