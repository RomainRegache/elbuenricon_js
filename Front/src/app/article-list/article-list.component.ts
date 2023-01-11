import { Component, OnInit } from '@angular/core';
import {Article} from "../shared/interfaces/Article";
import {Observable} from "rxjs";
import {ArticleService} from "../shared/services/article/article.service";
import {map} from "rxjs/operators"
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  article!: Article[];
  article$ !: Observable<Article[]>;
  orderby!: string;

  constructor(private articleService: ArticleService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          console.log(params); // { orderby: "price" }
          this.orderby = params.order;
          console.log(this.orderby); // price
        }
      );
    if (this.orderby == "prix_dsc") {
      this.getListByPriceDes()
    }
    else if (this.orderby == "prix_asc") {
      this.getListByPriceAsc()
    }
    else {
      this.getListByDate()
    }
    //this.article = this.articleService.article
    //this.article.sort((a, b) =>a.prix>b.prix ? -1 : 1);
  }

  getListByPriceDes(): void {
    this.article$ = this.articleService.getAllArticle().pipe(
      map(results => results.sort((a, b) =>a.prix>b.prix ? -1 : 1))
    );
  }

  getListByPriceAsc(): void {
    this.article$ = this.articleService.getAllArticle().pipe(
      map(results => results.sort((a, b) =>a.prix<b.prix ? -1 : 1))
    );
  }

  getListByDate(): void {
    this.article$ = this.articleService.getAllArticle().pipe(
      map(results => results.sort((a, b) =>a.datePublication>b.datePublication ? -1 : 1))
    );
  }

}
