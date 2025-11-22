/**
 * Lista de vantagens únicas (raças) do 3DT Alpha
 * Cada personagem pode ter apenas uma vantagem única
 */
export const uniqueAdvantages = [
  // Humanos (0 pontos - padrão)
  { name: 'Humano', cost: 0, group: 'Humanos', description: 'Raça padrão. Não precisa comprar esta vantagem.' },
  
  // Semi-humanos
  { name: 'Anão', cost: 1, group: 'Semi-humanos', description: 'Infravisão, Resistência à Magia, Testes de Resistência +1' },
  { name: 'Elfo', cost: 2, group: 'Semi-humanos', description: 'Habilidade +1, Visão Aguçada, FA+1 com espada e arco' },
  { name: 'Elfo Negro', cost: 2, group: 'Semi-humanos', description: 'Habilidade +1, Infravisão, Resistência à Magia, Magia Branca ou Negra' },
  { name: 'Gnomo', cost: 2, group: 'Semi-humanos', description: 'Habilidade +1, Genialidade, Faro Aguçado, Pequenos Desejos' },
  { name: 'Halfling', cost: 1, group: 'Semi-humanos', description: 'Habilidade +1, Poder de Fogo +1, Aptidão para Crime' },
  { name: 'Meio-Elfo', cost: 0, group: 'Semi-humanos', description: 'Visão Aguçada, Aptidão para Artes e Manipulação' },
  { name: 'Meio-Orc', cost: 0, group: 'Semi-humanos', description: 'Força +1, Infravisão, Má Fama' },
  
  // Humanoides
  { name: 'Alien', cost: 2, group: 'Humanoides', description: 'Característica +1, Armadura Extra, Vantagem Bônus' },
  { name: 'Anfíbio', cost: 0, group: 'Humanoides', description: 'Resistência +1, Natação, Radar, Ambiente Especial (água)' },
  { name: 'Centauro', cost: 1, group: 'Humanoides', description: 'Força +1, Habilidade +1 (corrida), Combate Táurico' },
  { name: 'Goblin', cost: -1, group: 'Humanoides', description: 'Testes de Resistência +1, Infravisão, Aptidão para Crime, Má Fama' },
  { name: 'Kemono', cost: 1, group: 'Humanoides', description: 'Habilidade +1, Sentidos Especiais (2 escolhidos)' },
  { name: 'Meio-Dragão', cost: 4, group: 'Humanoides', description: 'Arcano, Invulnerabilidade (elemento do dragão)' },
  { name: 'Minotauro', cost: 2, group: 'Humanoides', description: 'Força +2, Habilidade -1, Infravisão' },
  { name: 'Ogre', cost: 1, group: 'Humanoides', description: 'Força +2, Habilidade -1, Resistência +1' },
  { name: 'Troglodita', cost: 0, group: 'Humanoides', description: 'Resistência +1, Infravisão, Faro Aguçado' },
  
  // Youkai
  { name: 'Anjo', cost: 3, group: 'Youkai', description: 'Habilidade +1, Voo, Magia Branca, Vulnerabilidade: Fogo' },
  { name: 'Demônio', cost: 1, group: 'Youkai', description: 'Aptidão para Magia Negra, Má Fama' },
  { name: 'Fada', cost: 1, group: 'Youkai', description: 'Habilidade +1, Voo, Pequenos Desejos, Modelo Especial' },
  { name: 'Licantropo', cost: 2, group: 'Youkai', description: 'Forma Alternativa, Força +2 na forma animal' },
  { name: 'Meio-Abissal', cost: 2, group: 'Youkai', description: 'Aptidão para Magia Negra, Resistência à Magia' },
  { name: 'Meio-Celestial', cost: 2, group: 'Youkai', description: 'Aptidão para Magia Branca, Resistência à Magia' },
  { name: 'Meio-Gênio', cost: 1, group: 'Youkai', description: 'Aptidão para Magia Elemental, Vantagem Bônus' },
  
  // Construtos
  { name: 'Androide', cost: 2, group: 'Construtos', description: 'Resistência +1, Bateria, Resistência à Magia' },
  { name: 'Ciborgue', cost: 1, group: 'Construtos', description: 'Característica +1, Bateria, Modelo Especial' },
  { name: 'Golem', cost: 3, group: 'Construtos', description: 'Força +2, Armadura +2, Bateria, Inculto' },
  { name: 'Mecha', cost: 3, group: 'Construtos', description: 'Força +2, Armadura +2, Bateria, Modelo Especial' },
  { name: 'Meio-Golem', cost: 1, group: 'Construtos', description: 'Resistência +1, Armadura +1, Bateria' },
  { name: 'Nanomorfo', cost: 2, group: 'Construtos', description: 'Forma Alternativa, Bateria' },
  { name: 'Robô Positrônico', cost: 2, group: 'Construtos', description: 'Habilidade +1, Bateria, Resistência à Magia' },
  
  // Mortos-Vivos
  { name: 'Esqueleto', cost: 1, group: 'Mortos-Vivos', description: 'Armadura Extra (Corte e Perfuração), Invulnerabilidade: Frio' },
  { name: 'Fantasma', cost: 3, group: 'Mortos-Vivos', description: 'Invisibilidade, Voo, Invulnerabilidade (físico)' },
  { name: 'Múmia', cost: 2, group: 'Mortos-Vivos', description: 'Armadura Extra (Fogo), Invulnerabilidade: Fogo' },
  { name: 'Vampiro', cost: 4, group: 'Mortos-Vivos', description: 'Força +1, Habilidade +1, Regeneração, Dependência (sangue)' },
  { name: 'Zumbi', cost: 0, group: 'Mortos-Vivos', description: 'Resistência +1, Inculto, Monstruoso' }
]

