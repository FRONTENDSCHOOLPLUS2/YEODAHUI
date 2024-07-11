import { Image } from "./user";

export type Method = "GET" | "POST" | "PATCH" | "DELETE";

export interface APIResponse {
  ok: 0 | 1;
  [key: string]: unknown;
}

export interface ErrorResponse extends APIResponse {
  ok: 0;
  message?: string;
  errorName?: "EmptyAuthorization | TokenExpiredError | JsonWebTokenError";
}

export interface ImageUploadResponse extends APIResponse {
  item: Image[];
}

export interface APIParameters {
  url: string;
  body: BodyInit;
  config: RequestInit;
}

export interface API {
  get: <T>(url: string, config?: RequestInit) => Promise<T>;
  post: <T>(url: string, body: BodyInit, config?: RequestInit) => Promise<T>;
  patch: <T>(url: string, body: BodyInit, config?: RequestInit) => Promise<T>;
  delete: <T>(url: string, config?: RequestInit) => Promise<T>;
}
