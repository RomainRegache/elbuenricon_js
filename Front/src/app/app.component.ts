import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _auth: AuthService,
    private _router: Router) {
  }

  isConnected(): boolean {
    return this._auth.isConnected();
  }

  disconnect() {
    this._auth.disconnect();
    this._router.navigate(['/home']);
  }
}
