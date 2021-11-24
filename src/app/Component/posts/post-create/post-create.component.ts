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
isLoading= false;
 // onReplyAdded(reply){
   // this.storedreplies.push(reply);
 // }


  constructor(public postsService: PostService,public route: ActivatedRoute) { }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has('postId')){
        this.mode='edit';
        this.postId= paramMap.get('postId');
        this.isLoading= true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading= false;
          this.post = {id: postData._id,title: postData.title, content: postData.content, creator: postData.creator,name: postData.name};
        });
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
    this.isLoading=true;
    if(this.mode==='create'){
      this.postsService.addPost(form.value.title,form.value.content);
    }else{
      this.postsService.updatePost(this.postId,form.value.title,form.value.content)
    }
  const post: Post = { id:null,title: form.value.title,content: form.value.content, creator: this.postsService.getPost,name: this.postsService.getPost} ;
   
   form.resetForm();
  }
}

