// Le bug que ce test empêche de revenir : « Sam a appelé une dépense <img src=x onerror=alert('coucou')>, et une fenêtre s'est ouverte »
import test from "node:test";
import assert from "node:assert/strict";
import { ligneDepense } from "../lib/affichage.js";

const piege = {
  id: "d9",
  date: "11/11/2026",
  libelle: "<img src=x onerror=alert('coucou')>",
  montant: 5,
  payePar: "Sam",
};

test("un libellé s'affiche comme du texte, jamais comme du HTML", () => {
  const html = ligneDepense(piege, 0);
  assert.ok(
    !html.includes("<img"),
    "la balise <img> est passée telle quelle dans la page",
  );
  assert.ok(
    html.includes("&lt;img"),
    "le libellé doit rester lisible, échappé",
  );
});

test("le nom de la personne aussi", () => {
  const html = ligneDepense(
    { ...piege, libelle: "Glaces", payePar: "<b>Sam</b>" },
    0,
  );
  assert.ok(!html.includes("<b>"));
});
