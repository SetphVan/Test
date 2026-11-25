// Le bug que ce test empêche de revenir : « J'ai tapé 12,50 et la dépense affiche 12,00 € »
import test from "node:test";
import assert from "node:assert/strict";
import { lireMontant } from "../lib/montants.js";

test("un montant tapé avec une virgule garde ses centimes", () => {
  assert.equal(lireMontant("12,50"), 12.5);
});

test("un montant tapé avec un point marche toujours", () => {
  assert.equal(lireMontant("12.50"), 12.5);
});
