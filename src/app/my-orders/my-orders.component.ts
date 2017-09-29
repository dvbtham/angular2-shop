import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;
  constructor(private orderService: OrderService, private authServie: AuthService) {
    this.orders$ = authServie.user$.switchMap(u => orderService.getOrderByUserId(u.uid));
  }
}
