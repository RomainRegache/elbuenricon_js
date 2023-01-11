import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { AccessGuard } from './shared/guards/access/access.guard';
import {MarketComponent} from "./market/market.component";
import {VendreComponent} from "./vendre/vendre.component";
import {DetailArticleComponent} from "./detail-article/detail-article.component";
import {UploadComponent} from "./upload/upload.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'market', component: MarketComponent, data: { requiresLogin: true }, canActivate: [ AccessGuard ] },
  { path: 'market/article/:id', component: DetailArticleComponent, data: { requiresLogin: true }, canActivate: [ AccessGuard ] },
  { path: 'upload/:id', component: UploadComponent, data: { requiresLogin: true }, canActivate: [ AccessGuard ] },
  { path: 'vendre', component: VendreComponent, data: { requiresLogin: true }, canActivate: [ AccessGuard ] },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, data: { redirectIfSignedIn: true }, canActivate: [ AccessGuard ] },
  { path: 'register', component: RegisterComponent, data: { redirectIfSignedIn: true }, canActivate: [ AccessGuard ] },
  { path: 'add-comment', component: AddCommentComponent, data: { requiresLogin: true }, canActivate: [ AccessGuard ] },
  { path: 'edit-comment/:id', component: AddCommentComponent, data: { requiresLogin: true }, canActivate: [ AccessGuard ] },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
