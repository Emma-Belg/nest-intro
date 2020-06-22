//It is good practice to make a model for the objects you will be using
//it is a plain/vanilla TS file without decorators as it is just a class for creating objects
export class Product {
    // id: string;
    // title: string;
    // description: string;
    // price: number;

    // constructor(id: string, title: string,  descrip: string, price: number) {
    //     this.id = id;
    //     this.title = title;
    //     this.description = descrip;
    //     this.price = price;
    // }
    //the above is such a common pattern that there is the below shorthand for it
    //don't forget to add the accessor to every param
    constructor(
        public id: string, 
        public title: string,  
        public descrip: string, 
        public price: number) 
        {}
}