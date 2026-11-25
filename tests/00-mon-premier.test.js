import test from "node:test";
import assert from "node:assert/strict";
import { formaterEuros } from "../lib/montants.js";

test("formaterEuros affiche 57.3 en « 57,30 € »", () => {
  assert.equal(formaterEuros(57.3), "57,30 €");
});

test("formaterEuros affiche 0 en « 0,00 € »", () => {
  assert.equal(formaterEuros(0), "0,00 €");
});
