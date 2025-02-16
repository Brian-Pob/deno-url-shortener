import { Hono } from "jsr:@hono/hono";
import { cors } from "jsr:@hono/hono/cors";
import { nanoid } from "npm:nanoid";

const PORT = 8080;
const BASE_URL = Deno.env.get("URL") ?? `http://localhost:${PORT}`;
const kv = await Deno.openKv();

const app = new Hono();

app.use(
	"*",
	cors({
		origin: "https://url-shortener-ui.deno.dev",
		allowMethods: ["GET", "POST", "OPTIONS"],
	}),
);

app.get("/", (c) => {
	return c.text("Hello World!");
});

app.get("/:id", async (c) => {
	const id = c.req.param("id");
	const result = await kv.get([id]);
	if (result.value === null) {
		return c.text(`No url found for ${BASE_URL}/${id}`, 404);
	}
	return c.redirect(result.value as string, 302);
});

app.get("/shorten/:url", async (c) => {
	const encodedUrl = c.req.param("url");
	const decodedUrl = decodeURIComponent(encodedUrl);
	const id = nanoid();
	await kv.set([id], decodedUrl);

	console.log(`Shortening ${decodedUrl} to ${BASE_URL}/${id}`);
	return c.json({ url: `${BASE_URL}/${id}` });
});

app.notFound((c) => {
	c.status(404);
	return c.text("Not Found");
});

Deno.serve(app.fetch);
