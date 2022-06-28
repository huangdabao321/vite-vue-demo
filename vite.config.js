import { resolve } from "path";
import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      viteMockServe({
        mockPath: "mock",
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    }
  };
});
