import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@/app.vue";

describe("Test App Index", () => {
  it("Should mount component App", async () => {
    const component = await mountSuspended(App, { route: "/" });

    expect(component).toBeDefined();
  });
});
