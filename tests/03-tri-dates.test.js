// Le bug que ce test empêche de revenir : « L'acompte du 10 octobre s'affiche au milieu des dépenses de novembre »
import test from "node:test";
import assert from "node:assert/strict";
import { trierParDate } from "../lib/depenses.js";

test("les dépenses se trient de la plus ancienne à la plus récente, d'un mois à l'autre", () => {
  const depenses = [
    { id: "a", date: "09/11/2026" },
    { id: "b", date: "10/10/2026" },
    { id: "c", date: "08/11/2026" },
    { id: "d", date: "02/01/2027" },
  ];
  assert.deepEqual(
    trierParDate(depenses).map((d) => d.id),
    ["b", "c", "a", "d"],
  );
});
