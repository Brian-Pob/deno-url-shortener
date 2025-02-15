import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
	plugins: [deno()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:8080",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
