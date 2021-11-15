import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './Component/profile/profile.component';
import { LoginComponent } from './Component/login/login.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  
  {
    path:'profile',component:ProfileComponent
  },
  {
    path:'login',component:LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
