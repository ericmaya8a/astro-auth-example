import { defineMiddleware } from "astro:middleware";
import { strings } from "./constants";
import {
  createCookie,
  decodeToken,
  deleteCookies,
  isInvalidToken,
} from "./utils";

const protectedRoutes: string[] = [strings.routes.DASHBOARD];

export const onRequest = defineMiddleware(
  ({ url, cookies, redirect }, next) => {
    const accessToken = cookies.get(strings.cookies.access.name);
    const refreshToken = cookies.get(strings.cookies.refresh.name);
    const isProtectedRoute = protectedRoutes.includes(url.pathname);

    if (
      !isProtectedRoute &&
      url.pathname === strings.routes.SIGN_IN &&
      accessToken &&
      refreshToken
    )
      return redirect(strings.routes.DASHBOARD);

    if (isProtectedRoute && (!accessToken || !refreshToken))
      return redirect(strings.routes.SIGN_IN);

    if (isProtectedRoute && accessToken && refreshToken) {
      if (isInvalidToken(accessToken.value, strings.cookies.access.secret)) {
        if (
          isInvalidToken(refreshToken.value, strings.cookies.refresh.secret)
        ) {
          deleteCookies(cookies, [
            strings.cookies.access.name,
            strings.cookies.refresh.name,
          ]);
          return redirect(strings.routes.SIGN_IN);
        }
        const username =
          decodeToken(refreshToken.value, strings.cookies.refresh.secret) ?? "";
        createCookie({
          cookies,
          expiresIn: strings.expiresIn.short,
          name: strings.cookies.access.name,
          secret: strings.cookies.access.secret,
          username,
        });
      }
    }

    return next();
  }
);
