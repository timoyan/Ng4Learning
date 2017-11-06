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
  public _productData: ProductDTO;

  constructor(private cartService: CartService) { 
    this._productData = this.productData;
  }

  ngOnInit() {
  }

  addToCart(e): void {
    this.cartService.AddItem(this.productData, 1);
  }
}
