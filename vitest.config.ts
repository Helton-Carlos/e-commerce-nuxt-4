import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",

    environmentOptions: {
      nuxt: {
        runtimeConfig: {
          public: {
            apiLocal: process.env.API_LOCAL,
            apiUrl: process.env.API_URL,
            turnstile: {
              siteKey: process.env.TURNSTILE_SITE_KEY,
            },
          },
        },
      },
    },

    include: [
      "__test__/*.{test,spec}.ts",
      "__test__/components/**/*.{test,spec}.ts",
      "__test__/pages/**/*.{test,spec}.ts",
      "__test__/composables/**/*.{test,spec}.ts",
    ],

    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
