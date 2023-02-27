import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { MarketComponent } from './market/market.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { VendreComponent } from './vendre/vendre.component';
import { UploadComponent } from './upload/upload.component';
import {FileUploadModule} from "ng2-file-upload";
import { FormPropositionComponent } from './form-proposition/form-proposition.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddCommentComponent,
    PageNotFoundComponent,
    ArticleComponent,
    ArticleListComponent,
    MarketComponent,
    DetailArticleComponent,
    VendreComponent,
    UploadComponent,
    FormPropositionComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    FileUploadModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
},)
export class AppModule { }
