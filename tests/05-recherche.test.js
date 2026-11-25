// Le bug que ce test empêche de revenir : « Je cherche "cafe", et le "Café du matin" n'apparaît pas »
import test from "node:test";
import assert from "node:assert/strict";
import { chercher } from "../lib/depenses.js";

const depenses = [
  { id: "d1", libelle: "Café du matin" },
  { id: "d2", libelle: "Restaurant du port" },
];

test("la recherche ignore les accents", () => {
  assert.deepEqual(
    chercher(depenses, "cafe").map((d) => d.id),
    ["d1"],
  );
});

test("la recherche ignore les majuscules", () => {
  assert.deepEqual(
    chercher(depenses, "RESTAURANT").map((d) => d.id),
    ["d2"],
  );
});
