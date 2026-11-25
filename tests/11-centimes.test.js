// Le bug que ce test empêche de revenir : « Un repas de 10 € à trois : les soldes affichés font 6,67, -3,33 et -3,33. Il manque un centime. »
import test from "node:test";
import assert from "node:assert/strict";
import { soldes } from "../lib/partage.js";

test("les soldes d'un repas de 10 € à trois s'annulent au centime près", () => {
  const s = soldes([{ montant: 10, payePar: "Léa" }], ["Léa", "Sam", "Inès"]);
  const totalCentimes = Object.values(s).reduce(
    (a, v) => a + Math.round(v * 100),
    0,
  );
  assert.equal(totalCentimes, 0);
});

test("chaque solde tombe sur un centime entier", () => {
  const s = soldes(
    [
      { montant: 10, payePar: "Léa" },
      { montant: 23.2, payePar: "Sam" },
    ],
    ["Léa", "Sam", "Inès"],
  );
  for (const v of Object.values(s)) assert.equal(Math.round(v * 100), v * 100);
});
