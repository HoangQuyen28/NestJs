import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { StoreConfigService } from "../../config/Store-config.service";
import { DevelopmentConfigService } from "../../config/development-config.service";
import { ProductionConfigService } from "../../config/production-config.service";

// Cung cấp một dịch vụ mô phỏng (mock) cho ProductService, mục đích là để test
const mockProductService = {
    provide: 'MockProductService',  
    useValue: {
        getProducts: () => [{ id: 1, name: 'Mock Product', categoryId: 1, price: 100 }],
    },
};
  
// Cấu hình dịch vụ dựa trên môi trường (development hoặc production)
const configServiceProvider = {
    provide: 'ConfigServiceProvider', 
    useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService,
};

// Dịch vụ Logger được sử dụng để log thông tin
class LoggerService {
    log(message: string) {
      console.log('Log message:', message);
    }
}

// sử dụng dưới tên khác trong module
const loggerAliasProvider = {
    provide: 'AliasedLoggerService',
    useExisting: LoggerService,  
};

// Hàm factory để cung cấp StoreConfigService, giúp tạo ra ConfigService tuỳ biến
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
        //   useValue: mockProductService,  // Dùng dịch vụ mock cho ProductService nếu cần test
        // },
        {
            provide: 'ConfigService',
            useFactory: getConfigService,  // Cung cấp ConfigService từ hàm factory
        },
        {
            provide: LoggerService,
            useClass: LoggerService,  // Cung cấp một instance của LoggerService
        },
        loggerAliasProvider,  
    ],
})
export class ProductModule {};  