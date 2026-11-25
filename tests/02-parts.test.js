// Le bug que ce test empêche de revenir : « On était trois, Léa a payé 30 €, et l'appli dit que chacun lui doit 15 € »
import test from "node:test";
import assert from "node:assert/strict";
import { partDe, soldes } from "../lib/partage.js";

test("30 € partagés entre trois personnes font 10 € chacune", () => {
  assert.equal(partDe(30, 3), 10);
});

test("les soldes du groupe s'annulent : ce que les uns doivent, les autres le reçoivent", () => {
  const s = soldes([{ montant: 30, payePar: "Léa" }], ["Léa", "Sam", "Inès"]);
  assert.deepEqual(s, { Léa: 20, Sam: -10, Inès: -10 });
});
