import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {UserService} from "../shared/services/user/user.service";
import {AuthService} from "../shared/services/auth/auth.service";
import {ActivatedRoute, Route, Routes} from "@angular/router";
//import { ToastrService } from 'ngx-toastr';
const URL = 'http://localhost:8080/api/upload';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  articleId = this.route.snapshot.params['id']
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
    headers: [{ name: 'pseudo', value: this._auth.getPseudo() },
              { name: 'article', value: this.articleId.toString()}]
  });
  constructor(private _auth: AuthService,
              private route: ActivatedRoute) {}
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      //this.toastr.success('File successfully uploaded!');
    };
  }
}
