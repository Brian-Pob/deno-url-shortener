# Deno URL Shortener

A simple URL shortener built with Deno, Hono, Vite, and Pico CSS.

## Features

- Shorten long URLs into shorter, more manageable links.
- Simple and clean user interface powered by Pico CSS.
- Backend API built with Deno and Hono.
- Frontend built with Vite.
- Deployed on Deno Deploy.
- Links are stored using Deno KV.

## Technologies Used

- [Deno](https://deno.land/) - A modern runtime for JavaScript and TypeScript.
- [Deno Deploy](https://deno.com/deploy) - A global platform for deploying Deno applications.
- [Deno KV](https://deno.com/kv) - A key-value storage service for Deno Deploy.
- [Hono](https://hono.dev/) - A lightweight web framework for Deno.
- [Vite](https://vitejs.dev/) - A fast build tool and development server.
- [Pico CSS](https://picocss.com/) - A minimalist CSS framework for semantic HTML.

## My Setup

### API

The API is deployed on Deno Deploy using a GitHub connection. Any push to the `master` branch will trigger a new deployment.

### UI

The UI is deployed separately on Deno Deploy using `deployctl`.

How I deploy the UI:


1.  Build the UI:

    ```bash
    deno task build
    ```

2.  Deploy the UI:

    ```bash
    deployctl deploy --project=url-shortener-ui --entrypoint=jsr:@std/http/file-server --prod
    ```

## TODO

- [ ] Add a simple captcha to prevent abuse.
- [ ] Implement the ability to add custom short links.
- [ ] Use a custom domain instead of the one provided by Deno Deploy.
- [ ] Add a footer with the repo links and my socials.
