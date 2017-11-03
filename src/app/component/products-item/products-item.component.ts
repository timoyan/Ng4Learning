import { Component, OnInit, Input } from '@angular/core';
import { ProductDTO } from '../../def/productDTO';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent implements OnInit {

  @Input('ProductData') productData: ProductDTO;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addToCart(): void {
    this.cartService.AddItem(this.productData, 1);
  }
}
