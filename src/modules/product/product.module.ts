import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService} from "./product.service";
import { StoreConfigService } from "../../config/Store-config.service";
// import { DevelopmentConfigService } from "../../config/development-config.service";
// import { ProductionConfigService } from "../../config/production-config.service";


// const mockProductService = {
//     provide: 'MockProductService',  
//     useValue: {
//         getProducts: () => [{ id: 1, name: 'Mock Product', categoryId: 1, price: 100 }],
//     },
// };
  
// const configServiceProvider = {
//     provide: 'ConfigServiceProvider', 
//     useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService,
// };

class LoggerService {
    log(message: string) {
      console.log('Log message:', message);
    }
  }
  
  const loggerAliasProvider = {
    provide: 'AliasedLoggerService',
    useExisting: LoggerService,
  };
  
function getConfigService(): StoreConfigService {
    console.log('ConfigService');
    return new StoreConfigService();
}


@Module({
    controllers: [ProductController],
    providers: [

        ProductService,
        // {
        //   provide: ProductService,  
        //   useValue: mockProductService,  
        // },
       
        {
            provide: 'ConfigService',
            useFactory: getConfigService,
        },
        {
            provide: LoggerService,
            useClass: LoggerService,
        },
        loggerAliasProvider,
    ],
})

export class ProductModule {};
