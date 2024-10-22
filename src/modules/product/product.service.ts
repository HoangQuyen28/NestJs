import { Injectable } from "@nestjs/common";
import { ProductDto } from "src/dto/product.dto";
import { Product } from "src/models/product.model";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductService{
    
    private product: Product[];

    constructor() {
        this.loadProducts();
    }
    private loadProducts(): void {
        const filePath = path.join(__dirname, '/data.json'); 
        try{
            const jsonData = fs.readFileSync(filePath, 'utf8');
            this.product = JSON.parse(jsonData)['product'];
        }catch(error){
            console.error("loi doc file", error)
            this.product = [];
        }
        
    }

    private saveProducts() : void{
        const filePath = path.join(__dirname, '/data.json');
        const data = JSON.stringify({'product' : this.product},null,2)
        try {
            fs.writeFileSync(filePath, data, 'utf8');
        } catch (error) {
            console.error("Loi ghi file", error);
        }
    }

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
        this.product.push(product);
        this.saveProducts();
        return product;
    }

    updateProduct(productDto: ProductDto,id:number): Product{
        const index = this.product.findIndex(item => item.id === Number(id))
        this.product[index].categoryId= productDto.categoryId;
        this.product[index].productName = productDto.productName;
        this.product[index].price = productDto.price
        this.saveProducts();
        return this.product[index]
    }

    deleteProduct(id:Number): boolean{
        const index = this.product.findIndex(item => item.id === Number(id));
        if(index !== -1){
            this.product.splice(index,1);
            this.saveProducts();
            return true;
        }
        return false;
    }
}