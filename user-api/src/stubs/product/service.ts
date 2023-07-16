/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  GetProductRequest,
  GetProductResponse,
  ListProductsRequest,
  ListProductsResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from "./request";

export const protobufPackage = "product";

export const PRODUCT_PACKAGE_NAME = "product";

export interface ProductServiceClient {
  listProducts(request: ListProductsRequest, metadata?: Metadata): Observable<ListProductsResponse>;

  getProduct(request: GetProductRequest, metadata?: Metadata): Observable<GetProductResponse>;

  createProduct(request: CreateProductRequest, metadata?: Metadata): Observable<CreateProductResponse>;

  updateProduct(request: UpdateProductRequest, metadata?: Metadata): Observable<UpdateProductResponse>;

  deleteProduct(request: DeleteProductRequest, metadata?: Metadata): Observable<DeleteProductResponse>;
}

export interface ProductServiceController {
  listProducts(
    request: ListProductsRequest,
    metadata?: Metadata,
  ): Promise<ListProductsResponse> | Observable<ListProductsResponse> | ListProductsResponse;

  getProduct(
    request: GetProductRequest,
    metadata?: Metadata,
  ): Promise<GetProductResponse> | Observable<GetProductResponse> | GetProductResponse;

  createProduct(
    request: CreateProductRequest,
    metadata?: Metadata,
  ): Promise<CreateProductResponse> | Observable<CreateProductResponse> | CreateProductResponse;

  updateProduct(
    request: UpdateProductRequest,
    metadata?: Metadata,
  ): Promise<UpdateProductResponse> | Observable<UpdateProductResponse> | UpdateProductResponse;

  deleteProduct(
    request: DeleteProductRequest,
    metadata?: Metadata,
  ): Promise<DeleteProductResponse> | Observable<DeleteProductResponse> | DeleteProductResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["listProducts", "getProduct", "createProduct", "updateProduct", "deleteProduct"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_SERVICE_NAME = "ProductService";
