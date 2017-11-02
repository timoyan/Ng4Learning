import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../def/product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  productList: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.GetProducts().subscribe(pl => {
      console.log(pl);
      this.productList = pl;
    });
  }

}
