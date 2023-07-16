/* eslint-disable */

export const protobufPackage = "product";

export interface Product {
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
}

export interface Category {
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  products?: Product[] | undefined;
}

export const PRODUCT_PACKAGE_NAME = "product";
