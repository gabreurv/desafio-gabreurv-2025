# Abrigo de Animais

Este projeto simula a lógica de adoção de animais em um abrigo, considerando as preferências de brinquedos de cada animal e as opções oferecidas por duas pessoas interessadas em adotar.

## Estrutura do Projeto

```
src/
  abrigo-animais.js        # Implementação da lógica principal
  abrigo-animais.test.js   # Testes automatizados com Jest
  teste-manual.js          # Script para testes manuais
jest.config.js             # Configuração do Jest
package.json               # Dependências e scripts do projeto
```

## Como funciona

A classe [`AbrigoAnimais`](src/abrigo-animais.js) possui o método `encontraPessoas`, que recebe:

- **brinquedosPessoa1**: string com brinquedos separados por vírgula (ex: `"RATO,BOLA"`)
- **brinquedosPessoa2**: string com brinquedos separados por vírgula
- **ordemAnimais**: string com nomes dos animais separados por vírgula (ex: `"Rex,Fofo"`)

O método retorna um objeto indicando para onde cada animal vai: abrigo, pessoa 1 ou pessoa 2, de acordo com as regras do abrigo.

## Regras principais

- Cada pessoa pode adotar no máximo 3 animais.
- Só pode adotar um animal se tiver os brinquedos necessários, respeitando a ordem dos brinquedos do animal.
- Se ambos podem adotar, o animal fica no abrigo.
- O jabuti "Loco" só pode ser adotado se não estiver sozinho na lista.
- Não são permitidos brinquedos ou animais duplicados na entrada.
- Só são aceitos brinquedos válidos: RATO, BOLA, LASER, CAIXA, NOVELO, SKATE.

## Como rodar os testes

Instale as dependências:

```sh
npm install
```

Execute os testes automatizados:

```sh
npm test
```

## Teste manual

Você pode rodar o script de teste manual:

```sh
node src/teste-manual.js
```

## Exemplo de uso

```js
import { AbrigoAnimais } from "./src/abrigo-animais.js";

const abrigo = new AbrigoAnimais();
const resultado = abrigo.encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
console.log(resultado);
// Saída esperada: { lista: [ 'Fofo - abrigo', 'Rex - pessoa 1' ] }
```

## Cobertura de testes

O projeto já possui cobertura de testes automatizados utilizando Jest. O relatório pode ser visualizado na pasta `coverage/lcov-report/index.html` após rodar `npm test`.

---

Desenvolvido para fins