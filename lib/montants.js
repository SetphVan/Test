// Montants : lire ce que l'utilisateur tape, additionner, afficher en euros.

/** Lit un montant tapé dans le formulaire (« 12,50 » ou « 12.50 ») et rend un nombre. */
export function lireMontant(texte) {
  return parseFloat(String(texte).replace(",", "."));
}

/** Total d'une liste de dépenses, au centime près. */
export function total(depenses) {
  return Math.round(depenses.reduce((somme, d) => somme + d.montant, 0) * 100) / 100;
}

/** 57.3 devient « 57,30 € ». */
export function formaterEuros(montant) {
  return montant.toFixed(2).replace(".", ",") + " €";
}
