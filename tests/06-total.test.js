// Le bug que ce test empêche de revenir : « Le total du week-end affiche 230.39999999999998 € »
import test from "node:test";
import assert from "node:assert/strict";
import { total, formaterEuros } from "../lib/montants.js";

const depenses = [45.1, 90, 12.1, 60, 23.2].map((montant) => ({ montant }));

test("le total tombe juste, au centime près", () => {
  assert.equal(total(depenses), 230.4);
});

test("un montant s'affiche avec deux décimales et une virgule", () => {
  assert.equal(formaterEuros(230.4), "230,40 €");
});
