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
      },
    }),
  ],
});
