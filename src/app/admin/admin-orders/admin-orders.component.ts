import { OrderService } from './../../order.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent  {
  @Input('orders$') orders$;
  constructor(private orderService: OrderService) {
    this.orders$ = orderService.getOrders();
   }

}
