import { IsNotEmpty, IsNumber, MinLength } from "class-validator";

export class ProductDto{
    @IsNotEmpty({message:'khong duoc rong'})
    categoryId? : number;

    @MinLength(5,{message:'Tu 5 ky tu tro len'})
    productName? : string;

    @IsNumber()
    price? : number;

}