import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",

    environmentOptions: {
      nuxt: {
        runtimeConfig: {
          public: {
            NUXT_PUBLIC_TURNSTILE_SITE_KEY: "mock-key-para-teste",
          },
        },
      },
    },

    include: [
      "__test__/*.{test,spec}.ts",
      "components/**/*.{test,spec}.ts",
      "pages/**/*.{test,spec}.ts",
      "composables/**/*.{test,spec}.ts",
    ],

    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
