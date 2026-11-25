// La page : branche la logique de lib/ sur le formulaire, la liste, les soldes et le total.
import { lireMontant, total, formaterEuros } from "./lib/montants.js";
import { soldes } from "./lib/partage.js";
import { trierParDate, supprimer, chercher, valider } from "./lib/depenses.js";
import { sauver, charger } from "./lib/stockage.js";
import { ligneDepense } from "./lib/affichage.js";

const PERSONNES = ["Léa", "Sam", "Inès"];
const DEMO = [
  {
    id: "d1",
    date: "09/11/2026",
    libelle: "Courses du samedi",
    montant: 45.1,
    payePar: "Léa",
  },
  {
    id: "d2",
    date: "10/10/2026",
    libelle: "Acompte de la maison",
    montant: 90,
    payePar: "Sam",
  },
  {
    id: "d3",
    date: "08/11/2026",
    libelle: "Café du matin",
    montant: 12.1,
    payePar: "Inès",
  },
  {
    id: "d4",
    date: "09/11/2026",
    libelle: "Restaurant du port",
    montant: 60,
    payePar: "Sam",
  },
  {
    id: "d5",
    date: "10/11/2026",
    libelle: "Taxi du retour",
    montant: 23.2,
    payePar: "Léa",
  },
];

const $ = (sel) => document.querySelector(sel);
let depenses = charger(localStorage, DEMO);

// « 2026-11-09 » (champ date du navigateur) devient « 09/11/2026 ».
function versJJMMAAAA(iso) {
  const [a, m, j] = iso.split("-");
  return `${j}/${m}/${a}`;
}

function afficher() {
  const visibles = trierParDate(chercher(depenses, $("#recherche").value));
  $("#liste").innerHTML = visibles.map((d, i) => ligneDepense(d, i)).join("");
  $("#vide").hidden = visibles.length > 0;
  $("#total").textContent = formaterEuros(total(depenses));
  $("#soldes").innerHTML = Object.entries(soldes(depenses, PERSONNES))
    .map(
      ([p, s]) =>
        `<li class="${s < 0 ? "doit" : "recoit"}"><b>${p}</b><span>${formaterEuros(s)}</span></li>`,
    )
    .join("");
}

$("#payePar").innerHTML = PERSONNES.map((p) => `<option>${p}</option>`).join(
  "",
);
$("#date").value = new Date().toISOString().slice(0, 10);

$("#formulaire").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = {
    id: "d" + Date.now(),
    date: versJJMMAAAA($("#date").value),
    libelle: $("#libelle").value,
    montant: lireMontant($("#montant").value),
    payePar: $("#payePar").value,
  };
  const erreurs = valider(d);
  $("#erreurs").textContent = erreurs.join(" ");
  if (erreurs.length) return;
  depenses = [...depenses, d];
  sauver(localStorage, depenses);
  afficher();
  $("#libelle").value = "";
  $("#montant").value = "";
});

$("#liste").addEventListener("click", (e) => {
  const bouton = e.target.closest("button.suppr");
  if (!bouton) return;
  depenses = supprimer(depenses, bouton.dataset.id);
  sauver(localStorage, depenses);
  afficher();
});

$("#recherche").addEventListener("input", afficher);
$("#reinitialiser").addEventListener("click", () => {
  depenses = DEMO;
  sauver(localStorage, depenses);
  afficher();
});

afficher();
