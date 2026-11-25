// Dépenses : trier, retirer, chercher, valider avant d'enregistrer.
// Une dépense : { id: "d1", date: "09/11/2026", libelle: "Courses", montant: 45.1, payePar: "Léa" }

/** Trie les dépenses de la plus ancienne à la plus récente. Les dates sont au format jj/mm/aaaa. */
export function trierParDate(depenses) {
  return [...depenses].sort((a, b) => a.date.split("/").reverse().join("").localeCompare(b.date.split("/").reverse().join("")));
}

/** Retire une dépense de la liste. */
export function supprimer(depenses, id) {
  return depenses.filter((d) => d.id !== id);
}

/** Les dépenses dont le libellé contient le texte cherché. */
export function chercher(depenses, texte) {
  const simple = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return depenses.filter((d) => simple(d.libelle).includes(simple(texte)));
}

/** Les erreurs d'une dépense avant de l'enregistrer : une liste vide si tout va bien. */
export function valider(depense) {
  const erreurs = [];
  if (!depense.libelle.trim()) erreurs.push("Le libellé est vide.");
  if (!(depense.montant > 0)) erreurs.push("Le montant doit être positif.");
  if (depense.montant > 10000) erreurs.push("Le montant est trop élevé.");
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(depense.date))
    erreurs.push("La date doit être au format jj/mm/aaaa.");
  return erreurs;
}
