import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  return Response.json([
    {
      id: 1,
      name: "Eric",
    },
    {
      id: 2,
      name: "Jackie",
    },
  ]);
};
