// Le bug que ce test empêche de revenir : « Quand je recharge la page, nos dépenses ont disparu »
import test from "node:test";
import assert from "node:assert/strict";
import { sauver, charger } from "../lib/stockage.js";

// Un faux localStorage : la même interface, en mémoire.
function fauxStock() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
  };
}

test("ce qui est sauvé se retrouve au chargement suivant", () => {
  const stock = fauxStock();
  const depenses = [
    {
      id: "d9",
      libelle: "Glaces",
      montant: 7.5,
      payePar: "Inès",
      date: "11/11/2026",
    },
  ];
  sauver(stock, depenses);
  assert.deepEqual(charger(stock, []), depenses);
});

test("sans rien de sauvé, on repart des dépenses par défaut", () => {
  assert.deepEqual(charger(fauxStock(), ["défaut"]), ["défaut"]);
});
