/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import {
  CreateCategoryRequest,
  CreateCategoryResponse,
  CreateProductRequest,
  CreateProductResponse,
  DeleteCategoryRequest,
  DeleteCategoryResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  GetCategoryRequest,
  GetCategoryResponse,
  GetProductRequest,
  GetProductResponse,
  ListCategoriesRequest,
  ListCategoriesResponse,
  ListProductsRequest,
  ListProductsResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
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

export interface CategoryServiceClient {
  listCategories(request: ListCategoriesRequest, metadata?: Metadata): Observable<ListCategoriesResponse>;

  getCategory(request: GetCategoryRequest, metadata?: Metadata): Observable<GetCategoryResponse>;

  createCategory(request: CreateCategoryRequest, metadata?: Metadata): Observable<CreateCategoryResponse>;

  updateCategory(request: UpdateCategoryRequest, metadata?: Metadata): Observable<UpdateCategoryResponse>;

  deleteCategory(request: DeleteCategoryRequest, metadata?: Metadata): Observable<DeleteCategoryResponse>;
}

export interface CategoryServiceController {
  listCategories(
    request: ListCategoriesRequest,
    metadata?: Metadata,
  ): Promise<ListCategoriesResponse> | Observable<ListCategoriesResponse> | ListCategoriesResponse;

  getCategory(
    request: GetCategoryRequest,
    metadata?: Metadata,
  ): Promise<GetCategoryResponse> | Observable<GetCategoryResponse> | GetCategoryResponse;

  createCategory(
    request: CreateCategoryRequest,
    metadata?: Metadata,
  ): Promise<CreateCategoryResponse> | Observable<CreateCategoryResponse> | CreateCategoryResponse;

  updateCategory(
    request: UpdateCategoryRequest,
    metadata?: Metadata,
  ): Promise<UpdateCategoryResponse> | Observable<UpdateCategoryResponse> | UpdateCategoryResponse;

  deleteCategory(
    request: DeleteCategoryRequest,
    metadata?: Metadata,
  ): Promise<DeleteCategoryResponse> | Observable<DeleteCategoryResponse> | DeleteCategoryResponse;
}

export function CategoryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "listCategories",
      "getCategory",
      "createCategory",
      "updateCategory",
      "deleteCategory",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CategoryService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CategoryService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CATEGORY_SERVICE_NAME = "CategoryService";
