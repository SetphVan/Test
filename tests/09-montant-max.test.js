// Le bug que ce test empêche de revenir : « Impossible d'enregistrer la location de la maison : 450 € »
import test from "node:test";
import assert from "node:assert/strict";
import { valider } from "../lib/depenses.js";

const depense = (montant) => ({
  libelle: "Location de la maison",
  montant,
  date: "07/11/2026",
});

test("une dépense de 450 € s'enregistre", () => {
  assert.deepEqual(valider(depense(450)), []);
});

test("jusqu'à 10 000 € par dépense, c'est accepté", () => {
  assert.deepEqual(valider(depense(10000)), []);
});

test("au-delà de 10 000 €, c'est refusé", () => {
  assert.equal(valider(depense(10000.01)).length, 1);
});

test("un montant nul ou négatif reste refusé", () => {
  assert.equal(valider(depense(0)).length, 1);
  assert.equal(valider(depense(-5)).length, 1);
});
