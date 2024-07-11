export const setToken = (accessToken, refreshToken) => {
  window.sessionStorage.setItem("access_token", accessToken);
  window.sessionStorage.setItem("refresh_token", refreshToken);

  return;
};

export const clearToken = () => {
  window.sessionStorage.removeItem("access_token");
  window.sessionStorage.removeItem("refresh_token");

  return;
};
