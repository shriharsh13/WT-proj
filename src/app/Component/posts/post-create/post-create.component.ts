import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent  {
  
  
 // onReplyAdded(reply){
   // this.storedreplies.push(reply);
 // }


  constructor(public postsService: PostService) { }

  onAddposts(form: NgForm){
    if (form.invalid){
      return;
    }
  const post: Post = { id:null,content: form.value.content  } ;
   this.postsService.addPost(form.value.content);
   form.resetForm();
  }
}

