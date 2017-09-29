import { ShoppingCart } from './models/shopping-cart';
import { Product } from './models/product';
import { async } from '@angular/core/testing';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .map(x => new ShoppingCart(x.items));
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    const res = await this.create();
    localStorage.setItem('cartId', res.key);
    return res.key;
  }

  private getCartId(cartId, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getCartId(cartId, product.$key);

    item$.take(1).subscribe(item => {
      item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: (item.quantity || 0) + change });
    });
  }
}
