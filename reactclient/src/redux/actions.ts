export const login = (isLoggedIn: boolean) => ({
  type: isLoggedIn ? "LOGGED_IN" : "LOGGED_OUT"
});
