import { Hono } from "hono";

type Bindings = {
	REDIRECTS: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/:slug", async (c) => {
	const slug = c.req.param("slug");
	const url = await c.env.REDIRECTS.get(slug);

	if (!url) {
		return c.text("not found", 404);
	}

	return c.redirect(url, 302);
});

app.get("/", (c) => {
	return c.text("l.mia.cx", 200);
});

export default app;
