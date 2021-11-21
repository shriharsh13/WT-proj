
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './post.model';
import{PostService}  from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit,OnDestroy {
posts: Post[] = [];
private postsSub!: Subscription;
isLoading = false;


  constructor(public postsService: PostService) { 

  }

  ngOnInit(): void {
    this.isLoading=true;
    this.postsService.getPosts();
    
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) =>{
      this.isLoading=false;
      this.posts = posts;
    });
  }

onDelete(postId: any){
  this.postsService.deletePost(postId);
}

ngOnDestroy(){
  this.postsSub.unsubscribe();
}
}
