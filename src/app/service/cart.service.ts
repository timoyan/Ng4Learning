import { Injectable } from '@angular/core';
import { CartDTO, CartProductDTO } from '../def/cartDTO';
import { v4 as uuid } from 'uuid';
import { ProductDTO } from '../def/productDTO';
import { Utils } from '../utility/utils';

@Injectable()
export class CartService {

  _cart: CartDTO = {} as CartDTO;

  constructor() {
    this._cart.guid = uuid();
    this._cart.productList = [] as CartProductDTO[];
  }

  AddItem(product: ProductDTO, amount: number): void {
    let existedPrd = this.GetCartProduct(product.name);

    if (existedPrd === undefined) {
      this._cart.productList.push({ product: product, amount: amount } as CartProductDTO);
    } else {
      existedPrd.amount = (existedPrd.amount | 0) + 1;
    }

    console.log(this._cart);
  }

  RemoveItem(product: ProductDTO): void {
    const pindex = this.GetProductListIndex(product);
    if (!!pindex || pindex === 0) {
      this._cart.productList.splice(pindex, 1);
    }
  }

  ChangeItemAmount(product: ProductDTO, finalAmount: number): boolean {
    let existedPrd = this.GetCartProduct(product.name);

    if (existedPrd !== undefined && Utils.isInteger(finalAmount)) {
      if (finalAmount <= 0) {
        if (window.confirm(`Are you sure getting rid of this item ${product.name}`)) {
          this.RemoveItem(product);
        } else {
          return false;
        }
      } else {
        existedPrd.amount = finalAmount;
      }
    } else {
      return false;
    }

    return true;
  }

  GetItemAmount(): number {
    return this._cart.productList.length;
  }

  GetTotalMoney(): number {
    let result: number = 0;

    this._cart.productList.forEach(prd => {
      result += (prd.product.price) * (prd.amount);
    });

    return result;
  }

  Checkout(): void {
    alert(JSON.stringify(this._cart));
  }

  private GetProductListIndex(product: ProductDTO): number {
    return this._cart.productList.findIndex(q => q.product.name === product.name);
  }

  private GetCartProduct(productName: string): CartProductDTO {
    return this._cart.productList.find(q => q.product.name === productName);
  }
}