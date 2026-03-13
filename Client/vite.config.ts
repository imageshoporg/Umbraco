import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/client.ts", // Bundle registers one or more manifests
      formats: ["es"],
      fileName: "imageshop",
    },
    outDir: "../wwwroot/App_Plugins/Imageshop", // your web component will be saved in this location
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/],
    },
  },
});
