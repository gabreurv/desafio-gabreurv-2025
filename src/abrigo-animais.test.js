import { AbrigoAnimais } from "./abrigo-animais.js";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', 'BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,OSSINHO', 'BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'BOLA', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve limitar adoção a três animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,CAIXA,NOVELO,SKATE,LASER',
      'RATO,BOLA,CAIXA,NOVELO,SKATE,LASER',
      'Rex,Mimi,Fofo,Zero,Bola,Bebe,Loco'
    );
    const adotadosPessoa1 = resultado.lista.filter(x => x.endsWith('pessoa 1')).length;
    const adotadosPessoa2 = resultado.lista.filter(x => x.endsWith('pessoa 2')).length;
    expect(adotadosPessoa1).toBeLessThanOrEqual(3);
    expect(adotadosPessoa2).toBeLessThanOrEqual(3);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve aplicar regra do Loco (sozinho, sempre abrigo)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO', 'SKATE,RATO', 'Loco');
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve aplicar regra do Loco (com companhia, pode ser adotado)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO', 'SKATE,RATO', 'Loco,Rex');
    expect(resultado.lista).toContain('Loco - abrigo');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve mandar animal para abrigo se ambos podem adotar', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

});