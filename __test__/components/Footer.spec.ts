import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Footer from "@/components/Footer.vue";

describe("Test component Footer", () => {
  it("Should mount component Footer", async () => {
    const component = await mountSuspended(Footer);

    expect(component).toBeDefined();
  });

  it("Should mount text Footer", async () => {
    const component = await mountSuspended(Footer);

    expect(component.text()).toBe(
      "E-commerce Store Loja de e-commerce feita com Nuxt 4, Tailwind CSS e DaisyUI. Sobre-nós Todos os direitos reservados © 2025"
    );
  });

  it("Should mount year time", async () => {
    const component = await mountSuspended(Footer);

    const year = new Date().getFullYear();

    expect(component.text()).toContain(year);
  });
});
