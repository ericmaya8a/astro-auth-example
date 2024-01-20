import type { AstroCookieSetOptions, AstroCookies } from "astro";
import jwt, { type VerifyErrors } from "jsonwebtoken";
import { strings } from "../constants";

type CookieProps = {
  cookies: AstroCookies;
  expiresIn: string | number;
  name: string;
  secret: string;
  username: string;
};

const maxAge = 24 * 60 * 60 * 1000;

const options: AstroCookieSetOptions = {
  httpOnly: true,
  sameSite: "strict",
  path: strings.routes.HOME,
  secure: true,
  maxAge,
};

export function isInvalidToken(token: string, secret: string): boolean {
  let isTokenExpired = false;
  jwt.verify(token, secret, (error: VerifyErrors | null) => {
    if (error) isTokenExpired = true;
  });
  return isTokenExpired;
}

export function decodeToken(token: string | undefined, secret?: string) {
  let decodeValue: string | undefined;
  if (token) {
    jwt.verify(
      token,
      secret ?? strings.cookies.access.secret,
      (error: VerifyErrors | null, decode: any) => {
        if (decode) {
          decodeValue = decode.username;
        }
      }
    );
  }
  return decodeValue;
}

export function createCookie({
  cookies,
  expiresIn,
  name,
  secret,
  username,
}: CookieProps) {
  const token = jwt.sign({ username }, secret, { expiresIn });
  cookies.set(name, token, options);
}

export function deleteCookies(cookies: AstroCookies, cookiesNames: string[]) {
  cookiesNames.forEach((cookie) =>
    cookies.delete(cookie, { path: strings.routes.HOME })
  );
}
