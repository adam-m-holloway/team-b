import { describe, expect, it } from "vitest";
import { slugify } from "./index.js";

describe("slugify", () => {
  it("lowercases and joins words with a hyphen", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips diacritics", () => {
    expect(slugify("Crème Brûlée")).toBe("creme-brulee");
  });

  it("collapses runs of punctuation and whitespace into one hyphen", () => {
    expect(slugify("a -- b!!!  c__d")).toBe("a-b-c-d");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  --Hello, World!--  ")).toBe("hello-world");
  });

  it("returns an empty string for empty or all-punctuation input", () => {
    expect(slugify("")).toBe("");
    expect(slugify("!!! ---")).toBe("");
  });

  it("keeps digits", () => {
    expect(slugify("Version 2.0 Release")).toBe("version-2-0-release");
  });

  describe("maxLength", () => {
    it("truncates to at most maxLength characters", () => {
      expect(slugify("hello world", { maxLength: 3 })).toBe("hel");
    });

    it("never ends on a hyphen when the cut lands on one", () => {
      // "hello-world".slice(0, 6) === "hello-"
      expect(slugify("hello world", { maxLength: 6 })).toBe("hello");
    });

    it("leaves short slugs untouched", () => {
      expect(slugify("hi there", { maxLength: 100 })).toBe("hi-there");
    });

    it.each([0, -1, 1.5, Number.NaN])(
      "throws RangeError for invalid maxLength %s",
      (maxLength) => {
        expect(() => slugify("hello", { maxLength })).toThrow(RangeError);
      },
    );
  });
});
