import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Main from "@/components/Main.vue";

describe("Test component Main", () => {
  it("Should mount component Main", async () => {
    const component = await mountSuspended(Main);

    expect(component).toBeDefined();
  });

  it("Should mount class hero", async () => {
    const component = await mountSuspended(Main);

    expect(component.classes("hero")).toBe(true);
    expect(component.classes("min-h-screen")).toBe(true);
  });

  it("Should mount component image", async () => {
    const component = await mountSuspended(Main);

    expect(component.attributes("style")).toContain(
      'background-image: url("https://f.i.uol.com.br/fotografia/2023/02/09/167598321663e579707214b_1675983216_3x2_rt.jpg")'
    );
  });
});
