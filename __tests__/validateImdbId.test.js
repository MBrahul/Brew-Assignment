import { validateImdbId } from "../src/lib/validateImdbId.js";

describe("IMDb ID validation", () => {

  test("accepts valid imdb id", () => {
    expect(validateImdbId("tt0133093")).toBe(true);
  });

  test("rejects invalid imdb id", () => {
    expect(validateImdbId("matrix")).toBe(false);
  });

});