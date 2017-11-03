import { Injectable } from '@angular/core';
import { CartDTO, CartProductDTO } from '../def/cartDTO';
import { v4 as uuid } from 'uuid';
import { ProductDTO } from '../def/productDTO';

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
      this._cart.productList = this._cart.productList.splice(pindex, 1);
    }
  }

  ChangeItemAmount(product: ProductDTO, minusAmount: number): void {
    let existedPrd = this.GetCartProduct(product.name);

    if (existedPrd !== undefined) {
      if (Math.abs(existedPrd.amount) - Math.abs(minusAmount) <= 0) {
        this.RemoveItem(product);
      } else {
        existedPrd.amount = Math.abs(existedPrd.amount) - Math.abs(minusAmount);
      }
    }
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

  private GetProductListIndex(product: ProductDTO): number {
    return this._cart.productList.findIndex(q => q.product.name === product.name);
  }

  private GetCartProduct(productName: string): CartProductDTO {
    return this._cart.productList.find(q => q.product.name === productName);
  }
}