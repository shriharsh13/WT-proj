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
    private postsUpdated = new Subject<{posts: Post[], postCount:number} >();
    

    constructor(private http: HttpClient,private router: Router){}



    // donot people to directly edit the post array
    getPosts(postsPerPage: number, currentPage: number) {
        const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
        this.http.get<{message: String, posts:any, maxPosts: number}>('http://localhost:3000/api/posts' + queryParams)
        .pipe(map((postData) => {
            return {posts: postData.posts.map(post => {
                return {
                    content: post.content,
                    id: post._id
                };
            }),maxPosts: postData.maxPosts};
        }))
        .subscribe(transformedPostData => {
            this.posts = transformedPostData.posts;
            this.postsUpdated.next({
                posts: [...this.posts], 
                postCount: transformedPostData.maxPosts
            });
            
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
           
            this.router.navigate(["/"]);
        });
  
    }

    updatePost(id: any,content: string){
        const post: Post ={id: id, content: content};
        this.http
        .put("http://localhost:3000/api/posts/" + id, post)
        .subscribe(response => {
        
            this.router.navigate(["/"]);
        });
    }

    deletePost(postId: any) {
      return  this.http.delete("http://localhost:3000/api/posts/" + postId);
      
    }
}