class AbrigoAnimais {
constructor() {
    this.animais = {
      Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    };
    this.brinquedosValidos = [
      'RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'
    ];
  }

encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
  
  const pessoa1 = brinquedosPessoa1.split(',').map(b => b.trim().toUpperCase());
  const pessoa2 = brinquedosPessoa2.split(',').map(b => b.trim().toUpperCase());
  const ordem = ordemAnimais.split(',').map(a => a.trim());

  if (new Set(pessoa1).size !== pessoa1.length || new Set(pessoa2).size !== pessoa2.length) {
    return { erro: 'Brinquedo inválido' };
  }
  if (pessoa1.some(b => !this.brinquedosValidos.includes(b)) ||
      pessoa2.some(b => !this.brinquedosValidos.includes(b))) {
    return { erro: 'Brinquedo inválido' };
  }

  if (new Set(ordem).size !== ordem.length) {
    return { erro: 'Animal inválido' };
  }
  for (const nome of ordem) {
    if (!this.animais[nome]) {
      return { erro: 'Animal inválido' };
    }
  }

  let resultado = [];
  let adotadosPessoa1 = 0;
  let adotadosPessoa2 = 0;

  const ordemAlfabetica = [...ordem].sort();

  for (const nome of ordemAlfabetica) {
    const animal = this.animais[nome];
    const brinquedos = animal.brinquedos;

        
if (nome === 'Loco') {
  const companhia = ordemAlfabetica.length > 1;
  const pessoa1TemTodos = brinquedos.every(b => pessoa1.includes(b));
  const pessoa2TemTodos = brinquedos.every(b => pessoa2.includes(b));
  if (companhia) {
    if (pessoa1TemTodos && pessoa2TemTodos) {
      resultado.push(`${nome} - abrigo`);
    } else if (pessoa1TemTodos && adotadosPessoa1 < 3) {
      resultado.push(`${nome} - pessoa 1`);
      adotadosPessoa1++;
    } else if (pessoa2TemTodos && adotadosPessoa2 < 3) {
      resultado.push(`${nome} - pessoa 2`);
      adotadosPessoa2++;
    } else {
      resultado.push(`${nome} - abrigo`);
    }
  } else {
    resultado.push(`${nome} - abrigo`);
  }
  continue;
}
    
    if (animal.tipo === 'gato') {
      const pessoa1Seq = this.temSequencia(pessoa1, brinquedos);
      const pessoa2Seq = this.temSequencia(pessoa2, brinquedos);

      if (pessoa1Seq && pessoa2Seq) {
        resultado.push(`${nome} - abrigo`);
      } else if (pessoa1Seq && adotadosPessoa1 < 3) {
        resultado.push(`${nome} - pessoa 1`);
        adotadosPessoa1++;
      } else if (pessoa2Seq && adotadosPessoa2 < 3) {
        resultado.push(`${nome} - pessoa 2`);
        adotadosPessoa2++;
      } else {
        resultado.push(`${nome} - abrigo`);
      }
      continue;
    }

    const pessoa1Seq = this.temSequencia(pessoa1, brinquedos);
    const pessoa2Seq = this.temSequencia(pessoa2, brinquedos);

    if (pessoa1Seq && pessoa2Seq) {
      resultado.push(`${nome} - abrigo`);
    } else if (pessoa1Seq && adotadosPessoa1 < 3) {
      resultado.push(`${nome} - pessoa 1`);
      adotadosPessoa1++;
    } else if (pessoa2Seq && adotadosPessoa2 < 3) {
      resultado.push(`${nome} - pessoa 2`);
      adotadosPessoa2++;
    } else {
      resultado.push(`${nome} - abrigo`);
    }
  }

  return { lista: resultado };
}
 
  temSequencia(brinquedosPessoa, brinquedosAnimal) {
    let idx = 0;
    for (const b of brinquedosPessoa) {
      if (b === brinquedosAnimal[idx]) {
        idx++;
        if (idx === brinquedosAnimal.length) return true;
      }
    }
    return false;
  }
}

export { AbrigoAnimais as AbrigoAnimais };