import { Inject, Injectable } from "@nestjs/common";
import { ProductDto } from "src/dto/product.dto";
import { Product } from "src/models/product.model";
import { StoreConfigService } from "../../config/Store-config.service";
import { LoggerService } from "../../config/Logger.Service";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductService{
    
    private product: Product[];
    
    constructor(
        @Inject('ConfigService') private configService: StoreConfigService,
        @Inject('AliasedLoggerService') private logger: LoggerService
    ) {
        this.loadProducts();
    }
    // khi sử dụng useExisting
    // private loadProducts(): void {
    //     const filePath = path.join(__dirname, 'data.json'); 
    //     try {
    //         const jsonData = fs.readFileSync(filePath, 'utf8');
    //         this.product = JSON.parse(jsonData)['product'];
    //         this.logger.log('Store Config: ' + this.configService.getConfig());
    //         this.logger.log('Data: ' + JSON.stringify(this.product));
    //     } catch (error) {
    //         this.product = [];
    //     }
    // }
    private loadProducts(): void {
        const filePath = path.join(__dirname, 'data.json'); 
        try {
            const jsonData = fs.readFileSync(filePath, 'utf8');
            this.product = JSON.parse(jsonData)['product'];
            console.log('Store Config:',this.configService.getConfig())
            console.log('Data:',this.product);
        } catch (error) {
            this.product = [];
        }
    }

    private saveProducts() : void{
        const filePath = path.join(__dirname, 'data.json');
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
