/* eslint-disable */
import { User, UserRole } from "../user/message";

export const protobufPackage = "auth";

export interface LoginRequest {
  email?: string | undefined;
  password?: string | undefined;
  ip?: string | undefined;
}

export interface LoginResponse {
  refreshToken?: string | undefined;
  jwt?: string | undefined;
  status?: LoginResponse_STATUS | undefined;
  user?: User | undefined;
}

export enum LoginResponse_STATUS {
  OK = 0,
  WRONG_PASSWORD = 1,
  NOT_FOUND = 2,
  INTERNAL = 3,
  UNRECOGNIZED = -1,
}

export interface RefreshTokenRequest {
  refreshToken?: string | undefined;
  ip?: string | undefined;
}

export interface RefreshTokenResponse {
  refreshToken?: string | undefined;
  jwt?: string | undefined;
  userId?: string | undefined;
}

export interface ValidateRequest {
  jwt?: string | undefined;
}

export interface ValidateResponse {
  ok?: boolean | undefined;
  userId?: string | undefined;
  userEmail?: string | undefined;
  userRole?: UserRole | undefined;
  internal?: boolean | undefined;
}

export const AUTH_PACKAGE_NAME = "auth";
