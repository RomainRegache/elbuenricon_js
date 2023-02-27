import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth/auth.service";
import {ArticleService} from "../shared/services/article/article.service";
import {InformationsService} from "../shared/services/informations/informations.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Price} from "../shared/interfaces/Price";
import {Article} from "../shared/interfaces/Article";
import {PriceService} from "../shared/services/price/price.service";

@Component({
  selector: 'app-form-proposition',
  templateUrl: './form-proposition.component.html',
  styleUrls: ['./form-proposition.component.css']
})
export class FormPropositionComponent implements OnInit {

  propositionForm: FormGroup = new FormGroup({});

  constructor(private _auth: AuthService,
              private _pri: PriceService,
              private _info: InformationsService,
              private _snackBar: MatSnackBar,
              private _fb: FormBuilder,
              private _router: Router,
              private _route: ActivatedRoute,
              private _http: HttpClient) { }

  ngOnInit(): void {
    this.propositionForm = this._fb.group({
      prix: [null, Validators.required]
    });
  }

  sendPrice() {
    if (this.propositionForm.valid) {
      const pri: Price = {
        prix: this.propositionForm.get('prix')?.value,
        annonce: this.propositionForm.get('prix')?.value,
        pseudo: this._auth.getPseudo(),
        date: new Date(),
      }
        this.addPrice(pri);
      }
  }

  addPrice(pri: Price) {
    this._pri.postArticle(pri).subscribe({
      next: () => {
        this.openSnackBar("L'article a été correctement ajouté.", "Ajout article");
        this._router.navigate([`/upload/`+pri._id]);
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  get form() {
    return this.propositionForm.controls;
  }
}
