/**
 * Lista de perícias do 3DT Alpha
 * Perícias são um tipo especial de vantagem
 * - Perícia completa custa 2 pontos
 * - Por 1 ponto, você pode escolher 3 especializações (podem ser de perícias diferentes)
 */
export const skills = [
  {
    name: 'Animais',
    description: 'Conhecimento sobre animais, treinamento e cuidado',
    specializations: [
      'Doma',
      'Montaria',
      'Tratamento',
      'Treinamento',
      'Veterinária'
    ]
  },
  {
    name: 'Arte',
    description: 'Habilidades artísticas e criativas',
    specializations: [
      'Atuação',
      'Falsificação',
      'Fotografia',
      'Instrumentos Musicais',
      'Prestidigitação',
      'Redação',
      'Canto',
      'Culinária',
      'Dança',
      'Desenho',
      'Escultura',
      'Pintura',
      'Joalheria'
    ]
  },
  {
    name: 'Ciência',
    description: 'Conhecimento científico e tecnológico',
    specializations: [
      'Astronomia',
      'Biologia',
      'Ciências Proibidas',
      'Geografia',
      'História',
      'Meteorologia',
      'Psicologia',
      'Antropologia',
      'Arqueologia',
      'Criminalística',
      'Ecologia',
      'Genética',
      'Literatura',
      'Metalografia',
      'Química'
    ]
  },
  {
    name: 'Crime',
    description: 'Habilidades criminosas e furtivas',
    specializations: [
      'Armadilhas',
      'Arrombamento',
      'Criptografia',
      'Disfarce',
      'Falsificação',
      'Furtividade',
      'Leitura Labial',
      'Linguagem de Sinais',
      'Punga',
      'Rastreio'
    ]
  },
  {
    name: 'Esporte',
    description: 'Habilidades atléticas e esportivas',
    specializations: [
      'Acrobacia',
      'Alpinismo',
      'Arquearia',
      'Corrida',
      'Jogos',
      'Mergulho',
      'Natação',
      'Pilotagem',
      'Arremesso',
      'Artes Marciais',
      'Boxe',
      'Caça',
      'Parkour',
      'Pesca',
      'Paraquedismo',
      'Salto'
    ]
  },
  {
    name: 'Idiomas',
    description: 'Conhecimento de línguas e comunicação. Cada língua conta como uma especialização.',
    specializations: [
      'Código Morse',
      'Inglês',
      'Francês',
      'Italiano',
      'Alemão',
      'Espanhol',
      'Português',
      'Japonês',
      'Chinês',
      'Russo',
      'Árabe',
      'Latim',
      'Grego',
      'Hebraico',
      'Sânscrito',
      'Coreano',
      'Hindi',
      'Turco',
      'Polonês',
      'Tailandês',
      'Vietnamita'
    ]
  },
  {
    name: 'Investigação',
    description: 'Habilidades de detetive e análise',
    specializations: [
      'Armadilhas',
      'Arrombamento',
      'Criptografia',
      'Disfarce',
      'Falsificação',
      'Furtividade',
      'Interrogatório',
      'Intimidação',
      'Leitura Labial',
      'Rastreio'
    ]
  },
  {
    name: 'Manipulação',
    description: 'Persuasão, negociação e influência social',
    specializations: [
      'Hipnose',
      'Interrogatório',
      'Lábia',
      'Intimidação',
      'Sedução'
    ]
  },
  {
    name: 'Máquinas',
    description: 'Conhecimento sobre máquinas e tecnologia',
    specializations: [
      'Armadilhas',
      'Computação',
      'Condução',
      'Eletrônica',
      'Engenharia',
      'Mecânica',
      'Pilotagem'
    ]
  },
  {
    name: 'Medicina',
    description: 'Conhecimento médico e de primeiros socorros',
    specializations: [
      'Cirurgia',
      'Diagnose',
      'Primeiros Socorros',
      'Psiquiatria',
      'Veterinária'
    ]
  },
  {
    name: 'Sobrevivência',
    description: 'Habilidades de sobrevivência na natureza. Cada tipo de região conta como uma especialização (mesmas da vantagem Arena).',
    specializations: [
      'Alpinismo',
      'Armadilhas',
      'Arquearia',
      'Furtividade',
      'Meteorologia',
      'Navegação',
      'Pesca',
      'Rastreio',
      'Caça',
      'Água',
      'Céu',
      'Cidades',
      'Ermos',
      'Subterrâneo',
      'Acampamento',
      'Orientação',
      'Botânica',
      'Zoologia'
    ]
  }
]

/**
 * Retorna todas as especializações de todas as perícias em um array único
 * Útil para exibir todas as especializações disponíveis
 */
export function getAllSpecializations() {
  const allSpecializations = []
  skills.forEach(skill => {
    skill.specializations.forEach(spec => {
      allSpecializations.push({
        name: spec,
        skill: skill.name
      })
    })
  })
  return allSpecializations
}
