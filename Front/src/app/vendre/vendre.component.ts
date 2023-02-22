import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth/auth.service";
import {CommentService} from "../shared/services/comment/comment.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {Comment} from "../shared/interfaces/Comment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ArticleService} from "../shared/services/article/article.service";
import {Article} from "../shared/interfaces/Article";
import {InformationsService} from "../shared/services/informations/informations.service";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-vendre',
  templateUrl: './vendre.component.html',
  styleUrls: ['./vendre.component.css']
})
export class VendreComponent implements OnInit {

  idArticle = 0;
  isEditing = false;
  articleForm: FormGroup = new FormGroup({});

  constructor(private _auth: AuthService,
              private _arti: ArticleService,
              private _info: InformationsService,
              private _snackBar: MatSnackBar,
              private _fb: FormBuilder,
              private _router: Router,
              private _route: ActivatedRoute,
              private _http: HttpClient) { }

  etat = this._info.getAllEtats()
  categorie = this._info.getAllCategories()

  ngOnInit(): void {
    this.articleForm = this._fb.group({
      pseudo: [{value: this._auth.getPseudo(), disabled: true}, Validators.required],
      nom: ['', Validators.required],
      description: ['', Validators.required],
      idTypeProduit: [null, Validators.required],
      idEtatProduit: [null, Validators.required],
      prix: [null, Validators.required]
    });

    this.idArticle = this._route.snapshot.params.id;
    if (this.idArticle) {
      this.isEditing = true;
      this._arti.getArticleById(this.idArticle).subscribe({
        next: (arti: Article) => {
          this.articleForm.get('nom')?.setValue(arti?.nom);
          this.articleForm.get('description')?.setValue(arti?.description);
          this.articleForm.get('prix')?.setValue(arti?.prix);
          this.articleForm.get('idTypeProduit')?.setValue(arti?.idTypeProduit);
          this.articleForm.get('idEtatProduit')?.setValue(arti?.idEtatProduit);
        },
        error: () => {
          this.openSnackBar("Une erreur est survenue lors du chargement de l'article.", "Modification Commentaire")
        }
      });
    }
  }

  sendComment() {
    if (this.articleForm.valid) {
      const arti: Article = {
        pseudo: this.articleForm.get('pseudo')?.value,
        nom: this.articleForm.get('nom')?.value,
        idTypeProduit: this.articleForm.get('idTypeProduit')?.value,
        idEtatProduit: this.articleForm.get('idEtatProduit')?.value,
        description: this.articleForm.get('description')?.value,
        prix: this.articleForm.get('prix')?.value,
        datePublication: new Date(),
        _id: this.articleForm.get('pseudo')?.value + '-' + new Date().getTime()
      }

      if (this.isEditing) {
        this.editComment(arti);
      } else {
        this.addComment(arti);
      }
    }
  }

  addComment(arti: Article) {
    this._arti.postArticle(arti).subscribe({
      next: () => {
        this.openSnackBar("L'article a été correctement ajouté.", "Ajout article");
        this._router.navigate([`/upload/`+arti._id]);
      },
      error: (httpError: HttpErrorResponse) => {
        if (httpError.status === 401) {
          this.openSnackBar("Le pseudo renseigné ne correspond pas à votre compte.", "Ajout Article")
        } else {
          this.openSnackBar("Une erreur est survenue durant l'ajout de l'article.", "Ajout Article")
        }
      }
    });
  }


  editComment(arti: Article) {
    this._arti.putArticle(this.idArticle, arti).subscribe({
      next: () => {
        this.openSnackBar("L'article a été correctement modifié.", "Edit Article");
        this._router.navigate(['/market']);
      },
      error: (httpError: HttpErrorResponse) => {
        if (httpError.status === 401) {
          this.openSnackBar("Le pseudo renseigné ne correspond pas à votre compte.", "Edit Article")
        } else {
          this.openSnackBar("Une erreur est survenue durant la modification de l'article.", "Edit Article")
        }
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  get form() {
    return this.articleForm.controls;
  }

  uploadImage(event: any) {
    // Get the selected file
    const file = event.target.files[0];

    // Create a new FileReader
    const reader = new FileReader();

    // Set the onload event handler
    reader.onload = () => {
      // Create an <img> element with the selected image
      const imgElement = document.createElement('img');
      if (typeof reader.result === "string") {
        imgElement.src = reader.result;
      }

      // Add the <img> element to the page
      document.body.appendChild(imgElement);
    };

    // Read the selected file
    reader.readAsDataURL(file);

    // Send the image to the server
    this._http.post(`${environment.apiUrl}/photosAnnonce`, file).subscribe(() => {
      // Image uploaded successfully
    });


  }

}
