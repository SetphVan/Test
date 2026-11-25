// Le bug que ce test empêche de revenir : « Je supprime le restaurant, et c'est le taxi qui disparaît »
import test from "node:test";
import assert from "node:assert/strict";
import { supprimer } from "../lib/depenses.js";

test("supprimer retire la dépense désignée par son identifiant, et elle seule", () => {
  const depenses = [
    { id: "d1", libelle: "Courses" },
    { id: "d4", libelle: "Restaurant" },
    { id: "d5", libelle: "Taxi" },
  ];
  assert.deepEqual(
    supprimer(depenses, "d4").map((d) => d.libelle),
    ["Courses", "Taxi"],
  );
});
