import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  server: {
    port: 2000,
  },
  plugins: [
    pluginReact(),

    pluginModuleFederation({
      name: "host",
      remotes: {
        remote1: "remote1@http://localhost:2001/mf-manifest.json",
        remote2: "remote2@http://localhost:2002/mf-manifest.json",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
