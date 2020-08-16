import { Injectable, NotFoundException } from "@nestjs/common";
import {Product} from './product.model';

@Injectable()
export class ProductsService{
    private products: Product[] = [];

    insertProduct(title: string, descrip: string, price: number){
        //just using Date as a dumy ID
        //you could use Node Express packages to create an ID
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, descrip, price)
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        //use the spread to  help minimise likelihood of products array being tampered with
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return {...product};
    }

    updateProduct(productId: string, title: string, descrip: string, price: number){
        //const product = this.findProduct(productId)[0];
        //const index = this.findProduct(productId)[1];
        //This array destructuring is the same as having the 2 constants above
        const [product, index] =  this.findProduct(productId);
        //We want to match title to title, price to price etc BUT b/c a user
        //could enter a product without a decrip for example, we need to ensure that we don't override existing data with null/undefined values
        const updatedProduct = {...product};
        if(title){
            updatedProduct.title = title;
        }
        if(descrip){
            updatedProduct.descrip = descrip;
        }
        if(price){
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }

    deleteProduct(productId: string){
        //const index = this.findProduct(productId)[1];
        const [_, index] = this.findProduct(productId);
        //there are several ways to do this, you could use the filter method
        console.log([_, index]);
        this.products.splice(index, 1);
    }

    //the return type here is a tuple. It is not a normal array but a specific array as we have set it out (only 2 elements, a Product and a number)
    private findProduct(id: string): [Product, number]{
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if (!product){
            throw new NotFoundException('could not find product');
        }
        return [product, productIndex];
    }

}