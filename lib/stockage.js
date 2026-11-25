// Stockage : les dépenses sont gardées dans le navigateur, pour survivre au rechargement de la page.
// « stock » est le localStorage du navigateur (ou un faux, dans les tests).

const CLE = "cagnotte-depenses";

export function sauver(stock, depenses) {
  stock.setItem(CLE, JSON.stringify(depenses));
}

export function charger(stock, parDefaut) {
  const brut = stock.getItem(CLE);
  return brut ? JSON.parse(brut) : parDefaut;
}
