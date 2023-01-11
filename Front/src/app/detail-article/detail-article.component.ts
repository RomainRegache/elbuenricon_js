import {Component, Input, OnInit} from '@angular/core';
import { Article } from '../shared/interfaces/Article';
import {Observable} from "rxjs";
import {ArticleService} from "../shared/services/article/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PhotoAnnonce} from "../shared/interfaces/PhotoAnnonce";
import {PhotoAnnonceService} from "../shared/services/photoAnnonce/photo-annonce.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {

  @Input() article!: Article;
  article$!: Observable<Article>;
  photosArticle!: PhotoAnnonce[];
  photo_afficher!: string;

  constructor(private articleService: ArticleService,
              private route: ActivatedRoute,
              private router: Router,
              private _photo: PhotoAnnonceService,
              private sanitizer:DomSanitizer) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.params['id'];
    this.article$ = this.articleService.getArticleById(articleId)
    console.log(articleId)
    this._photo.getArticlePhotos(articleId).subscribe(
      photos => {
        this.photosArticle = photos as PhotoAnnonce[]
        this.photo_afficher = this._photo.URL + this.photosArticle[0].path
      }
    )
  }

  onViewBackMarket() {
    this.router.navigateByUrl(`market`)
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
