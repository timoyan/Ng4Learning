import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ProductDTO } from '../../def/productDTO';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProductsItemComponent } from '../products-item/products-item.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  productList: ProductDTO[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.GetProducts().subscribe(pl => {
      console.log(pl);
      this.productList = pl;
    });
  }

}
