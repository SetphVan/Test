// Partage : qui doit combien, quand une dépense est payée par une personne pour tout le groupe.
// Les montants se calculent en centimes : le centime restant va aux premières personnes, pour que les soldes s'annulent exactement.

/** Part de chacun quand une dépense est partagée entre plusieurs personnes. */
export function partDe(montant, nombreDePersonnes) {
  return montant / nombreDePersonnes;
}

/** Les parts d'une dépense en centimes : 1000 centimes à trois donnent [334, 333, 333]. */
export function partsEnCentimes(centimes, nombreDePersonnes) {
  const base = Math.floor(centimes / nombreDePersonnes);
  const reste = centimes - base * nombreDePersonnes;
  return Array.from(
    { length: nombreDePersonnes },
    (_, i) => base + (i < reste ? 1 : 0),
  );
}

/**
 * Solde de chaque personne : ce qu'elle a payé, moins sa part de chaque dépense.
 * Positif : le groupe lui doit de l'argent. Négatif : elle doit de l'argent au groupe.
 */
export function soldes(depenses, personnes) {
  const c = Object.fromEntries(personnes.map((p) => [p, 0]));
  for (const d of depenses) {
    const centimes = Math.round(d.montant * 100);
    c[d.payePar] += centimes;
    partsEnCentimes(centimes, personnes.length).forEach(
      (part, i) => (c[personnes[i]] -= part),
    );
  }
  return Object.fromEntries(personnes.map((p) => [p, c[p] / 100]));
}
