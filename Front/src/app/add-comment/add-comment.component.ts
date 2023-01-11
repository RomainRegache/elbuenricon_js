import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../shared/interfaces/Comment';
import { AuthService } from '../shared/services/auth/auth.service';
import { CommentService } from '../shared/services/comment/comment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  idComment = "";
  isEditing = false;
  commentForm: FormGroup = new FormGroup({});

  constructor(private _auth: AuthService,
    private _comm: CommentService,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.commentForm = this._fb.group({
      pseudo: [{value: this._auth.getPseudo(), disabled: true}, Validators.required],
      comment: ['', Validators.required]
    });

    this.idComment = this._route.snapshot.params.id;
    if (this.idComment) {
      this.isEditing = true;
      this._comm.getCommentById(this.idComment).subscribe({
        next: (comm: Comment) => {
          this.commentForm.get('comment')?.setValue(comm?.comment);     
        },
        error: () => {
          this.openSnackBar("Une erreur est survenue lors du chargement du commentaire.", "Modification Commentaire")
        }
      });
    }
  }

  sendComment() {
    if (this.commentForm.valid) {
      const comm: Comment = {
        pseudo: this.commentForm.get('pseudo')?.value,
        comment: this.commentForm.get('comment')?.value
      }

      if (this.isEditing) {
        this.editComment(comm);
      } else {
        this.addComment(comm);
      }
    }
  }

  addComment(comm: Comment) {
    this._comm.postComment(comm).subscribe({
      next: () => {
        this.openSnackBar("Le commentaire a été correctement posté.", "Ajout Commentaire");
        this._router.navigate(['/home']);
      },
      error: (httpError: HttpErrorResponse) => {
        if (httpError.status === 401) {
          this.openSnackBar("Le pseudo renseigné ne correspond pas à votre compte.", "Ajout Commentaire")  
        } else {
          this.openSnackBar("Une erreur est survenue durant l'ajout du commentaire.", "Ajout Commentaire")
        }
      }
    });
  }

  editComment(comm: Comment) {
    this._comm.putComment(this.idComment, comm).subscribe({
      next: () => {
        this.openSnackBar("Le commentaire a été correctement modifié.", "Ajout Commentaire");
        this._router.navigate(['/home']);
      },
      error: (httpError: HttpErrorResponse) => {
        if (httpError.status === 401) {
          this.openSnackBar("Le pseudo renseigné ne correspond pas à votre compte.", "Ajout Commentaire")  
        } else {
          this.openSnackBar("Une erreur est survenue durant la modification du commentaire.", "Ajout Commentaire")
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
    return this.commentForm.controls;
  }
}
