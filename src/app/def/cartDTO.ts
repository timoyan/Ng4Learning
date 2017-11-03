import { ProductDTO } from "./productDTO";

export interface CartDTO {
    guid: string;
    productList: CartProductDTO[];
}

export interface CartProductDTO {
    product: ProductDTO;
    amount: number;
}