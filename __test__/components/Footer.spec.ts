import { describe, expect, it } from "vitest";
import Footer from "@/components/Footer.vue";
import { render } from "@testing-library/vue";

describe("Test component Footer", () => {
  it("Should mount component Footer", async () => {
    const component = await render(Footer);

    expect(component).toBeDefined();
  });

  it("Should mount text Footer", async () => {
    const { getAllByTestId } = await render(Footer);

    const title = getAllByTestId("title-footer").at(0);

    expect(title?.textContent.trim()).toBe("E-commerce Store");
  });

  it("Should mount year time", async () => {
    const { getAllByTestId } = await render(Footer);

    const text = getAllByTestId("date-footer").at(0);

    const year = new Date().getFullYear();

    expect(text?.textContent.trim()).toContain(year);
  });
});
