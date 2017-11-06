import { Component, OnInit, Input, HostListener, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { CartProductDTO } from '../../def/cartDTO';
import { CartService } from '../../service/cart.service';
import { CartModalRowStateEnum } from '../../def/EnumDef';

@Component({
  selector: 'app-cart-modal-row',
  templateUrl: './cart-modal-row.component.html',
  styleUrls: ['./cart-modal-row.component.scss']
})
export class CartModalRowComponent implements OnInit, AfterContentInit {


  @Input('cartPrd') _cartPrd: CartProductDTO;
  @ViewChild('txtAmount') txtAmount;

  public rowStateEnum = CartModalRowStateEnum;
  private rowState: CartModalRowStateEnum;


  constructor(private cartService: CartService, private eRef: ElementRef) {
    this.rowState = CartModalRowStateEnum.Display;
  }

  ngOnInit() {

  }

  ngAfterContentInit(): void {

  }

  toggleRowState(e): void {
    if (this.rowState === CartModalRowStateEnum.Display) {
      this.rowState = CartModalRowStateEnum.Edit;
      let triggerSelect = setInterval(() => {
        this.txtAmount.nativeElement.select();
        clearInterval(triggerSelect);
      }, 100);
    } else {
      this.rowState = CartModalRowStateEnum.Display;
    }
  }

  changeAmount(e): void {
    if (!this.cartService.ChangeItemAmount(this._cartPrd.product, e.target.value)) {
      this.toggleRowState(e);
    }
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event) {
    if (!!this.txtAmount) {
      if (this.eRef.nativeElement.contains(this.txtAmount.nativeElement)) {
        return;
      } else {
        this.rowState = CartModalRowStateEnum.Display;
      }
    }
  }
}
