import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/home/home.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { PostsComponent } from './Component/posts/posts.component';
import { PostCreateComponent } from './Component/posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/login/signup.component';


const routes: Routes = [
{ path: '', component: HomeComponent},
{ path: 'create', component: PostCreateComponent},
{ path: 'edit/:postId', component: PostCreateComponent},
{path:'home' ,component: HomeComponent},
{path: 'profile' ,component:ProfileComponent},
{path: 'About us',component:AppComponent},
{path: 'login', component:LoginComponent},
{path: 'signup', component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }