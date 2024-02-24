export const getLocalAccessToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
