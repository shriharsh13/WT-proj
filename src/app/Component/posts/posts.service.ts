import { Post } from "./post.model";
import { Subject }from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PostsComponent } from "./posts.component";
import { Content } from "@angular/compiler/src/render3/r3_ast";
import { Router } from "@angular/router";



@Injectable({providedIn: 'root'})
export class PostService {


    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();
    

    constructor(private http: HttpClient,private router: Router){}



    // donot people to directly edit the post array
    getPosts() {
        this.http.get<{message: String, posts:any}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    content: post.content,
                    id: post._id
                };
            });
        }))
        .subscribe(transformedPosts => {
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
            
        });
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();

    }

    getPost( id: any){
        return this.http.get<{_id: string, content: string}>("http://localhost:3000/api/posts/" + id);
    }
    //dependecy injection(dynamic feature of eventemiiter(/))
    addPost(content: string){
        const post: Post = {  id: null , content: content};
        this.http
        .post<{message: string, postId: any}>('http://localhost:3000/api/posts',post)
        .subscribe((responseData) => {
            const id = responseData.postId;
            post.id = id;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(["/"]);
        });
  
    }

    updatePost(id: any,content: string){
        const post: Post ={id: id, content: content};
        this.http
        .put("http://localhost:3000/api/posts/" + id, post)
        .subscribe(response => {
            const updatedPosts = [...this.posts];
            const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
            updatedPosts[oldPostIndex] = post;
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(["/"]);
        });
    }

    deletePost(postId: any) {
        this.http.delete("http://localhost:3000/api/posts/" + postId)
        .subscribe(() => {
            const updatePosts = this.posts.filter(post => post.id !== postId);
            this.posts = updatePosts;
            this.postsUpdated.next([...this.posts]);
        });
    }
}