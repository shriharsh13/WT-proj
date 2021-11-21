import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit  {
  
private mode = 'create';
private postId: any;
post: Post;
 // onReplyAdded(reply){
   // this.storedreplies.push(reply);
 // }


  constructor(public postsService: PostService,public route: ActivatedRoute) { }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has('postId')){
        this.mode='edit';
        this.postId= paramMap.get('postId');
        this.post = this.postsService.getPost(this.postId)
      }else{
        this.mode="create";
        this.postId= null;
      }
    });
  }
  onSaveposts(form: NgForm){
    if (form.invalid){
      return;
    }
    if(this.mode=='create'){
      this.postsService.addPost(form.value.content);
    }else{
      this.postsService.updatePost(this.postId,form.value.content)
    }
  const post: Post = { id:null,content: form.value.content  } ;
   
   form.resetForm();
  }
}

