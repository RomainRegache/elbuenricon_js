import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Auth } from '../shared/interfaces/Auth';
import { Credential } from '../shared/interfaces/User';
import { AuthService } from '../shared/services/auth/auth.service';
import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(private _user: UserService,
    private _auth: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      pseudo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const cred: Credential = {
        pseudo: this.loginForm.get('pseudo')?.value,
        password: this.loginForm.get('password')?.value,
        email:"null",
        id: 0,
        idTypeUser: 0,
        nom: "null",
        prenom: "null",
        pathPhotoProfil: "this.registerForm.get('pathPhotoProfil')?.value",
        ville: "null",
        adresse1: "null",
        adresse2: "null",
        codePostal: 0
      }
      this._user.login(cred).subscribe({
        next: (data: Auth) => {
          this._auth.saveToken(data.token);
          this._router.navigate(['home']);
        },
        error: (httpError: HttpErrorResponse) => {
          if (httpError.status === 401) {
            this.openSnackBar("Identifiants incorrects", "Login")
          } else {
            this.openSnackBar("Une erreur est survenue durant l'authentification.", "Login");
          }
        }
      })
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  get form() {
    return this.loginForm.controls;
  }
}
