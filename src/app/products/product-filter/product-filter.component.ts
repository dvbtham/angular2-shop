import { Product } from './../../models/product';
import { CategoryService } from './../../category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
   @Input('category') category;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
   }

}
