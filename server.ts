/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { route } from "jsr:@oak/oak/serve";
import { nanoid } from "npm:nanoid";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const PORT = 8080;
const BASE_URL = Deno.env.get("URL") ?? `http://localhost:${PORT}`;
const kv = await Deno.openKv();

const app = new Application();
app.use(
	oakCors({
		origin: "https://url-shortener-ui.deno.dev",
	}),
);

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

router.get(
	"/shorten/:url",

	route((req, ctx) => {
		// Assume :url is an encoded url
		const decodedUrl = decodeURIComponent(ctx.params.url);
		const id = nanoid();
		kv.set([id], decodedUrl);

		console.log(`Shortening ${decodedUrl} to ${BASE_URL}/${id}`);
		// ctx.response.body = `Shortened url to ${BASE_URL}/${id}`;
		return Response.json({ url: `${BASE_URL}/${id}` });
	}),
);

router.all("/404", (ctx) => {
	ctx.response.status = 404;
	ctx.response.body = "Not found";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen();
