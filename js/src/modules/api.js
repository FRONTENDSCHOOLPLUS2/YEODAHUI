// fetch 함수에 method, auth 헤더 지정한 get/post/patch/delete 메소드 제공
import updateToken from "./updateToken";

const RETRY_LIMIT = 2; // 요청에 실패했을 때, 재요청 보낼 수 있는 횟수

const httpRequest = async (url, method, config = {}, retryCount = 0) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
      ...config,
    });
    const result = response.json();

    if (result.ok === 1) {
      return result;
    } else if (result.ok === 0 && result?.error === "TokenExpiredError") {
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
    console.error(error.message);
    throw error;
  }
};

const api = {
  get: async (url, config = {}) => {
    try {
      return httpRequest(url, "GET", { ...config });
    } catch (error) {
      console.error(error.message);
    }
  },
  post: async (url, body, config = {}) => {
    try {
      return httpRequest(url, "POST", { ...config, body: body });
    } catch (error) {
      console.error(error.message);
    }
  },
  patch: async (url, body, config = {}) => {
    try {
      return httpRequest(url, "PATCH", { ...config, body: body });
    } catch (error) {
      console.error(error.message);
    }
  },
  delete: async (url, config = {}) => {
    try {
      return httpRequest(url, "DELETE", { ...config });
    } catch (error) {
      console.error(error.message);
    }
  },
};

export default api;
