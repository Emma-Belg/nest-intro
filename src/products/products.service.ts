import { Injectable } from "@nestjs/common";
import {Product} from './product.model';

@Injectable()
export class ProductsService{
    private products: Product[] = [];

    insertProduct(title: string, descrip: string, price: number){
        //just using Date as a dumy ID
        //you could use Node Express packages to create an ID
        const prodId = new Date().toString();
        const newProduct = new Product(prodId, title, descrip, price)
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        //use the spread to  help minimise likelihood of products array being tampered with
        return [...this.products];
    }
}