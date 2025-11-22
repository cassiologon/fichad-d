/**
 * Lista de vantagens únicas (raças) do 3DT Alpha
 * Cada personagem pode ter apenas uma vantagem única
 */
export const uniqueAdvantages = [
  // Humanos (0 pontos - padrão)
  { 
    name: 'Humano', 
    cost: 0, 
    group: 'Humanos', 
    description: 'Raça padrão. Não precisa comprar esta vantagem.',
    fullDescription: 'Na maioria dos mundos, a supremacia pertence aos humanos. Mesmo nos lugares onde existem outras raças nativas, quase sempre a população humana supera todas as outras juntas. Comparados a outros povos, os humanos em geral têm mais iniciativa, mais energia e são mais adaptáveis, mas também têm vidas mais curtas. Humanos podem apresentar aparência ou poderes exóticos que muitos qualificam como "não humanos". Um artista marcial capaz de disparar bolas de fogo pelas mãos, ou uma garota de cabelo rosado que fulmina demônios, dificilmente seriam considerados pessoas normais. No mundo colorido de 3D&T, muitas vezes será difícil dizer quem é humano ou não é... Ser um humano é muito importante ao relacionar-se com pessoas normais: não-humanos costumam ser odiados, temidos (especialmente os humanoides e youkai), subestimados (como os semi-humanos) ou considerados inferiores (como construtos). Não é preciso adquirir nenhuma vantagem para ser humano. Se você não comprar nenhuma das vantagens únicas deste capítulo, então será automaticamente considerado humano.'
  },
  
  // Semi-humanos
  { 
    name: 'Anão', 
    cost: 1, 
    group: 'Semi-humanos', 
    description: 'Infravisão, Resistência à Magia, Testes de Resistência +1',
    fullDescription: 'Anões não ultrapassam 1,30m de altura, mas são mais robustos que os humanos e podem usar qualquer arma, equipamento ou veículo projetado para eles. Eles apreciam trabalho duro: entre os ofícios favoritos da raça estão mineração, joalheria e forja de metais. Anões gostam de vestir armaduras metálicas e levam bastante bagagem, pois são capazes de carregar muito peso. Eles também adoram cerveja, consumindo muitos barris ao longo de suas extensas vidas. • Infravisão. Seres subterrâneos por natureza, todos os anões enxergam no escuro. • Resistência à Magia. Anões são muitíssimo resistentes a todas as formas de magia. • Testes de Resistência +1. Anões são robustos. Este bônus é cumulativo com sua Resistência à Magia, tornando um membro desta raça realmente difícil de atingir por meios mágicos. • Inimigos. Anões odeiam orcs (incluindo meio-orcs), goblinoides (goblins, hobgoblins, bugbears) e trolls (de todos os tipos). São treinados desde a infância para lutar com essas criaturas, por isso recebem H+1 contra elas.'
  },
  { 
    name: 'Elfo', 
    cost: 2, 
    group: 'Semi-humanos', 
    description: 'Habilidade +1, Visão Aguçada, FA+1 com espada e arco',
    fullDescription: 'Os elfos são uma raça muito antiga; lendas dizem que foram o primeiro povo criado pelos deuses. Têm orelhas pontiagudas, olhos amendoados, traços delicados, afinidade com a natureza, talento para a mágica, habilidade com espadas e arcos, e vidas muito longas. A maioria tem pele clara, mas alguns membros de sub-raças exóticas podem ser brancos, azuis ou verdes. Seus olhos e cabelos podem ter cores ainda mais variadas, e alguns têm traços incomuns como patas ou cauda. Exceto por tais detalhes, são fisicamente parecidos com os humanos. Têm a mesma altura e peso. Embora sejam normalmente mais delgados, alguns podem ser tão musculosos e massivos quanto qualquer humano. Em geral os elfos formam culturas avançadas, sofisticadas e pacíficas, com grande apreço pela natureza e afinidade com magia. Mas também podem ser temíveis guerreiros, especialmente quando protegem as florestas que tanto amam contra monstros e invasores. • Habilidade +1. Elfos são mais ágeis e inteligentes que os humanos. • Visão Aguçada. Elfos têm olhos aguçados e podem ver no escuro com perfeição, mas não na escuridão total: deve existir uma iluminação mínima, por menor que seja. • FA+1 com espada e arco. Estas são armas tradicionais de sua raça. Isso significa que, para receber o bônus, você deve personalizar seu dano como Força (corte) e/ou Poder de Fogo (perfuração), à sua escolha. • Aptidão para Magia Elemental. Elfos podem comprar esta vantagem por apenas 1 ponto.'
  },
  { 
    name: 'Elfo Negro', 
    cost: 2, 
    group: 'Semi-humanos', 
    description: 'Habilidade +1, Infravisão, Resistência à Magia, Magia Branca ou Negra',
    fullDescription: 'Os elfos negros são uma versão subterrânea, e geralmente maligna (embora isso nem sempre seja verdade), dos elfos comuns. Eles não existem em Arton como raça nativa, mas podem ser encontrados na maioria dos outros mundos mágicos. Estes elfos têm pele negra, cabelos brancos e certa afinidade com aranhas e venenos. Suspeita-se que estas criaturas tenham grandes impérios secretos, mas esta hipótese ainda não foi totalmente confirmada. De qualquer forma, alguns deles decidem abandonar os hábitos nefastos de sua raça e viajar pelo mundo como aventureiros, enquanto os demais se tornam tipicamente vilões. • Habilidade +1. Elfos negros são mais ágeis e inteligentes que os humanos. • Infravisão. Como criaturas das trevas, habitantes de impérios subterrâneos, elfos negros enxergam perfeitamente no escuro. • Resistência à Magia. Elfos negros têm extrema resistência a poderes mágicos. • Magia. Elfos negros recebem Magia Branca ou Negra (à sua escolha) sem pagar pontos. • Ponto Fraco. À luz do dia, elfos negros sofrem penalidade temporária de –1 em todas as características e precisam gastar duas vezes mais PMs para lançar magias.'
  },
  { 
    name: 'Gnomo', 
    cost: 2, 
    group: 'Semi-humanos', 
    description: 'Habilidade +1, Genialidade, Faro Aguçado, Pequenos Desejos',
    fullDescription: 'Gnomos são pequenos humanoides medindo cerca de 1m de altura. São ligeiramente aparentados aos anões, mas ainda menores e menos robustos. Muitos têm orelhas pontiagudas, e quase todos cultivam barbas curtas e bem cuidadas. Gostam de roupas coloridas e joias. Gnomos tendem a ser rabugentos e reclusos, preferindo a solidão de suas tocas a qualquer companhia. Muitos, no entanto, apaixonam-se pelas grandes cidades dos humanos e ali encontram seu lugar — geralmente como estudiosos, alquimistas, engenheiros, inventores ou magos ilusionistas, as maiores aptidões da raça. São muito raros aqueles que decidem ser aventureiros. Quase nunca um gnomo entrará em combate voluntariamente. Diante desse tipo de situação, eles preferem fugir ou enganar o inimigo com truques ou magias. Mesmo os magos gnomos mais poderosos evitam ferir seus oponentes sempre que possível, buscando outra alternativa para detê-los. Não existem gnomos nativos em Arton, mas eles podem chegar de outros mundos. • Habilidade +1. Gnomos são astutos e engenhosos. • Genialidade. Gnomos são cheios de truques, e têm fascínio natural por todas as artes, ciências e conhecimentos. • Faro Aguçado. Gnomos têm olfato excelente. • Pequenos Desejos. Gnomos são conhecidos por usar pequenos truques e magias menores o tempo todo. Eles podem lançar a magia Pequenos Desejos mesmo sem ter nenhuma vantagem mágica. • Modelo Especial. Gnomos não podem usar roupas, armas ou equipamentos feitos para humanos.'
  },
  { 
    name: 'Halfling', 
    cost: 1, 
    group: 'Semi-humanos', 
    description: 'Habilidade +1, Poder de Fogo +1, Aptidão para Crime',
    fullDescription: 'Seu nome vem de "half of something", que significa "metade de alguma coisa" — um nome adequado para criaturinhas que não ultrapassam os 90cm de altura, exatamente metade de um ser humano. Também conhecidos como hobbits ou apenas "pequeninos", os halflings têm como sua segunda característica física mais marcante os pés densamente cobertos de pelos, embora nem todas as sub-raças tenham essa peculiaridade. Quase todos gostam de conforto e boa comida, sendo bastante raro que decidam ser aventureiros. • Habilidade +1, Poder de Fogo +1. Halflings são ligeiros, espertos, sortudos e habilidosos com armas de projéteis, seu "esporte" favorito. Sempre que possível, um halfling prefere lutar à distância. • Aptidão para Crime. Para halflings, a perícia Crime custa apenas 1 ponto. • Modelo Especial. Halflings não podem usar roupas, armas ou equipamentos feitos para humanos.'
  },
  { 
    name: 'Meio-Elfo', 
    cost: 0, 
    group: 'Semi-humanos', 
    description: 'Visão Aguçada, Aptidão para Artes e Manipulação',
    fullDescription: 'Um meio-elfo é resultado da união entre um humano e uma elfa, ou um elfo e uma humana. Sua aparência costuma ser mais humana (ao contrário dos elfos, meio-elfos podem ter barba), mas ainda com traços élficos. Têm orelhas pontiagudas, mas menos pronunciadas que elfos verdadeiros. Meio-elfos não possuem a maioria das habilidades raciais dos elfos: podem apenas ver no escuro com pouca iluminação e viver duas vezes mais que os seres humanos. Vivendo entre dois povos, ansiosos por pertencer a algum lugar, meio-elfos aprendem a ser simpáticos e agradáveis. • Visão Aguçada. Meio-elfos têm olhos aguçados e podem ver no escuro com perfeição, mas não na escuridão total: deve existir uma iluminação mínima, por menor que seja. • Aptidão para Artes e Manipulação. Meio-elfos lutam para pertencer a uma sociedade, querem ser aceitos entre os humanos, ou elfos, ou ambos. Para eles, as perícias Artes e Manipulação custam apenas 1 ponto cada.'
  },
  { 
    name: 'Meio-Orc', 
    cost: 0, 
    group: 'Semi-humanos', 
    description: 'Força +1, Infravisão, Má Fama',
    fullDescription: 'Um orc é uma criatura horrenda, semelhante a uma combinação de homem e animal. Eles variam amplamente em aparência, porque costumam cruzar com muitas outras criaturas, mas quase todos têm pele verde-acinzentada, orelhas pontudas, olhos vermelhos, presas inferiores afiadas e focinhos em vez de nariz. Orcs formam tribos selvagens e muitas vezes atacam outras raças; eles são inimigos de quase todos os povos. Embora isso seja raro, algumas vezes uma tribo orc estabelece relações pacíficas com humanos — como parceiros comerciais ou aliados de guerra. Esse tipo de relação é bastante instável e delicada, mas favorece o surgimento de meio-orcs. Um meio-orc nasce do cruzamento de um orc com outra criatura humanoide. Isso quase sempre acontece entre orcs e humanos, goblins e hobgoblins. A aparência de um meio-orc é apenas um pouco melhor que um orc puro, mas em terras humanas eles ainda podem se fazer passar por "humanos grandes e feios". Ao contrário dos meio-elfos, meio-orcs em geral são revoltados com sua própria origem e não querem "pertencer" a lugar nenhum. • Força +1. Meio-orcs herdam a força física de seus pais monstruosos, por isso são fortes e brutais. • Infravisão. Orcs são noturnos e subterrâneos. Por isso, meio-orcs enxergam no escuro. • Má Fama. Muita gente acha revoltante imaginar como um meio-orc veio a este mundo. • Vantagens Proibidas. Meio-orcs não chegam a ser exatamente estúpidos, mas também nunca são brilhantes. Eles não podem comprar Genialidade ou Memória Expandida.'
  },
  
  // Humanoides
  { 
    name: 'Alien', 
    cost: 2, 
    group: 'Humanoides', 
    description: 'Característica +1, Armadura Extra, Vantagem Bônus',
    fullDescription: 'Alienígena, ou alien, não é o mesmo que extraterrestre. Literalmente, a palavra significa "estrangeiro". Um alienígena não é sempre alguém nativo de outro planeta — pode ser um visitante de outro país. Mas é verdade que muitos heróis e seus inimigos (especialmente seus inimigos) chegam de outros mundos, épocas ou dimensões. Por sua origem peculiar, alienígenas podem demonstrar aparência e poderes muito variados, imprevisíveis. Quase todos são superiores aos humanos em um ou mais aspectos, mas também podem ser inferiores em outros. Devido à evolução paralela, muitos aliens têm aparência humana, salvo algum detalhe (uma cauda de macaco, por exemplo) não muito difícil de disfarçar. Mesmo assim eles têm dificuldade em passar despercebidos: um alien recém-chegado tem problemas para adaptar-se à nossa cultura e sociedade, cometendo muitos enganos e atraindo atenção (e encrenca). Até mesmo um alien criado na Terra desde pequeno sente-se deslocado dos demais, sem conhecer a verdade sobre seus poderes. • Característica +1. Um alien recebe +1 em uma característica à escolha do jogador. • Armadura Extra. Um alien recebe uma Armadura Extra (apenas contra energia) à escolha do jogador. • Vantagem Bônus. Um alien ganha uma vantagem de 1 ponto; ou pode comprar uma vantagem de 2 pontos (exceto perícias) por apenas 1 ponto. • Inculto. Aliens têm inaptidão à nossa cultura.'
  },
  { 
    name: 'Anfíbio', 
    cost: 0, 
    group: 'Humanoides', 
    description: 'Resistência +1, Natação, Radar, Ambiente Especial (água)',
    fullDescription: 'Humanoides anfíbios pertencem a uma das numerosas raças submarinas (tritões, sereias, nereidas, elfos-do-mar...) que existem em mundos de fantasia ou outros planetas. Ou talvez tenham sido criados por engenharia genética para trabalhar nas profundezas ou colonizar mundos oceânicos, quem sabe? A escolha exata é sua. Anfíbios podem viver e agir fora d\'água normalmente; sereias e outras raças com cauda de peixe podem criar pernas normais quando estão em terra. • Resistência +1. Por sua tolerância a mudanças de pressão, anfíbios são vigorosos. • Natação. Anfíbios podem respirar e mover-se na água com velocidade normal, sem precisar da perícia Natação. • Radar. Anfíbios têm este Sentido Especial apenas quando estão embaixo d\'água. • Ambiente Especial. Anfíbios dependem de água para viver. • Vulnerabilidade: Fogo. Anfíbios são bastante sensíveis ao calor.'
  },
  { 
    name: 'Centauro', 
    cost: 1, 
    group: 'Humanoides', 
    description: 'Força +1, Habilidade +1 (corrida), Combate Táurico',
    fullDescription: 'Este é um nome genérico para qualquer criatura "táurica", que tenha um torso humano ligado a um corpo com quatro ou mais patas. Centauros típicos são meio humanos, meio cavalos. Mas também existem raças mais raras de meio-leões, meio-lagartos, meio-aranhas, meio-escorpiões e várias outras. Alguns podem ser amigos dos humanos e semi-humanos, enquanto outros são seus predadores. • Força +1. Por sua metade inferior, centauros são capazes de grande esforço físico. • Habilidade +1. Centauros recebem H+1 apenas para situações de corrida, fuga e perseguição (mas não esquivas). • Combate Táurico. Em combate, centauros podem deixar de fazer um ataque normal para fazer dois ataques por rodada com as patas dianteiras (cascos, garras...). São ataques baseados em Força (FA=F+1d), mas imprecisos, sem incluir a Habilidade do personagem. Se quiser aumentar a FA através de vantagens ou manobras, deve pagar o custo para cada ataque. • Modelo Especial. Obviamente, centauros não podem usar roupas, armas, veículos ou equipamentos feitos para humanos.'
  },
  { 
    name: 'Goblin', 
    cost: -1, 
    group: 'Humanoides', 
    description: 'Testes de Resistência +1, Infravisão, Aptidão para Crime, Má Fama',
    fullDescription: 'Goblins são uma raça humanoide de pequena estatura (cerca de 1m), muito comum em mundos fantásticos. Em geral são malignos, mas algumas sociedades os aceitam como cidadãos, e uns poucos podem ser heróis. Sua pele tem cor de terra, seus olhos são muito vermelhos e brilham na escuridão. Quase ninguém confia neles, mas podem ser contratados para trabalhar por preço baixo. Em regiões selvagens, grandes grupos de goblins costumam estar sob o comando de um líder ou mesmo um rei, que cavalga um grande lobo ou outro tipo de criatura. • Testes de Resistência +1. Goblins são habituados à sujeira e rigores da vida. • Infravisão. Goblins são noturnos e subterrâneos, por isso enxergam no escuro. • Aptidão para Crime. Para goblins, a perícia Crime custa apenas 1 ponto. • Má Fama. Ninguém confia em goblins ou gosta de tê-los por perto. • Magia. Para goblins, ser um conjurador é mais difícil. Magia Branca, Elemental e Negra custam 3 pontos cada. No entanto, um goblin com Clericato pode comprar Magia Branca pelo custo normal (2 pontos).'
  },
  { 
    name: 'Kemono', 
    cost: 1, 
    group: 'Humanoides', 
    description: 'Habilidade +1, Sentidos Especiais (2 escolhidos)',
    fullDescription: 'Também conhecidos como juujin ou kemonobito, os kemono são animais antropomórficos — ou seja, com características humanas. São bichos de várias espécies (a maioria, mamíferos) que andam, falam e agem como humanos. Muitas vezes são confundidos com licantropos (veja adiante) e outros monstros. Mas o kemono típico, exceto pela aparência, é absolutamente humano: fala línguas normais, veste roupas normais, come comida normal, e vive em casas normais. Muitos, inclusive, ficarão ofendidos caso sejam tratados como animais. Seu comportamento é tão civilizado que confunde as diferenças entre animais e humanos. Alguns kemono demonstram traços de personalidade ligados à sua aparência animal: coelhos são cautelosos, raposas são traiçoeiras, gatos são independentes, cães são leais, e assim por diante. Uma variedade especial de kemono são os nekomimi, pessoas com orelhas, cauda e às vezes (mas nem sempre) patas de animais. O animal mais comum é o gato, mas também existem nekomimi de grandes felinos (panteras, onças, tigres...), coelhos, raposas, cães, lobos, porcos e outros mamíferos. • Habilidade +1. "Mais humanos que os humanos", kemono são inteligentes e hábeis. • Sentidos Especiais. Kemono podem escolher dois entre os seguintes: Audição Aguçada, Visão Aguçada e Faro Aguçado. Eles raramente são apanhados de surpresa.'
  },
  { 
    name: 'Meio-Dragão', 
    cost: 4, 
    group: 'Humanoides', 
    description: 'Arcano, Invulnerabilidade (elemento do dragão)',
    fullDescription: 'Dragões são monstros de incrível virilidade. Eles assumem formas humanoides (entre outras) para acasalar com membros de raças e espécies variadas. Devido à potência de seu sangue, seus filhos quase sempre serão meio-dragões, seres que herdam parte do poder elemental dos grandes répteis. Perto de seus covis, praticamente tudo que se move será um pouco dragão. Meio-dragões resultam da união entre um dragão e uma mulher humana ou semi-humana (cruzamentos entre homens e dragoas não produzem descendentes). A gravidez é normal, e o bebê parece pertencer totalmente à raça da mãe — na verdade, caso não se conheça a verdadeira natureza do pai, será impossível identificar qualquer coisa diferente na criança. Um meio-dragão nunca desenvolve asas, escamas ou coisas assim. Sua aparência pode ser totalmente normal, até atraente pelos padrões de beleza de sua raça. As diferenças são interiores: ele terá capacidades acima da média e afinidade com magia. Até aí, nada que possa identificá-lo como meio-dragão. O problema é que, quando o jovem filho da costureira da vila sobrevive a um incêndio sem nada sofrer, talvez seu verdadeiro pai tivesse escamas vermelhas... • Arcano. Um meio-dragão tem grande afinidade com magia. • Invulnerabilidade. Um meio-dragão é invulnerável a dano causado pelo elemento ligado a seu pai dragão: frio (para um meio-dragão branco), elétrico (azul), químico (verde ou marinho), fogo (vermelho) ou Magia Negra (para um meio-dragão negro).'
  },
  { 
    name: 'Minotauro', 
    cost: 2, 
    group: 'Humanoides', 
    description: 'Força +2, Habilidade -1, Infravisão',
    fullDescription: 'A raça guerreira dos minotauros é composta por humanoides de grande estatura (em média 1,90m de altura) com corpos humanos musculosos e cabeças bovinas. Embora a cabeça de touro seja mais comum, existem numerosas sub-raças com cabeças de búfalo, gnu, bisão, boi-almiscarado, antílope, alce e outros animais aparentados. Alguns têm cascos bipartidos em vez de pés, mas essa não é a regra geral. Não existem minotauros fêmeas. Eles se reproduzem com fêmeas humanas e élficas. Por esse motivo, minotauros ricos e poderosos mantêm grandes haréns de escravas — fazendo com que sejam odiados por outras raças. • Força +2, Resistência +1. Minotauros são muito fortes e saudáveis. • Mente Labiríntica. Minotauros nunca se perdem em labirintos. Quando percorrem uma rede de túneis, masmorras ou estruturas semelhantes, conseguem memorizar o trajeto sem precisar de mapas — e sempre serão capazes de achar o caminho de volta. Esta habilidade não funciona em florestas, pântanos e outros tipos de terreno; apenas túneis e corredores. • Código de Honra do Combate. Minotauros nunca usam armas ou vantagens superiores às armas do oponente, e nunca atacam oponentes caídos ou em desvantagem numérica. Eles também nunca montam cavalos ou qualquer outra criatura, pois acham indigno caminhar sem usar os próprios cascos. • Má Fama. Minotauros são conhecidos como arrogantes, brigões e escravistas. • Fobia. Minotauros têm medo de altura. Estar perto de uma queda superior a 3m provoca neles o mesmo efeito da magia Pânico, se falharem em um teste de Resistência +2.'
  },
  { 
    name: 'Ogre', 
    cost: 1, 
    group: 'Humanoides', 
    description: 'Força +2, Habilidade -1, Resistência +1',
    fullDescription: 'Também conhecidos como ogros, são humanoides primitivos e brutais, medindo 3m de altura. Vestem peles de animais como se fossem roupas, vivem em cavernas e preferem usar clavas como armas. Carnívoros, costumam matar e devorar seres humanos e semi-humanos. Por todos esses motivos, é muito fácil contratar ogres como guardas, soldados e mercenários; para ter sua lealdade basta oferecer boa comida, armas, armaduras e oportunidades de combate. Chega a ser raro encontrar um vilão ou lorde maligno que não tenha pelo menos um punhado de ogres a seu serviço. Embora seja incomum, um ogre pode fazer parte de um grupo de aventureiros; livre da influência de outros da mesma raça, ele será capaz de moderar seu comportamento e perceber os benefícios de fazer parte de uma equipe com habilidades que ele não tem. • Força +3, Resistência +3. Quase nada é tão forte ou resistente quanto um ogre. • Modelo Especial. Quase nada é tão grande quanto um ogre. • Inculto. Quase nada é tão estúpido quanto um ogre (só não vá dizer isso a ele). • Má Fama, Monstruoso. Quase nada é tão indesejado quanto um ogre. Eles acumulam os ajustes destas desvantagens em testes de perícias: +2 em Interrogatório e Intimidação; –2 em Lábia e Sedução. • Vantagens Proibidas. Quase nada é tão limitado quanto um ogre. Eles não podem comprar Genialidade, Memória Expandida e nenhuma vantagem mágica.'
  },
  { 
    name: 'Troglodita', 
    cost: 0, 
    group: 'Humanoides', 
    description: 'Resistência +1, Infravisão, Faro Aguçado',
    fullDescription: 'Trogloditas, ou trogs, são uma raça guerreira de homens-lagarto subterrâneos. Em geral são malignos e inimigos das raças humanas e semi-humanas, mas membros desgarrados podem acabar se tornando heróis aventureiros. Gostam muito de cerveja e objetos feitos de aço. • Força +1, Armadura +1. Trogs são fortes e têm couro resistente. • Infravisão. Como raça subterrânea, trogs enxergam no escuro. • Camuflagem. Por sua pele camaleônica, trogs sempre fazem testes de Furtividade como se tivessem uma perícia própria. • Ataque Pestilento. Apenas trogs têm esta habilidade. Eles podem gastar 2 Pontos de Magia para expelir um óleo fedorento que exige de todas as criaturas próximas (distância de ataque corpo-a-corpo) um teste de Resistência. Falha resulta na perda temporária de 1 ponto de Força, até o fim do combate. Criaturas com Faro Aguçado falham automaticamente no teste. Criaturas bem-sucedidas no teste ficam imunes ao cheiro de qualquer trog durante 24 horas. • Monstruoso. São homens-lagarto fedidos, o que você esperava? • Vulnerabilidade: Frio. Por seu sangue frio, trogs têm pouca tolerância ao gelo.'
  },
  
  // Youkai
  { 
    name: 'Anjo', 
    cost: 3, 
    group: 'Youkai', 
    description: 'Habilidade +1, Voo, Magia Branca, Vulnerabilidade: Fogo',
    fullDescription: 'Anjos, também conhecidos como celestiais ou tenshi, são criaturas que habitam os planos superiores. São raros no Plano Material, mas muito frequentes em alguns Reinos dos Deuses. Sua aparência é igual a uma criatura normal, mas com traços mais belos e imponentes. A maioria dos celestiais são benignos (mas não todos). Nem todos têm forma humanoide; existem também ursos, leões, unicórnios e tantos outros seres celestiais. Anjos que visitam o Plano Material fazem jornadas voluntárias, através de feitiços, portais mágicos ou habilidades naturais. Outros são invocados (ou capturados) por conjuradores poderosos ou fenômenos sobrenaturais. • Boa Fama. Anjos são sempre reconhecidos como benevolentes ou sagrados (mesmo que nem sempre seja o caso). • Sentidos Especiais. Todo anjo tem Infravisão, Visão Aguçada e Ver o Invisível. • Invulnerabilidade: Elétrico e Sônico. Anjos são resistentes a estas energias originárias das nuvens. • Aptidão para Voo. Muitos anjos têm asas, por isso podem comprar esta vantagem por apenas 1 ponto. • Aptidão para Magia Branca. Anjos podem comprar esta vantagem por apenas 1 ponto. • Teleportação Planar. Um anjo pode usar esta magia livremente, por seu custo normal em Pontos de Magia, exceto quando está preso ao próprio plano nativo por sua Maldição (veja a seguir). • Maldição. Todo anjo destruído fora de seu plano de origem é banido de volta, e não pode retornar durante algum tempo — desde 30 dias até 1000 anos, à escolha do mestre. Um anjo destruído em seu próprio plano de origem desaparece para sempre, e não pode ser ressuscitado (exceto com um Desejo). • Vulnerabilidade: Fogo. Anjos são vulneráveis às chamas do inferno.'
  },
  { 
    name: 'Demônio', 
    cost: 1, 
    group: 'Youkai', 
    description: 'Aptidão para Magia Negra, Má Fama',
    fullDescription: 'Também conhecidos como abissais, infernais ou oni, um demônio é qualquer criatura nativa de um plano ou dimensão de natureza maligna — geralmente o Abismo, os Nove Infernos, o Hades, o Mundo Sombrio e outros lugares de nomes deprimentes. Estes seres extraplanares visitam a Terra com objetivos diversos, desde a coleta de almas (que eles empregam como alimento, fonte de energia ou moeda) até caça a tesouros, perseguição a fugitivos e mesmo coisas simples e triviais como "fazer turismo". Embora grande parte dos demônios atue como servos para um lorde poderoso, um deus-monstro maligno ou outro patrono, muitos são independentes e têm objetivos próprios. Muitos são aventureiros, e alguns nem mesmo são malignos. • Sentidos Especiais. Todo demônio tem Infravisão, Faro Aguçado e Ver o Invisível. • Invulnerabilidade: Fogo. Demônios são imunes a dano por fogo. • Aptidão para Voo. Muitos demônios têm asas, por isso podem comprar esta vantagem por apenas 1 ponto. • Aptidão para Magia Negra. Demônios podem comprar esta vantagem por 1 ponto. • Teleportação Planar. Um demônio pode usar esta magia livremente, por seu custo normal em Pontos de Magia, exceto quando está preso ao próprio plano nativo por sua Maldição (veja adiante). • Má Fama. Demônios são sempre reconhecidos como perigosos e malignos (mesmo que nem sempre seja o caso). • Maldição. Todo demônio destruído fora de seu plano de origem é banido de volta, e não pode retornar durante algum tempo — desde 30 dias até 1000 anos, à escolha do mestre. Um demônio destruído em seu próprio plano de origem desaparece para sempre, e não pode ser ressuscitado (exceto com um Desejo). • Vulnerabilidade: Elétrico e Sônico. Demônios são vulneráveis à pureza da luz e vento.'
  },
  { 
    name: 'Fada', 
    cost: 1, 
    group: 'Youkai', 
    description: 'Habilidade +1, Voo, Pequenos Desejos, Modelo Especial',
    fullDescription: '"Fada" é um nome genérico para muitas pequenas criaturas de natureza altamente mágica, muitas vezes ligadas à natureza ou certos deuses. Elas podem ser conhecidas como sprites, pixies, dríades, sátiros, ninfas... Embora a aparência das fadas possa variar imensamente, grande parte delas tem o aspecto de pequeninas jovens élficas, com asas de libélula ou borboleta, e olhos negros e brilhantes, feito olhos de inseto ou lagartixa. Muitas têm antenas. Outras ostentam um segundo par de braços, parecidos com garras ou patas de inseto. Fadas são de natureza curiosa e brincalhona. Comportam-se como crianças, mas podem atingir séculos de idade e esconder grande sabedoria. Nunca envelhecem. No entanto, quando morrem, não podem ser ressuscitadas por meios normais, pois seus corpos se transformam em poeira brilhante. Apenas uma magia Desejo pode trazer uma delas de volta à vida. • Habilidade +1. Fadas são ágeis e graciosas. • Aparência Inofensiva. Minúsculas e de aspecto delicado, fadas não parecem capazes de machucar ninguém. • Voo. Quase todas as fadas podem voar. Se você optar por uma fada sem asas, a vantagem custará 2 pontos. • Magia. Fadas recebem Magia Branca ou Negra (à escolha do jogador) e Magia Elemental sem pagar pontos. • Modelo Especial. A menos que você coleciona brinquedos, é realmente difícil conseguir roupas, armas, instrumentos e veículos para fadas. Embora sejam incomuns, há fadas de tamanho humano. Elas não sofrem os efeitos de Modelo Especial, mas também não recebem H+1. O custo da vantagem fica inalterado. • Vulnerabilidade: Magia. Fadas são muito vulneráveis a magia e armas mágicas. • Vantagens Proibidas. Fadas nunca podem adquirir Resistência à Magia e, obviamente, não podem ser Monstruosas.'
  },
  { 
    name: 'Licantropo', 
    cost: 2, 
    group: 'Youkai', 
    description: 'Forma Alternativa, Força +2 na forma animal',
    fullDescription: 'Também conhecido como hengeyoukai (que significa "demônio metamorfo"), esta criatura foi vítima de uma maldição, ou pertence a uma raça capaz de se transformar em fera: lobisomem, homem-urso, homem-rato, homem-tigre e outros. Sua aparência e hábitos podem variar muito, mas é mais comum que usem roupas de couro ou peles de animal. • Força +1, Armadura +1. Em sua forma de fera, licantropos são mais fortes e têm couro rígido. • Monstruoso. Apenas quando em forma de fera. • Vulnerabilidade: Magia e Prata. Em qualquer de suas formas, lobisomens são vulneráveis a magia e armas feitas de prata. • Transformação. Infelizmente, a transformação de um licantropo não está sob seu controle. Ela ocorre apenas em certas condições, independentes de sua vontade. A licantropia é diferente para cada um, sendo que o jogador e o mestre devem discutir cada caso. Alguns exemplos: Fúria: uma forma especial da desvantagem Fúria: além de sofrer os efeitos normais, você se transforma em fera até a luta terminar. Lua Cheia: clássico. Você se transforma quando vê a lua e só retorna ao normal quando vê o sol (desenhos e fotografias também valem!). Perto da Morte: você se transforma em fera quando está Perto da Morte. Protegido Indefeso: você tem um Protegido, e se transforma quando ele está em perigo. Neste caso você não sofre o redutor normal de Habilidade.'
  },
  { 
    name: 'Meio-Abissal', 
    cost: 2, 
    group: 'Youkai', 
    description: 'Aptidão para Magia Negra, Resistência à Magia',
    fullDescription: 'Resultado do envolvimento entre demônios e mortais, um meio-abissal carrega em seu sangue a herança maldita de seu pai ou mãe extraplanar, com todas as suas fraquezas, mas apenas uma pequena parte de seus poderes. Felizmente, eles são nativos deste mundo e não podem ser banidos ou aprisionados em outros planos como os demônios verdadeiros. • Sentidos Especiais. Todo meio-abissal tem Infravisão, Faro Aguçado e Ver o Invisível. • Armadura Extra: Fogo. Meio-abissais são resistentes a dano por fogo. • Aptidão para Voo. Para meio-abissais, esta vantagem custa 1 ponto. • Aptidão para Magia Negra. Para meio-abissais, esta vantagem custa 1 ponto. • Vulnerabilidade: Elétrico e Sônico. Meio-abissais são vulneráveis à pureza da luz e vento.'
  },
  { 
    name: 'Meio-Celestial', 
    cost: 2, 
    group: 'Youkai', 
    description: 'Aptidão para Magia Branca, Resistência à Magia',
    fullDescription: 'Resultado do envolvimento entre anjos e mortais, um meio-celestial tem a nobreza e pureza dos anjos em seu sangue, mas de forma diluída, com todas as suas fraquezas e apenas uma fração de seus poderes. Ao contrário de um anjo verdadeiro, é nativo deste mundo e não pode ser banido ou aprisionado em outros planos. • Sentidos Especiais. Todo meio-celestial tem Infravisão, Visão Aguçada e Ver o Invisível. • Armadura Extra: Elétrico e Sônico. Meio-celestiais são resistentes a estas energias originárias das nuvens, o relâmpago e o trovão. • Aptidão para Voo. Para meio-celestiais, esta vantagem custa 1 ponto. • Aptidão para Magia Branca. Para meio-celestiais, esta vantagem custa 1 ponto. • Vulnerabilidade: Fogo. Meio-celestiais são vulneráveis às chamas do inferno.'
  },
  { 
    name: 'Meio-Gênio', 
    cost: 1, 
    group: 'Youkai', 
    description: 'Aptidão para Magia Elemental, Vantagem Bônus',
    fullDescription: 'Filhos de humanos e seres mágicos — não necessariamente gênios, mas também fadas, ninfas e outros —, os meio-gênios proliferam no mundo mágico de Arton, um mundo abençoado por Wynna, a bela Deusa da Magia. Eles também podem existir no mundo moderno, embora sejam muito mais raros. Meio-gênios não governam nenhuma nação, nem formam comunidades — apenas vivem em meio aos humanos, emprestando a esses "pobres desafor tunados" seu extremo poder arcano. Trazem sempre uma grande tatuagem mágica que brilha quando usam seus poderes. Por sua ascendência, têm habilidades mágicas naturais e uma predisposição a ajudar aqueles em necessidade. São generosos, estão sempre ansiosos para prestar favores. • Arcano. Meio-gênios têm grande afinidade com magia. • Armadura Extra. Meio-gênios são resistentes a um elemento que depende de sua descendência. Existem meio-gênios da água (Químico), ar (Sônico), fogo (Fogo), terra (Esmagamento), luz (Elétrico) e trevas (Magia). • Aptidão para Voo. Muitos meio-gênios podem levitar, por isso pagam apenas 1 ponto por esta vantagem. • Desejos. Quando um meio-gênio lança uma magia a pedido de outra pessoa, ele gasta apenas metade do custo em Pontos de Magia. O meio-gênio ainda pode conjurar magias pelo custo normal, sem ninguém pedir. • Código da Gratidão. Todo meio-gênio sempre será grato a alguém que tenha lhe prestado um grande favor, como salvar sua vida ou libertá-lo de um cativeiro. Ele adotará essa pessoa como seu "amo".'
  },
  
  // Construtos
  { 
    name: 'Androide', 
    cost: 2, 
    group: 'Construtos', 
    description: 'Resistência +1, Bateria, Resistência à Magia',
    fullDescription: 'Vem do grego "andros" (homem) e "oide" (criatura), e significa autômato (robô) de figura humanoide. Um androide é um construto com aparência e comportamento humanos. É impossível saber a diferença sem um exame cuidadoso ou formas eletrônicas de detecção. • Aparência Humana. Androides normalmente têm boa aparência, para lidar melhor com pessoas. Um androide de aparência desagradável, ou que possa ser prontamente identificado como não humano, reduz o custo da vantagem única em 1 ponto. • Alma Humana. Alguns androides são tão perfeitos que chegam a ter emoções verdadeiras. Em certos casos, podem nem mesmo saber que são androides, recebendo memórias falsas para acreditar que são humanos. Estes construtos podem ser normalmente afetados por magias e poderes que afetam a mente (Telepatia e magias da escola Elemental (espírito), reduzindo o custo total da vantagem única em 1 ponto.'
  },
  { 
    name: 'Ciborgue', 
    cost: 1, 
    group: 'Construtos', 
    description: 'Característica +1, Bateria, Modelo Especial',
    fullDescription: 'Vem de "ciborg", abreviação de "organismo cibernético". Um ciborgue é um tipo de "meio-construto", uma combinação de homem e máquina, reunindo o melhor dos dois mundos. Eles são parte máquina, parte ser vivo. Ciborgues podem ser máquinas com partes humanas, ou humanos com partes mecânicas. Essa diferença é importante: os primeiros têm cérebros eletrônicos, e os últimos têm cérebros humanos. • Construto Vivo. Uma vez que têm partes orgânicas, ciborgues podem recuperar até metade de seus Pontos de Vida (arredondado para cima) com descanso ou cura normais, sem a necessidade de conserto. Isso quer dizer que metade de seus PVs são "orgânicos", e metade são "mecânicos". Você ainda é imune a magias que afetam apenas seres vivos. • Cérebro Orgânico. Se você escolher esta opção, será normalmente afetado por magias e poderes que afetam seres vivos, e a vantagem única custará –1 ponto.'
  },
  { 
    name: 'Golem', 
    cost: 3, 
    group: 'Construtos', 
    description: 'Força +2, Armadura +2, Bateria, Inculto',
    fullDescription: 'Golens são criaturas mágicas artificiais, construídas por grandes magos, clérigos ou cientistas a partir de materiais diversos. O uso de magia poderosa na fabricação destes construtos permite que apresentem uma impressionante variedade de tipos, formas e poderes. A maioria lembra grandes guerreiros em armaduras metálicas, mas com formas tão diferentes que nenhum humano poderia estar ali dentro. Outros são feitos de ossos, tornando-os parecidos com mortos-vivos. Alguns são de vidro ou cristal, enquanto outros ainda podem ser de madeira ou barro. • Imunidade. Além das imunidades normais de um construto, golens são tremendamente resistentes a magia. Eles possuem Armadura Extra contra todas as magias que causam dano, e são automaticamente bem-sucedidos em testes de Resistência contra quaisquer outras magias. • Camuflagem. Muitos golens são do tipo "estátua viva", feitos para se parecer com esculturas de metal, madeira ou pedra. Conseguem se fazer passar por esculturas comuns ou misturar-se ao ambiente, como gárgulas ou estátuas guardiãs de portais. Golens fazem testes de Furtividade como se tivessem uma perícia própria. • Monstruoso. Uma vez revelados, golens são criaturas horríveis e assustadoras.'
  },
  { 
    name: 'Mecha', 
    cost: 3, 
    group: 'Construtos', 
    description: 'Força +2, Armadura +2, Bateria, Modelo Especial',
    fullDescription: 'O mecha (pronuncia-se "meca") segue a estética dos robôs japoneses de mangá e anime. Parece pouco com uma pessoa, e muito com maquinaria pesada. São grandes e angulosos, os mais mecânicos entre os construtos. Qualquer mecha que pertence a um personagem jogador é, na verdade, um Aliado com esta vantagem única. Mechas comuns têm tamanho humano ou maior, entre 2 e 3m de altura (mas aqueles de escalas diferentes podem ser gigantescos). Têm a cabeça pequena em proporção com o resto do corpo, reforçando a impressão de que são imensos. Muitos têm um visor no lugar dos olhos, ou nem mesmo têm rosto — a cabeça mais parece um capacete. Ao contrário dos androides, ciborgues e outros, mechas não são feitos para se adaptar à vida humana — são considerados simples ferramentas, instrumentos ou eletrodomésticos. Embora a maioria dos mechas tenha estrutura humanoide básica (cabeça, tronco, dois braços, duas pernas), é muito comum que tenham formas diferentes, dependendo de sua função. Um mecha de batalha pode possuir um canhão substituindo um braço, enquanto um mecha operário pode ter garras próprias para segurar e transportar cargas. • Aptidão para Forma Alternativa. A estrutura mais "mecânica" dos mechas também permite que alguns destes robôs consigam mudar de uma configuração para outra — são os famosos transformers. A combinação humanoide/veículo é mais comum, pois oferece a versatilidade humana e a mobilidade de um carro, moto, jato, nave ou outro veículo. Também existem as formas de animal (em versão mecanizada), estrutura imóvel (uma torre de vigília, antenas de comunicação, estação de batalha...), aparelho (pistola, rádio-gravador, fita-cassete...) e outras. Uns poucos possuem três ou até quatro formas diferentes. Um mecha paga apenas 1 ponto por esta vantagem. • Modelo Especial. É comum que mechas sejam grandes demais para usar roupas, armas, veículos e outros utensílios destinados a humanos. No entanto, podem recomprar esta desvantagem por 1 ponto.'
  },
  { 
    name: 'Meio-Golem', 
    cost: 1, 
    group: 'Construtos', 
    description: 'Resistência +1, Armadura +1, Bateria',
    fullDescription: 'Esta é a versão medieval mágica de um ciborgue — uma criatura viva que recebeu partes artificiais mágicas em substituição a certas partes naturais. Sua maior vantagem sobre os demais construtos é a capacidade de usar magia. • Construto Vivo. Meio-golens podem recuperar até metade de seus Pontos de Vida (arredondado para cima) com descanso ou cura normais, sem a necessidade de conserto. Metade de seus PVs são "orgânicos", e metade são "mecânicos". • Cérebro Orgânico. Um meio-golem é normalmente afetado por magias e poderes que afetam seres vivos. • Magia. Meio-golens ganham uma vantagem mágica (Magia Branca, Elemental ou Negra) à sua escolha. • Insano. O processo de transformação em criatura artificial é algo horrível demais para suportar. Todo meio-golem tem uma insanidade de –1 ponto.'
  },
  { 
    name: 'Nanomorfo', 
    cost: 2, 
    group: 'Construtos', 
    description: 'Forma Alternativa, Bateria',
    fullDescription: 'Um nanomorfo é um construto feito de metal líquido. Não tem partes mecânicas: é formado por milhões e milhões de nanitas — robôs microscópicos que se prendem uns aos outros e agem coordenadamente. Isso permite ao construto assumir quase qualquer forma, exceto máquinas complexas como armas de fogo. • Doppleganger. Por sua facilidade em mudar de forma e cor, um nanomorfo pode assumir a aparência de qualquer pessoa ou objeto que tenha mais ou menos o seu próprio tamanho (mas não pode copiar sua memória ou poderes especiais). • Adaptador. Um nanomorfo pode modelar com suas mãos qualquer tipo de instrumento ou arma simples, como clavas, lâminas e peças pontiagudas. Para ataques baseados em Força, ele pode causar dano por esmagamento, corte ou perfuração, à sua escolha. • Membros Elásticos. Um nanomorfo pode alongar seus braços ou tentáculos para atingir alvos distantes. • Bônus em Perícias. Um nanomorfo pode criar ferramentas e instrumentos diversos com as mãos. Por isso recebe um bônus de +2 em testes de Habilidade ligados a Crime e Máquinas. • Regeneração. Um nanomorfo não pode ser consertado, mas regenera 1 Ponto de Vida por rodada. Caso chegue a 0 PVs, leva 1dx10 minutos para recuperar 1 PV e então volta a regenerar normalmente. As únicas formas de realmente deter um nanomorfo são através de prisão (cativeiro, paralisia, congelamento...), dano contínuo (como ser mergulhado em um tanque de ácido ou metal derretido) ou colapso total (caso ele receba dano igual a dez vezes seus Pontos de Vida atuais, de uma só vez). • Aptidão para Separação. Nanomorfos pagam apenas 1 ponto por esta vantagem.'
  },
  { 
    name: 'Robô Positrônico', 
    cost: 2, 
    group: 'Construtos', 
    description: 'Habilidade +1, Bateria, Resistência à Magia',
    fullDescription: 'O robô positrônico foi inventado pelo grande escritor de ficção científica Isaac Asimov. Ele tem forma humanoide, para usar instrumentos e veículos projetados para humanos. Tem aparência nitidamente metálica, em cromo ou alumínio, enquanto outros são quase humanos — mas sempre com algum detalhe óbvio para diferenciá-los, como os movimentos, olhos ou voz. Em sociedades futuristas, onde robôs são criados para servir aos humanos, praticamente todos os construtos que convivem com pessoas pertencem a este tipo. • Código de Honra. Todos os robôs positrônicos são programados com as Três Leis da Robótica, que são: 1ª Lei: jamais causar mal a um ser humano ou, por omissão, permitir que um ser humano sofra qualquer mal. Em mundos habitados por várias raças, esta lei pode ser estender a qualquer semi-humano, ou qualquer não-construto. 2ª Lei: sempre obedecer ordens de seres humanos, exceto quando essas ordens violam a 1ª Lei, ou qualquer outro Código de Honra que o robô possua. 3ª Lei: um robô deve proteger sua própria existência, desde que essa proteção não entre em conflito com a 1ª ou 2ª Leis, e nem com qualquer outro Código de Honra que o robô possua.'
  },
  
  // Mortos-Vivos
  { 
    name: 'Esqueleto', 
    cost: 1, 
    group: 'Mortos-Vivos', 
    description: 'Armadura Extra (Corte e Perfuração), Invulnerabilidade: Frio',
    fullDescription: 'Muitos esqueletos são simples amontoados de ossos que andam e lutam, os mais fracos entre os mortos-vivos. Quase nunca surgem naturalmente; costumam ser invocados por magos necromantes e clérigos (um ato considerado criminoso e maligno na maioria das culturas) para atuar como guardas e soldados. Alguns poucos, no entanto, adquirem vontade própria, intelecto superior e equipam-se com armas e armaduras pesadas, tornando-se guerreiros temíveis. Esqueleto poderosos podem ser grandes heróis (e vilões ainda piores). • Invulnerabilidade: Frio. Esqueletos não sentem frio. • Armadura Extra: Corte e Perfuração. Não há mais carne para cortar ou perfurar. • Devoção. Normalmente envolve seguir as ordens de seu invocador; esqueletos são obedientes a seus mestres. • Inculto. Quase todos os esqueletos são silenciosos, totalmente mudos. Aqueles capazes de falar o fazem com uma voz estridente e arranhada (e recompram esta desvantagem). • Monstruoso. Um esqueleto nunca pode se fazer passar por um ser humano, mesmo quando disfarçado.'
  },
  { 
    name: 'Fantasma', 
    cost: 3, 
    group: 'Mortos-Vivos', 
    description: 'Invisibilidade, Voo, Invulnerabilidade (físico)',
    fullDescription: 'Fantasmas são mortos-vivos imateriais, espíritos descarnados. Quando surgem, geralmente é porque algum motivo poderoso e particular impede que tenham o descanso eterno. Fantasmas podem se fazer passar perfeitamente por humanos vivos — exceto ao toque, é claro. Eles também revelam sua real natureza quando usam qualquer poder que consome Pontos de Magia; nesse momento se tornam translúcidos, semi-transparentes. • Incorpóreo. Fantasmas são imunes a todas as formas de dano físico e energia. Eles sofrem dano apenas por magia, ou ataques realizados por um xamã ou outra criatura incorpórea. Da mesma forma, fantasmas não podem usar sua própria Força ou PdF para interagir com o mundo físico — podem tocar apenas xamãs e outros seres incorpóreos. • Imortal. Quando destruídos, fantasmas ressurgem mais tarde no mesmo local onde morreram. Um fantasma nunca pode ser completamente destruído. • Pânico. Fantasmas podem conjurar esta magia pelo custo normal em PMs. • Aptidão para Invisibilidade. Para fantasmas, esta vantagem custa 1 ponto. • Aptidão para Possessão. Para fantasmas, esta vantagem custa 1 ponto. • Devoção. Um fantasma está preso a este mundo por amor, raiva, vingança ou razões que ele próprio não consegue entender, sempre envolvido em uma missão interminável.'
  },
  { 
    name: 'Múmia', 
    cost: 2, 
    group: 'Mortos-Vivos', 
    description: 'Armadura Extra (Fogo), Invulnerabilidade: Fogo',
    fullDescription: 'Múmias são cadáveres embalsamados e preparados para resistir à passagem dos séculos. Rituais funerários garantem à sua alma uma viagem tranquila ao Reino dos Mortos. Infelizmente, às vezes algum tipo de maldição impede que o espírito da múmia deixe este mundo. Múmias podem usar um disfarce ilusório para se parecer com seres humanos (mas o disfarce se dissipa quando sofrem dano ou entram em combate). Múmias são inteligentes; as mais antigas, inclusive, podem ser magos ou clérigos poderosos. • Armadura Extra. Múmias sofrem dano normal apenas por fogo e magia. Contra quaisquer outras formas de dano, sua Armadura é dobrada. • Podridão de Múmia. Quando uma múmia é bem-sucedida em um ataque com suas garras (baseado em Força), além de sofrer dano normal, a vítima deve ter sucesso em um teste de Resistência. Se falhar, vai contrair uma doença pestilenta que provoca um redutor de –1 em todas as características. Essa doença é uma Maldição de –1 ponto para ser removida, e afeta apenas criaturas vivas. Criaturas com Resistência superior à Habilidade da múmia são imunes. • Pânico. Múmias podem conjurar esta magia pelo custo normal em PMs. • Ambiente Especial. Múmias têm problemas para afastar-se de sua própria tumba, sofrendo os efeitos normais desta desvantagem.'
  },
  { 
    name: 'Vampiro', 
    cost: 4, 
    group: 'Mortos-Vivos', 
    description: 'Força +1, Habilidade +1, Regeneração, Dependência (sangue)',
    fullDescription: 'Provavelmente os mais temidos mortos-vivos, vampiros são também aqueles com habilidades mais variadas. Eles podem ser de origem mágica ou científica, surgindo através de maldições, contaminação por doenças raras, rituais demoníacos... Vampiros podem se fazer passar por humanos (ou elfos, pois alguns têm orelhas pontudas) sem muita dificuldade, vivendo disfarçados em sociedade — embora muitos prefiram apenas se esconder em covis durante o dia e caçar à noite. Dependência. O que define um vampiro é sua necessidade de sugar a vida dos vivos; todos eles dependem de alguma coisa rara, proibida ou monstruosa para continuar existindo. Sangue humano é a necessidade mais óbvia e comum, mas também existem aqueles que sugam almas ou devoram partes do corpo. Seja como for, um vampiro precisa matar um humano, semi-humano ou humanoide todos os dias, ou enfraquece até ser destruído. Maldição. Vampiros sofrem dano quando expostos à luz do dia. Perdem 1 Ponto de Vida por turno até virarem cinzas. A perda se reduz a 1 PV por minuto em dias nublados ou quando usam roupas pesadas. Cada vampiro é único, com uma combinação própria de poderes e fraquezas. O jogador pode comprar vantagens ou adquirir desvantagens entre as seguintes: • Forma de Névoa (1 ponto): o vampiro pode se transformar em névoa. Nessa forma ele pode flutuar (Voo com H1) e é incorpóreo (veja em Fantasma). • Formas Alternativas (1 ponto cada): o vampiro pode se transformar em lobo-das-cavernas (F1, H2, R2, A1, PdF0, Faro e Audição Aguçados) ou morcego-gigante (F0, H3, R1, A0, PdF0, Voo, Radar). • Imortal (1 ponto): quando destruído, o vampiro ressurge após 2d noites em sua tumba ou algum outro lugar. • Invulnerabilidade (3 pontos): o vampiro pode ser ferido apenas com fogo e magia. • Magia Negra (1 ponto): para um vampiro, esta vantagem custa 1 ponto. • Monstruoso (–1 ponto): o vampiro tem aparência repulsiva e não pode se fazer passar por um humano normal. Além disso, pelo tamanho de suas presas e aspecto de morcego, pode ser facilmente identificado como um vampiro. • Fobia (–1 ponto): cheiro de alho, toque de água benta, e a presença de fogo ou qualquer símbolo religioso. • Vulnerabilidade: Químico (–1 ponto): além de ter Armadura reduzida a zero contra ataques baseados em água (mesmo que não seja água benta), quando mergulhado em água corrente, o vampiro perde 1 PV por turno.'
  },
  { 
    name: 'Zumbi', 
    cost: 0, 
    group: 'Mortos-Vivos', 
    description: 'Resistência +1, Inculto, Monstruoso',
    fullDescription: 'São considerados mortos-vivos "fracos" — embora alguns venham a conquistar grande poder pessoal, muitas vezes liderando sua própria horda. Eles podem ser invocados por magos ou sacerdotes, mas também costumam ocorrer por outros motivos; cemitérios amaldiçoados, acidentes com produtos químicos, drogas desenvolvidas por indústrias corruptas... • Dependência. Zumbis podem parecer criaturas estúpidas e sem mente, mas isso nem sempre é verdade. Eles apenas se comportam como tal porque precisam satisfazer um apetite desesperado por carne humana: um zumbi precisa devorar um órgão humano vivo e fresco (um cérebro, um coração...) todos os dias, ou ficará cada vez mais fraco até se desfazer por completo. • Lentidão. Zumbis sofrem redutor de H–2 em testes para ganhar a iniciativa e esquivar. Aqueles com Aceleração não sofrem essas restrições, mas também não recebem os benefícios normais da vantagem. • Inculto. A maioria dos zumbis consegue apenas gemer de forma fantasmagórica. Zumbis capazes de falar devem recomprar esta desvantagem. • Monstruoso. Por seu cheiro forte e aparência decrépita, zumbis não podem se fazer passar por seres humanos, exceto à distância. Alguns têm aspecto mais ou menos normal, ou podem gerar um disfarce ilusório (recomprando esta desvantagem).'
  }
]
