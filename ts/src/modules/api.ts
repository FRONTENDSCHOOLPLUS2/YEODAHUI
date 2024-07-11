// fetch 함수에 method, auth 헤더 지정한 get/post/patch/delete 메소드 제공
import { Method, API } from "#types/api";
import updateToken from "@modules/updateToken";

const RETRY_LIMIT = 2; // 요청에 실패했을 때, 재요청 보낼 수 있는 횟수

const httpRequest = async (
  url: string,
  method: Method,
  config: RequestInit = {},
  retryCount: number = 0
) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
      ...config,
    });
    const result = await response.json();

    console.log(result);

    if (result.ok === 0 && result?.errorName === "TokenExpiredError") {
      if (retryCount < RETRY_LIMIT) {
        const isTokenUpdated = await updateToken();

        if (isTokenUpdated) {
          return httpRequest(url, method, config, retryCount + 1);
        } else {
          throw result.message;
        }
      } else {
        throw result.message;
      }
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return error;
    }
  }
};

const api: API = {
  get: async (url, config = {}) => {
    return await httpRequest(url, "GET", { ...config });
  },
  post: async (url, body, config = {}) => {
    return await httpRequest(url, "POST", { ...config, body: body });
  },
  patch: async (url, body, config = {}) => {
    return await httpRequest(url, "PATCH", { ...config, body: body });
  },
  delete: async (url, config = {}) => {
    return await httpRequest(url, "DELETE", { ...config });
  },
};

export default api;
