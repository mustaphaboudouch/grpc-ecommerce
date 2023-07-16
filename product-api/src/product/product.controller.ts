import { Controller, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { ProfanityService } from 'src/profanity/profanity.service';
import { GrpcAuthGuard } from 'src/auth/auth.guard';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ProductService } from './product.service';
import {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  GetProductRequest,
  GetProductResponse,
  ListProductsResponse,
} from 'src/stubs/product/request';
import { CreateProductDto } from './entity/product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private profanityService: ProfanityService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @GrpcMethod('ProductService')
  async GetProduct(request: GetProductRequest): Promise<GetProductResponse> {
    const name = request.name;

    try {
      const product = await this.productService.find('', name);

      const pbProduct = this.productService.toProductPb(product);

      return { product: pbProduct };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(error);
    }
  }

  @GrpcMethod('ProductService')
  async ListProducts(): Promise<ListProductsResponse> {
    try {
      const products = await this.productService.findAll();

      return {
        products: products.map(this.productService.toProductPb),
        nextPageToken: '',
      };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(error);
    }
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('ProductService')
  async CreateProduct(
    request: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    try {
      await this.validateDto(request.product, CreateProductDto);
      const nProduct = {
        name: request.product.name,
        description: request.product.description,
        price: request.product.price,
      };
      if (!nProduct.name)
        throw new RpcException({
          message: 'No name provided',
          code: HttpStatus.BAD_REQUEST,
          status: status.INVALID_ARGUMENT,
        });

      this.profanityService.checkProduct(request.product);

      const product = await this.productService.create(nProduct);
      const pbProduct = this.productService.toProductPb(product);

      return { product: pbProduct };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(error);
    }
  }

  @GrpcMethod('ProductService')
  async DeleteProduct(
    request: DeleteProductRequest,
  ): Promise<DeleteProductResponse> {
    try {
      const product = await this.productService.deleteProduct(request.name);
      const pbProduct = this.productService.toProductPb(product);

      return { product: pbProduct };
    } catch (error) {
      this.logger.error(error);

      throw new RpcException(error);
    }
  }

  private async validateDto(data: any, Dto: any) {
    if (!data) {
      throw new RpcException({
        message: 'No data provided',
        code: status.INVALID_ARGUMENT,
      });
    }
    const dto = plainToInstance(Dto, data);
    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: errors
          .map(
            ({ value, property, constraints }) =>
              `${value} is not a valid ${property} value (${Object.values(
                constraints,
              ).join(', ')})`,
          )
          .join('\n'),
      });
    }
  }
}
