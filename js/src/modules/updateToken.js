const updateToken = async () => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  const url = `${import.meta.env.VITE_BASE_URL}/auth/refresh`;

  if (refreshToken) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: refreshToken,
        },
      });
      const result = response.json();

      if (result.ok === 1) {
        sessionStorage.setItem("access_token", result.accessToken);
        return true;
      } else {
        throw result.message;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
};

export default updateToken;
