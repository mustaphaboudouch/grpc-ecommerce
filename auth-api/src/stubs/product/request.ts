/* eslint-disable */
import { Product } from "./message";

export const protobufPackage = "product";

export interface ListProductsRequest {
  parent?: string | undefined;
  pageSize?: number | undefined;
  pageToken?: string | undefined;
}

export interface ListProductsResponse {
  products?: Product[] | undefined;
  nextPageToken?: string | undefined;
}

export interface GetProductRequest {
  name?: string | undefined;
}

export interface GetProductResponse {
  product?: Product | undefined;
}

export interface CreateProductRequest {
  parent?: string | undefined;
  productId?: string | undefined;
  product?: Product | undefined;
}

export interface CreateProductResponse {
  product?: Product | undefined;
}

export interface UpdateProductRequest {
  product?: Product | undefined;
}

export interface UpdateProductResponse {
  product?: Product | undefined;
}

export interface DeleteProductRequest {
  name?: string | undefined;
}

export interface DeleteProductResponse {
  product?: Product | undefined;
}

export const PRODUCT_PACKAGE_NAME = "product";
