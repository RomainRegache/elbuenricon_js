import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../shared/interfaces/Article";
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth/auth.service";
import {PhotoAnnonce} from "../shared/interfaces/PhotoAnnonce";
import {HttpErrorResponse} from "@angular/common/http";
import {ArticleService} from "../shared/services/article/article.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PhotoAnnonceService} from "../shared/services/photoAnnonce/photo-annonce.service";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article!: Article;
  photosArticle!: PhotoAnnonce[];

  pseudo: string = "";
  photo_afficher!: string;

  constructor(private router: Router,
              private _auth: AuthService,
              private _snackBar: MatSnackBar,
              private _arti: ArticleService,
              private _router: Router,
              private _photo: PhotoAnnonceService,
              private sanitizer:DomSanitizer) { }

  ngOnInit() : void {
    this.pseudo = this._auth.getPseudo();
    this._photo.getArticlePhotos(this.article._id).subscribe(
      photos => {
        this.photosArticle = photos as PhotoAnnonce[]
        this.photo_afficher = this._photo.URL + this.photosArticle[0].path
      }
    )
  }

  onViewArticle() {
    this.router.navigateByUrl(`market/article/${this.article?._id}`)
  }

  isConnected(): boolean {
    return this._auth.isConnected();
  }

  deleteArticle(article: Article) {
    if (article._id) {
      this._arti.deleteArticle(article._id).subscribe({
        next: () => {
          this.openSnackBar("Le commentaire a bien été supprimé.", "Home");
          this._router.navigateByUrl('market')
        },
        error: (httpError: HttpErrorResponse) => {
          if (httpError.status === 401) {
            this.openSnackBar("Le pseudo renseigné ne correspond pas à votre compte.", "Home")
          } else {
            this.openSnackBar("Une erreur est survenue lors de la suppression du commentaire.", "Home");
          }
        }
      });
    } else {
      this.openSnackBar("Une erreur est survenue lors de la suppression du commentaire.", "Home");
    }
  }

  editArticle(id: string | undefined) {
    if (id) {
      this._router.navigate(['/edit-article', id]);
    } else {
      this.openSnackBar("Une erreur est survenue pour la modification du commentaire.", "Home");
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
