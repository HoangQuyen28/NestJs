import { Injectable } from "@nestjs/common";
import { ProductDto } from "src/dto/product.dto";
import { Product } from "src/models/product.model";

@Injectable()
export class ProductService{

    private product : Product[]=[
        {id:1, categoryId:1, productName:'ban phim', price:1212},
        {id:2, categoryId:2, productName:'chuot', price:222},
        {id:3, categoryId:3, productName:'laptop', price:333},
    ]
    getProducts(): Product[]{
        return this.product
    }

    detailProduct(id:number): Product{
        return this.product.find(item => item.id === Number(id))
    }

    createProduct(productDto: ProductDto):  Product{
        const product: Product = {
             id: Math.random(),
            ...productDto
        }
        this.product.push(product)
        return product;
    }

    updateProduct(productDto: ProductDto,id:number): Product{
        const index = this.product.findIndex(item => item.id === Number(id))
        this.product[index].categoryId= productDto.categoryId;
        this.product[index].productName = productDto.productName;
        this.product[index].price = productDto.price
        return this.product[index]
    }

    deleteProduct(id:Number): boolean{
        const index = this.product.findIndex(item => item.id === Number(id));
        if(index !== -1){
            this.product.splice(index,1);
            return true;
        }
        return false;
    }
}