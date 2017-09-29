import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private route: Router,
    private service: UserService) {

    this.auth.user$.subscribe(user => {
      if (!user) return;

      service.save(user);
      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;
      localStorage.removeItem('returnUrl');
      this.route.navigateByUrl(returnUrl);

    });
  }
}
