import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";

const SERVER_URL = Deno.env.get("URL") ?? "http://localhost:8080";
// https://vite.dev/config/
export default defineConfig({
	plugins: [deno()],
	server: {
		proxy: {
			"/api": {
				target: SERVER_URL,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
