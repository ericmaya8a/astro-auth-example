export const strings = {
  expiresIn: {
    short: "30m",
    long: "1d",
  },
  cookies: {
    access: {
      name: import.meta.env.ACCESS_TOKEN_COOKIE_NAME,
      secret: import.meta.env.ACCESS_TOKEN_SECRET,
    },
    refresh: {
      name: import.meta.env.REFRESH_TOKEN_COOKIE_NAME,
      secret: import.meta.env.REFRESH_TOKEN_SECRET,
    },
  },
  routes: {
    HOME: "/",
    SIGN_IN: "/signin",
    DASHBOARD: "/dashboard",
    REGISTER: "/register",
  },
  api: {
    LOGOUT: "/api/auth/signout",
    SIGN_IN: "/api/auth/signin",
    REGISTER: "/api/auth/register",
  },
} as const;
