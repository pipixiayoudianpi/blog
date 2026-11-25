import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Markdown from "unplugin-vue-markdown/vite";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [vue({ include: [/\.vue$/, /\.md$/] }), Markdown({}), UnoCSS()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
