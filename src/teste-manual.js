import { AbrigoAnimais } from "./abrigo-animais.js";

const abrigo = new AbrigoAnimais();
console.log(
  abrigo.encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo')
);

console.log(
  abrigo.encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu')
);