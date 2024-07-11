const authCheck = (): boolean => {
  const access_token = sessionStorage.getItem("access_token");

  if (access_token) {
    return true;
  } else {
    return false;
  }
};

export default authCheck;
