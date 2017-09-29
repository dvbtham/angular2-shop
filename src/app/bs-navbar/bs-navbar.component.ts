import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from './../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
// tslint:disable-next-line:one-line
export class BsNavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  subscription: Subscription;

  constructor(private auth: AuthService,
    private shoppingCartSerivce: ShoppingCartService) {

  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.subscription = this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartSerivce.getCart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
