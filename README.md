<div>
    <img src="static/images/readme.png"/>
</div>

# Astro Auth Example

This is a Auth example with [prisma](https://www.prisma.io/) and [postgres](https://www.postgresql.org/) using [Astro](https://astro.build/)

## 🛠️ Stack

- <img src="static/images/astro.svg" height="20"/> [Astro](https://astro.build/)
- <img src="static/images/react.svg" height="20"/> [React](https://react.dev/)
- <img src="static/images/react-hook-form.svg" height="20"/> [React Hook Form](https://react-hook-form.com/)
- <img src="static/images/prisma.svg" height="20"/> [Prisma.io](https://www.prisma.io/docs)
- <img src="static/images/postgres.svg" height="20"/> [Postgres](https://www.postgresql.org/docs/)
- <img src="static/images/zod.svg" height="20"/> [Zod](https://zod.dev/)
- <img src="static/images/docker.svg" height="20"/> [docker compose](https://docs.docker.com/compose/)

## Getting Started

1. Install [`docker desktop`](https://docs.docker.com/desktop/install/mac-install/)
2. Install dependencies:

```sh
yarn install
```

3. Set your environment variables (example in `.env.example` file)

4. Start postgres container, seed data and run development server:

```sh
yarn dev:up
```

5. Open [http://localhost:4321](http://localhost:4321) with your browser.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                                                             |
| :------------------ | :--------------------------------------------------------------------------------- |
| `yarn install`      | Installs dependencies                                                              |
| `yarn run dev:up`   | Start a postgres db with seed data and starts local dev server at `localhost:4321` |
| `yarn run dev`      | Starts local dev server at `localhost:4321`                                        |
| `yarn run dev:down` | Stop local dev server and remove postgres db                                       |
