import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Footer from "@/components/Footer.vue";
import { render } from "@testing-library/vue";

describe("Test component Footer", () => {
  it("Should mount component Footer", async () => {
    const component = await mountSuspended(Footer);

    expect(component).toBeDefined();
  });

  it("Should mount text Footer", async () => {
    const component = await render(Footer);

    const title = component.getByTestId("title-footer");

    expect(title.textContent.trim()).toBe("E-commerce Store");
  });

  it("Should mount year time", async () => {
    const component = await mountSuspended(Footer);

    const year = new Date().getFullYear();

    expect(component.text()).toContain(year);
  });
});
