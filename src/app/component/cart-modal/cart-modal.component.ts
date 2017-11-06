import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartDTO } from '../../def/cartDTO';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {

  public _cart: CartDTO = {} as CartDTO;


  constructor(public activeModal: NgbActiveModal, private cartService: CartService) { }

  ngOnInit() {
    //console.log(this._cart);
  }

  GetTotalPrice(): number {
    let result: number = 0;

    this._cart.productList.forEach(cartPrd => {
      result += cartPrd.product.price * cartPrd.amount;
    });

    return result;
  }
  Checkout(): void {
    if ((this._cart.productList).length === 0) {
      alert('Nothing in your cart!');
      this.activeModal.close();
      return;
    }

    this.cartService.Checkout();

    //TODO:POST Cart
  }
}
