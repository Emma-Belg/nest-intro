import { Controller, Post, Body, Get , Param, Patch, Delete} from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    //the readonly is a TS feature
    //it ensures that you will never replace 'productService' with a new value
    constructor(private readonly productsService: ProductsService){}

    @Post()
    //instead of using (req, res) like in Express you used the @Body decorator
    //you add @Body decorator before your param
    //in the @Body param you specify the field in the incoming request body that should hold the value which Nestjs will extract for you from that body and give you in the connected param of the addProduct
    //with the @Body, Nestjs will look at the incoming requst, parse the incoming request body, then look in that object  for a title property, and take the value of that property and then give it to us in the connected param
    //you can see there is a @Body decorator per param
    //you could also do it a 2nd way (as seen in 1st comment below)
    addProduct(
        //@Body() completeBody: {title: string, desrip: string, price:number}
        @Body('title') prodTitle: string, 
        @Body('descrip') prodDescrip: string, 
        @Body('price') prodPrice: number) {
        const generatedId = this.productsService.insertProduct(
            prodTitle, 
            prodDescrip, 
            prodPrice
            );
        return {id: generatedId};
    }

    //in the param you could handle for the path but we don't want to here
    //if you have two products in the same file with the same decorator, it will never look past the first
    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    //as GET methods cannot update the body you cannot use @Body with a Get method
    @Get(':id')
    getProduct(@Param('id') prodId: string){
        return this.productsService.getSingleProduct(prodId);
    }

    //b/c this will be merging with exisiting product with use PATCH
    //we chose to use the url rather than the @Body (you can use either or both)
    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string, 
        @Body('title') prodTitle: string, 
        @Body('descrip') prodDescrip: string, 
        @Body('price') prodPrice: number
        ) : void {
            this.productsService.updateProduct(prodId, prodTitle, prodDescrip, prodPrice);
            return null;
    }

    //DELETE requests do not accept a request Body (unline Post and Patch do)
    //therefore we need to use the @Param
    @Delete(':id')
    removeProduct(@Param('id') prodId: string) : void {
        this.productsService.deleteProduct(prodId);
        return null;
    }
}