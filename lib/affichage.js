// Affichage : le HTML d'une ligne de la liste des dépenses.
import { formaterEuros } from "./montants.js";

const echapper = (t) =>
  String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/** Une ligne de la liste. « position » : sa place dans la liste affichée, pour le bouton Supprimer. */
export function ligneDepense(d, position) {
  return `<li>
    <span class="date">${d.date}</span>
    <span class="libelle">${d.libelle}</span>
    <span class="qui">payé par ${echapper(d.payePar)}</span>
    <span class="montant">${formaterEuros(d.montant)}</span>
    <button class="suppr" data-id="${echapper(d.id)}" title="Supprimer">✕</button>
  </li>`;
}
