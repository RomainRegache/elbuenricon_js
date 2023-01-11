import { Component, OnInit } from '@angular/core';
import { CommentService } from '../shared/services/comment/comment.service';
import { Comment } from '../shared/interfaces/Comment';
import { AuthService } from '../shared/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pseudo: string = "";
  comments: Comment[] = [];

  constructor(private _comm: CommentService,
    private _auth: AuthService,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog,
    private _router: Router) { }

  ngOnInit(): void {
    this.pseudo = this._auth.getPseudo();
    this.getAllComments();
  }

  isConnected(): boolean {
    return this._auth.isConnected();
  }

  deleteComment(comm: Comment) {
    if (comm._id) {
      this._comm.deleteComment(comm._id).subscribe({
        next: () => {
          this.openSnackBar("Le commentaire a bien été supprimé.", "Home");
          this.getAllComments();
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

  editComment(id: string | undefined) {
    if (id) {
      this._router.navigate(['/edit-comment', id]);
    } else {
      this.openSnackBar("Une erreur est survenue pour la modification du commentaire.", "Home");
    }
  }

  private getAllComments() {
    this._comm.getAllComments().subscribe((comments: Comment[]) => {
      this.comments = comments;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  OnClicRedirect(page: string) {
    this._router.navigateByUrl(page)
  }
}
