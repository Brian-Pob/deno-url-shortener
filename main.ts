import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { nanoid } from "npm:nanoid";

const BASE_URL = "http://localhost:8080";
const kv = await Deno.openKv();

const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = "Hello World!";
});

router.get("/:id", async (ctx) => {
  const id = ctx.params.id;
  const result = await kv.get([id]);
  if (result.value === null) {
    ctx.response.body = `No url found for ${BASE_URL}/${id}`;
  } else {
    ctx.response.redirect(result.value as string);
  }
});

router.all("/shorten/:url", (ctx) => {
  // Assume :url is an encoded url
  const decodedUrl = decodeURIComponent(ctx.params.url);
  const id = nanoid();
  kv.set([id], decodedUrl);

  console.log(`Shortening ${decodedUrl} to ${BASE_URL}/${id}`);
  ctx.response.body = `Shortened url to ${BASE_URL}/${id}`;
});

router.all("/404", (ctx) => {
  ctx.response.status = 404;
  ctx.response.body = "Not found";
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
