import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Credential } from '../shared/interfaces/User';
import { UserService } from '../shared/services/user/user.service';
import { ConfirmedValidator } from '../shared/validators/password.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});

  constructor(private _fb: FormBuilder, private _user: UserService, private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      pseudo: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      nom: ['',Validators.required],
      prenom: ['',Validators.required],
      adresse1: ['',Validators.required],
      adresse2: ['',Validators.required],
      ville: ['',Validators.required],
      codePostal: ['',Validators.required],
      pathPhotoProfil: ['',Validators.required, Validators.required],
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    })
  }

  register(): void {
    const cred: Credential = {
      pseudo: this.registerForm.get('pseudo')?.value,
      password: this.registerForm.get('password')?.value,
      email: this.registerForm.get('email')?.value,
      id: 0,
      idTypeUser: 0,
      nom: this.registerForm.get('nom')?.value,
      prenom: this.registerForm.get('prenom')?.value,
      pathPhotoProfil: "this.registerForm.get('pathPhotoProfil')?.value",
      ville: this.registerForm.get('ville')?.value,
      adresse1: this.registerForm.get('adresse1')?.value,
      adresse2: this.registerForm.get('adresse2')?.value,
      codePostal: this.registerForm.get('codePostal')?.value
    }
    this._user.register(cred).subscribe({
      next: () => {
        this._router.navigate(['/login']);
      },
      error: (httpError: HttpErrorResponse) => {
        if (httpError.status === 400 && JSON.stringify(httpError.error).includes('duplicate')) {
          this.openSnackBar("Le pseudo est déjà utilisée.", "Enregistrement");
        } else {
          this.openSnackBar("Une erreur est survenue durant l'enregistrement.", "Enregistrement");
        }
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  get form() {
    return this.registerForm.controls;
  }
}
