/**
 * Lista de magias do 3DT Alpha
 * Extraídas do Manual 3D&T Alpha
 */

/**
 * Função para gerar resumo automático baseado nas informações da magia
 * Extrai informações chave como custo, dano, escola e alcance
 */
function generateSpellSummary(spell) {
  if (!spell) return ''
  
  const summaryParts = []
  
  // Adicionar escola
  if (spell.school) {
    summaryParts.push(spell.school)
  }
  
  // Adicionar custo
  if (spell.cost) {
    summaryParts.push(spell.cost)
  }
  
  // Adicionar dano se houver
  if (spell.damage) {
    summaryParts.push(spell.damage)
  }
  
  // Adicionar alcance se relevante
  if (spell.range && (spell.range === 'longo' || spell.range === 'visão')) {
    summaryParts.push(`alcance ${spell.range}`)
  }
  
  return summaryParts.join(', ')
}

export const spells = [
  {
    name: 'Acordar',
    school: 'Elemental (espírito)',
    cost: '1 ou 5 PMs por criatura',
    range: 'longo',
    duration: 'instantânea',
    summary: 'Elemental (espírito), 1 ou 5 PMs por criatura',
    description: 'Esta magia serve para acordar criaturas adormecidas, incluindo aquelas que não possam ser despertadas por meios normais, como vítimas da magia Sono. Esta utilização consome 1 Ponto de Magia por criatura. Despertar uma vítima da magia Coma consome 5 PMs.'
  },
  {
    name: 'Ao Alcance da Mão',
    school: 'Elemental (água ou terra) ou Negra',
    cost: '2 PMs',
    range: 'pessoal',
    duration: 'sustentável',
    summary: 'Elemental (água ou terra) ou Negra, 2 PMs',
    description: 'Esta magia reproduz exatamente o efeito de Membros Elásticos (na verdade, um personagem que possua esta vantagem nunca vai precisar da magia). Com ela o mago pode projetar mãos mágicas feitas de água, pedra ou sombra, que aumentam sua distância de combate corpo-a-corpo. Além da óbvia utilidade para ataques à distância, esta magia também é excelente para lançar outras magias que funcionam apenas ao toque.'
  },
  {
    name: 'O Amor Incontestável de Raviollius',
    school: 'Branca ou Elemental (espírito)',
    cost: '2 PMs',
    range: 'longo',
    duration: 'sustentável',
    summary: 'Branca ou Elemental (espírito), 2 PMs, alcance longo',
    description: 'Apesar de seu grande poder, Raviollius era um mago pacífico. Devotado ao estudo de magias não violentas, capazes de incapacitar seus inimigos sem ferir ou matar — mas quase sempre de forma humilhante! Assim, seu nome costuma figurar no título de muitas magias não letais. O Amor Incontestável foi a primeira magia criada por Raviollius. Qualquer criatura atingida por ela deve fazer um teste de Resistência; se falhar, vai se apaixonar perdidamente pela primeira criatura em que colocar os olhos! Uma vítima nesse estado não pode fazer qualquer ataque contra a pessoa amada, e nem permitir que seja atacada (como se tivesse um Código de Honra). Contudo, se receber qualquer ataque (mesmo que não sofra dano), a magia será cancelada. O mestre pode aplicar modificadores no teste de Resistência, de acordo com a situação (+1 para um inimigo; –1 para um amigo ou colega; –2 para alguém que já era um interesse romântico da vítima). Mortos-Vivos e personagens com alguma Devoção ou Protegido Indefeso são imunes a esta magia. Em animais assexuados ou certas criaturas pouco inteligentes, o efeito pode ser diferente: a vítima considera a criatura amada como sendo sua mãe!'
  },
  {
    name: 'Anfíbio',
    school: 'Elemental (ar ou água)',
    cost: '1 PM por criatura',
    range: 'curto',
    duration: 'sustentável',
    summary: 'Elemental (ar ou água), 1 PM por criatura',
    description: 'Esta magia permite a uma criatura se mover e respirar livremente na água doce ou salgada (mas não outros líquidos). Ela não precisa de perícias para nadar e pode se mover na água com a mesma velocidade que teria em terra (normalmente, sem esta magia, um personagem na água se move com metade da velocidade normal). Lançada sobre uma criatura aquática, a magia tem efeito contrário, permitindo que ela possa respirar em terra.'
  },
  {
    name: 'A Aporrinhação de Nimb',
    school: 'Elemental (ar)',
    cost: '1 PM por turno',
    range: 'curto',
    duration: 'sustentável',
    summary: 'Elemental (ar), 1 PM por turno, FA=1d',
    damage: 'FA=1d',
    description: 'Esta magia é certamente hostil, mas mais chata que perigosa. Ela cria à volta do alvo um pequeno enxame, formado por criaturas ou objetos que a vítima enxerga como as coisas mais irritantes possíveis — se a vítima odeia insetos, serão insetos; se odeia azeitona, serão azeitonas voadoras; se odeia uma pessoa específica, serão versões em miniatura dessa pessoa, e assim por diante. O enxame ataca uma vez por turno com FA=1d. Além de uma eficiente distração, esta é também uma forma divertida de conhecer as aversões de alguém.'
  },
  {
    name: 'O Apavorante Gás de Luigi',
    school: 'Elemental (ar)',
    cost: '1 PM por criatura',
    range: 'curto',
    duration: '1d minutos',
    summary: 'Elemental (ar), 1 PM por criatura',
    description: 'Criada por Luigi Sortudo, o famoso bardo pessoal do Rei de Valkaria, esta magia fraca e inofensiva serve apenas para trazer risos e embaraços. O alvo tem direito a um teste de Resistência. Se falhar... bem, começa a emitir sonora flatulência pelos minutos seguintes. Isso não provoca nenhum dano ou penalidade, só constrangimentos!'
  },
  {
    name: 'Arma de Allihanna',
    school: 'Elemental (água ou terra)',
    cost: 'até 5 PMs por turno',
    range: 'pessoal',
    duration: 'sustentável',
    summary: 'Elemental (água ou terra), até 5 PMs por turno, F ou PdF igual aos PMs',
    damage: 'F ou PdF igual aos PMs gastos (máx. 5)',
    description: 'Muito comum entre druidas, esta magia faz brotar do chão uma arma qualquer, à escolha do conjurador (espada, machado, lança, arco e flecha...), feita de madeira, cipó e espinhos muito afiados. Ela é considerada mágica, e ataca com Força ou PdF (à escolha do conjurador) igual aos PMs gastos, até o limite de F5 ou PdF5. Por exemplo, um conjurador pode gastar 3 PMs e invocar uma arma que oferece Força 3 ou PdF 3. O bônus não é cumulativo com a própria Força ou PdF naturais do conjurador. Então, se você tem F2 e gasta 3 PMs para uma Arma de Allihanna, sua Força final é 3 (e não 5). Você pode voluntariamente criar uma arma com Força igual ou inferior à sua (o dano é menor, mas agora será uma arma mágica). A Arma de Allihanna é mais difícil de ser invocada em lugares estéreis, sem vegetação: em terrenos rochosos, secos, urbanos ou amaldiçoados (como casas e cemitérios mal-assombrados), o custo em PMs é dobrado. Caso seja transportada para esse tipo de terreno, a arma ainda conserva seu dano normal, mas não será mais mágica.'
  },
  {
    name: 'Armadura de Allihanna',
    school: 'Elemental (água ou terra)',
    cost: 'até 5 PMs por turno',
    range: 'pessoal',
    duration: 'sustentável',
    summary: 'Elemental (água ou terra), até 5 PMs por turno, A igual aos PMs',
    description: 'Também comum entre druidas, esta magia permite fazer brotar do chão uma armadura de madeira e cipó, que se enrosca no corpo do mago. Ela fornece um bônus de Armadura igual aos PMs gastos, até o limite de A5. Por exemplo, um conjurador pode gastar 4 PMs e invocar uma armadura que oferece A4. O bônus não é cumulativo com a Armadura natural do conjurador. Então, se você tem A1 e gasta 4 PMs para uma Armadura de Allihanna, sua Armadura final é 4 (e não 5). Você pode voluntariamente criar uma armadura igual ou inferior à sua (a proteção é menor, mas será uma armadura mágica). Assim como a Arma de Allihanna, esta magia custa duas vezes mais PMs para ser lançada e mantida em lugares estéreis.'
  },
  {
    name: 'Armadura Elétrica',
    school: 'Elemental (ar)',
    cost: 'até 5 PMs por turno',
    range: 'pessoal',
    duration: 'sustentável',
    summary: 'Elemental (ar), até 5 PMs por turno, FA=A+1d+PMs',
    damage: 'FA=A+1d+PMs gastos',
    description: 'Esta magia reproduz o efeito de Toque de Energia, com dano elétrico. Graças a ela o mago pode transmitir pela pele uma carga elétrica com Força de Ataque igual à Armadura + 1d + o número de PMs gastos. Exemplo: um mago que escolheu gastar 4 PMs quando conjurou a magia pode atacar com FA=A+1d+4. Nenhuma Habilidade é incluída. A carga elétrica faz um ataque automático por turno em todas as criaturas à distância de combate corpo-a-corpo. Estas qualidades tornam a Armadura Elétrica ótima para se proteger contra um grande número de atacantes.'
  },
  {
    name: 'Armadura Extra',
    school: 'todas',
    cost: '1 a 3 PMs por turno',
    range: 'curto',
    duration: 'sustentável',
    summary: 'todas, 1 a 3 PMs por turno',
    description: 'Enquanto está ativa, esta magia reproduz em uma ou mais criaturas o efeito de um dos vários tipos da vantagem Armadura Extra. Se você lança Armadura Extra: Força sobre uma criatura, por exemplo, sua Armadura será dobrada contra qualquer ataque baseado em Força. Cada Armadura Extra corresponde a uma magia diferente. Então, se você conhece as palavras mágicas para Armadura Extra: Frio, este é o único tipo que poderá invocar até aprender os demais tipos. Além disso, esta magia também existe em versões diferentes para cada escola. Por exemplo, há uma Armadura Extra: Químico na Escola Branca, outra na Escola Negra, e uma terceira na Escola Elemental. Um conjurador de Magia Branca não pode lançar as outras duas versões, mesmo aprendendo suas palavras. Cada Armadura Extra tem seu próprio custo em PMs: Corte, Perfuração, Esmagamento: 1 PM por turno. Fogo, Frio, Elétrico, Químico, Sônico: 2 PMs por turno. Magia, Força, Poder de Fogo: 3 PMs por turno. Estes três tipos são considerados raros.'
  },
  {
    name: 'Armadura Espiritual',
    school: 'Elemental (espírito)',
    cost: '5 PMs',
    range: 'pessoal',
    duration: 'sustentável',
    summary: 'Elemental (espírito), 5 PMs',
    description: 'Esta magia protege totalmente a mente do mago contra efeitos espirituais: enquanto a Armadura Mental está ativa, ele não será afetado por nenhuma magia da escola Elemental (espírito). A vantagem Telepatia também não vai funcionar contra ele. Magos poderosos usam esta magia em conjunto com Permanência para ganhar imunidade total e constante contra ataques espirituais.'
  },
  {
    name: 'Arpão',
    school: 'Negra',
    cost: '15 PMs',
    range: 'longo',
    duration: 'instantânea',
    summary: 'Negra, 15 PMs, FA=H+6d',
    damage: 'FA=H+6d',
    description: 'Uma onda de choque na forma de um arpão é lançada em velocidade supersônica, em geral destruindo o alvo com FA=H+6d.'
  },
  {
    name: 'Asfixia',
    school: 'Elemental (ar) ou Negra',
    cost: '2 PMs',
    range: 'curto',
    duration: 'sustentável',
    summary: 'Elemental (ar) ou Negra, 2 PMs',
    description: 'Lançada contra uma criatura, esta magia exige um teste de Resistência; se falhar, a vítima não consegue mais respirar. Uma vítima de Asfixia pode prender a respiração durante Rx5 minutos, se estiver em repouso ou velocidade normal; ou um turno por ponto de Resistência se estiver em combate ou realizando grande esforço físico. Esgotado esse tempo, começa a perder 1 PV por turno. Esta magia não tem efeito contra criaturas que não precisam respirar, como construtos ou mortos-vivos.'
  },
  {
    name: 'Ataque Mágico*',
    school: 'todas',
    cost: '1 a 5 PMs',
    range: 'longo',
    duration: 'instantânea',
    summary: 'todas, 1 a 5 PMs, FA=H+1d+PMs',
    damage: 'FA=H+1d+PMs gastos',
    description: 'Esta é a forma mais simples e óbvia de provocar dano usando magia — todas as escolas, até mesmo a Magia Branca, podem causar dano. Você pode disparar chamas, jatos líquidos, vento cortante, meteoros, raios de luz, garras de escuridão... O tipo exato de ataque depende da imaginação do mago. A escola Elemental (terra), por exemplo, poderia atacar com uma chuva de meteoros, uma parede de pedra, um imenso monolito ou uma mão rochosa gigante. O efeito visual pode mudar, mas existe um limite: a magia sempre vai causar dano igual a 1 para cada PM gasto, até o limite de 5. Então, se você gasta 2 PMs, sua chuva de meteoros/parede/monolito/mão de pedra vai resultar em FA+2. Um Ataque Mágico funciona de maneira similar a um ataque normal; sua Força de Ataque é o resultado de sua Habilidade, + 1d, + o poder mágico. Você pode usar esta magia tanto para ataques corpo-a-corpo (como se fosse Força) quanto para ataques à distância (Poder de Fogo, mas respeitando o alcance máximo da magia). O dano deste ataque pode ser dividido entre alvos diferentes, até o limite de um alvo para cada PM gasto. Com 3 PMs você pode atacar até três alvos diferentes e causar H+1d+1 em cada um. O ataque é simultâneo, mas cada alvo exige uma rolagem separada. Alvos distantes têm direito a esquivas. Esta mágica é simples, conhecida por todos os magos iniciantes; numerosas outras magias permitem causar dano muito maior pelo mesmo custo em PMs.'
  },
  {
    name: 'Ataque Vibratório',
    school: 'Elemental (ar)',
    cost: '10 PMs',
    range: 'curto',
    duration: 'instantânea',
    summary: 'Elemental (ar), 10 PMs, FA=H+5d',
    damage: 'FA=H+5d',
    description: 'Emite ondas de vibrações através do alvo, destruindo-o. Funciona como um pequeno e concentrado terremoto, com FA=H+5d. Como o efeito da magia não se espalha, ela é considerada ótima para abrir buracos em tetos e paredes.'
  },
  {
    name: 'Ataque Vorpal',
    school: 'Branca ou Elemental (ar)',
    cost: '1 PM por turno',
    range: 'curto',
    duration: 'sustentável',
    summary: 'Branca ou Elemental (ar), 1 PM por turno',
    description: 'O efeito desta magia rara é semelhante a Aumento de Dano, mas não aumenta o dano propriamente dito. Em vez disso, transforma uma arma ou ataque comum em ataque vorpal — ou seja, capaz de decapitar o adversário e matá-lo com um só golpe! Sempre que um personagem sob efeito desta magia (o próprio mago ou outra pessoa) consegue um Acerto Crítico e vence a FD da vítima, esta deve imediatamente fazer um teste de Armadura: se falhar, terá a cabeça cortada. Veja mais detalhes sobre armas vorpal no capítulo "Objetos Mágicos".'
  },
  {
    name: 'Aumento de Dano',
    school: 'todas',
    cost: '1 a 5 PMs por turno',
    range: 'curto',
    duration: 'sustentável',
    summary: 'todas, 1 a 5 PMs por turno, aumenta dano em +PMs',
    description: 'Em vez de causar dano direto, esta magia pode ser usada para aumentar outra fonte de dano. Você pode, digamos, criar uma espada de chamas para aumentar o dano de sua Força (ou a Força de um colega). O aumento é igual aos PMs gastos, até um máximo de 5 PMs. Além disso, o dano passa a ser considerado mágico. Então, você pode gastar 2 PMs por turno e transformar em pedra os punhos de seu colega anão que tinha Força 3; ele agora terá F5. Mas se você gastar 5 PMs (o máximo possível), os punhos do anão terão uma fantástica F8.'
  },
  {
    name: 'Barreira Mística',
    school: 'Branca',
    cost: '1 a 5 PMs por turno',
    range: 'pessoal',
    duration: 'sustentável',
    summary: 'Branca, 1 a 5 PMs por turno, A+2 por PM contra magia',
    description: 'Cria uma barreira mágica do tamanho de um escudo, que oferece um bônus de Armadura igual a A+2 para cada PM gasto. No entanto, esta barreira funciona apenas contra ataques gerados por magia.'
  },
  {
    name: 'Barreira de Vento',
    school: 'Elemental (ar)',
    cost: '5 ou mais PMs por alvo por turno',
    range: 'curto',
    duration: 'sustentável',
    summary: 'Elemental (ar), 5+ PMs por alvo, FD+10',
    description: 'Esta poderosa e popular magia defensiva cria uma barreira de vento que fornece às criaturas afetadas um bônus de +10 na sua Força de Defesa. O custo em PMs é para cada criatura protegida pela barreira — com 5 PMs a magia afeta apenas o mago; aumente o custo em +5 PMs para cada criatura afetada além do próprio mago. Esta magia é eficaz quando conjurada por vários magos ao mesmo tempo, porque sua força defensiva aumenta muito (FD+10 para cada mago envolvido, além do primeiro). Alguns magos seriam capazes de proteger um grupo de um verdadeiro cataclisma. O único problema é que a concentração precisa ser mantida para manter o efeito, o que torna impossível lançar outras magias ou realizar quaisquer outras ações durante esse período.'
  },
  {
    name: 'Bola de Fogo',
    school: 'Elemental (fogo)',
    cost: '1 a 10 PMs',
    range: 'longo',
    duration: 'instantânea',
    summary: 'Elemental (fogo), 1 a 10 PMs, FA=H+1d+PMs, raio 5m',
    damage: 'FA=H+1d+PMs gastos',
    description: 'Uma bola de fogo surge entre as mãos do mago e pode ser lançada contra um alvo, explodindo e atingindo tudo e todos num raio de 5m com FA=H+1d+PMs gastos. Deve ser usada com cuidado, pois atinge uma grande área e pode provocar incêndios. É a magia ofensiva mais popular, e ser capaz de lançá-la é um dos pré-requisitos para ser considerado um mago pleno.'
  },
  {
    name: 'Bola de Lama',
    school: 'Elemental (terra)',
    cost: '1 PM',
    range: 'curto',
    duration: 'instantânea',
    summary: 'Elemental (terra), 1 PM, FA=1d, ignora Armadura',
    damage: 'FA=1d (por bola, quantidade = H)',
    description: 'Esta magia produz bolas de matéria barrenta e malcheirosa. Cada bola ataca com FA=1d e ignora a Armadura do alvo. Uma vítima que tenha sua FD vencida não sofre dano real, mas fica suja e fedorenta (é considerada Monstruosa) durante uma hora, ou até se limpar. A magia produz bolas em quantidade igual à Habilidade do conjurador (ou menos, à sua escolha). Por esse motivo, um mago pode invocar as Bolas de Lama apenas para demonstrar uma alta habilidade. As bolas podem ser dirigidas contra alvos diferentes, ou contra um mesmo alvo para somar uma FA maior (três bolas atacam juntas com FA=3d, por exemplo).'
  },
  {
    name: 'Bola de Vento',
    school: 'Elemental (ar)',
    cost: '8 PMs',
    range: 'longo',
    duration: 'instantânea',
    summary: 'Elemental (ar), 8 PMs, FA=H+4d',
    damage: 'FA=H+4d',
    description: 'Cria um vento poderoso, atirando contra o alvo uma carga de ar sob pressão que ataca com FA=H+4d. Além disso, todas as vítimas a até 6m do ponto de impacto (incluindo o próprio mago, caso esteja ao alcance) devem ter sucesso em um teste de Força, ou são lançadas longe (a uma distância igual à FA final, em metros) e sofrem mais 1d de dano pela queda. Por isso seu uso — especialmente na presença de aliados — exige precaução.'
  },
  {
    name: 'Bolas Explosivas',
    school: 'Elemental (fogo)',
    cost: '1 PM',
    range: 'curto',
    duration: 'instantânea',
    summary: 'Elemental (fogo), 1 PM, FA=1d+2',
    damage: 'FA=1d+2',
    description: 'A magia cria, à volta de uma criatura, numerosas bolas de luz que explodem espalhando chamas. As Bolas Explosivas são visualmente impressionantes, mas o dano real é pequeno (FA=1d+2). Mesmo quando atingem em cheio, as chamas causam apenas pequenas queimaduras. Útil apenas para assustar seres pouco inteligentes, ou desviar a atenção dos inimigos.'
  },
  {
    name: 'Bomba Aérea',
    school: 'Elemental (ar)',
    cost: '1 a 10 PMs',
    range: 'longo',
    duration: 'instantânea',
    summary: 'Elemental (ar), 1 a 10 PMs, FA=H+1d+PMs ou FD=H+A+1d+PMs',
    damage: 'FA=H+1d+PMs gastos ou FD=H+A+1d+PMs gastos',
    description: 'Cria uma bola de ar compacta que explode no lugar desejado. Ela permite atacar um alvo com FA=H+1d+PMs gastos, ou defender-se de um ataque realizado até o seu próximo turno com FD=H+A+1d+PMs gastos. Esta magia na verdade causa pouco dano e foi criada como proteção para desviar coisas como flechas e magias ofensivas. No entanto, é considerada ótima para principiantes.'
  },
  {
    name: 'Bomba de Luz',
    school: 'Elemental (fogo)',
    cost: '1 a 5 PMs',
    range: 'longo',
    duration: 'instantânea',
    summary: 'Elemental (fogo), 1 a 5 PMs, FA=H+PMs, raio 3m',
    damage: 'FA=H+PMs gastos',
    description: 'Esta magia cria uma explosão de luz que ataca todas as criaturas num raio de 3m com FA=H+PMs gastos. A luz não afeta objetos inanimados, tornando a magia perfeita para abater inimigos sem destruir seus pertences ou causar danos à volta.'
  },
  {
    name: 'Bomba de Terra',
    school: 'Elemental (terra)',
    cost: '10 PMs',
    range: 'longo',
    duration: 'instantânea',
    summary: 'Elemental (terra), 10 PMs, FA=H+15',
    damage: 'FA=H+15',
    description: 'Esta magia faz explodir um trecho de rocha, terra ou areia sob o alvo, gerando uma onda de choque concentrada (FA=H+15). Só pode ser usada em solo natural.'
  },
  {
    name: 'Bomba de Vento',
    school: 'Elemental (ar)',
    cost: '1 a 10 PMs',
    range: 'longo',
    duration: 'instantânea',
    summary: 'Elemental (ar), 1 a 10 PMs, empurra com Força igual aos PMs',
    description: 'Ao lançar esta magia, o mago primeiro aumenta a pressão do ar na área e então a libera. O vento resultante sopra para longe qualquer coisa à frente do mago, e mesmo uma grande árvore pode não resistir. A magia não causa dano direto, mas empurra com Força igual aos PMs gastos. Criaturas a até 50m do mago devem ser bem-sucedidas em um teste de Força. Em caso de falha, são arremessadas a uma distância igual ao número de PMs gastos, em metros. Também sofrem 1d de dano.'
  },
  {
    name: 'Brilho de Espírito',
    school: 'Elemental (espírito)',
    cost: '10 PMs',
    range: 'longo',
    duration: 'instantânea',
    summary: 'Elemental (espírito), 10 PMs, FA=H+3d, também drena PMs',
    damage: 'FA=H+3d',
    description: 'Esta magia lança uma onda de luz azul contra um alvo, com FA=H+3d. Quando causa dano, além de perder Pontos de Vida, a vítima também perde Pontos de Magia na mesma quantidade.'
  },
  {
    name: 'Brilho Explosivo',
    school: 'Elemental (fogo)',
    cost: '25 PMs',
    range: 'longo',
    duration: 'instantânea',
    summary: 'Elemental (fogo), 25 PMs, FA=10d, ignora Armadura',
    damage: 'FA=10d',
    description: 'Uma das mais poderosas magias de fogo, Brilho Explosivo cria uma bola de luz próxima ao alvo que explode em chamas azuis e brancas, atacando com FA=10d e ignorando qualquer Armadura.'
  },
  {
    name: 'Buraco Negro',
    school: 'Negra',
    cost: '60 PMs',
    range: 'veja adiante',
    duration: '3 turnos',
    requirements: 'Clericato',
    summary: 'Negra, 60 PMs, Exigência: Clericato',
    description: 'Felizmente, poucos conjuradores no mundo têm poder para invocar esta terrível magia. Diz a lenda que ela foi criada por Vlannytic, um antigo sumo-sacerdote de Tenebra, que encontrou a morte invocando a fúria de sua deusa. Quando lançada em certo ponto, esta magia cria um vácuo poderoso capaz de sugar tudo e todos que estejam nas proximidades (incluindo o próprio mago!). Todas as criaturas a até 90m devem fazer um teste de F ou serem puxadas 30m para perto do buraco negro. Alguém que já esteja a 30m ou menos e falhe no teste é sugado para sempre. O teste sofre uma penalidade de –3 se a criatura estiver dentro de 30m, –2 se estiver dentro de 60m, ou –1 dentro de 90m. Para objetos, faça um teste de Armadura com as mesmas penalidades. O buraco negro dura três turnos. Não se conhece o destino das coisas e criaturas sugadas pelo Buraco Negro, uma vez que elas jamais retornam. Uns poucos estudiosos sugerem que as vítimas podem ser enviadas para outros mundos. Na verdade, os clérigos de Tenebra acreditam que esta magia abre um portal para o lugar onde vive sua deusa, e sonham um dia poder realizar essa viagem...'
  },
  {
    name: 'Cajado em Cobra',
    school: 'Elemental (terra) ou Negra',
    cost: '2 PMs',
    range: 'curto',
    duration: 'sustentável',
    summary: 'Elemental (terra) ou Negra, 2 PMs',
    description: 'Esta mágica transforma um cajado, vara, galho de árvore ou outro objeto semelhante de madeira em uma cobra venenosa, totalmente sob seu controle. A cobra tem F0, H3, R1, A0, PdF0; se acertar um ataque ela não causa dano imediato, mas a vítima deve ter sucesso em um teste de Resistência ou será envenenada. Uma vítima envenenada sofre uma penalidade de –1 em todas as suas características e começa a perder 1 PV por turno até a morte, ou até ser curada. O veneno pode ser detido com um teste bem-sucedido de Medicina (Habilidade +1) ou qualquer magia de cura (mas usada deste modo a magia não restaura PVs; apenas impede que o veneno continue agindo).'
  },
  {
    name: 'Cancelamento de Magia*',
    school: 'todas',
    cost: 'duas vezes o custo original',
    range: 'curto',
    duration: 'permanente',
    summary: 'todas, custo = 2x custo da magia original',
    description: 'Qualquer praticante de magia pode tentar cancelar uma mágica ou efeito realizado por outro mago (até mesmo aqueles mantidos através de Permanência). O custo em PMs para dissipar uma magia é igual ao dobro do custo original para lançá-la. Claro que, na maioria dos casos, um mago não tem condições de saber o custo exato do autor da magia; é uma questão de arriscar. Mesmo que o Cancelamento falhe, o mago que tentou fazê-lo perderá seus PMs. Não é necessário que ambos os magos (o autor e o "cancelador") pertençam à mesma escola. Uma Magia Negra pode ser cancelada por um conjurador de Magia Branca, Magia Elemental (qualquer) ou Magia Negra. Não podem ser canceladas magias de duração permanente. Mas existem certas magias, como Cegueira, que são permanentes até serem canceladas; nestes casos o Cancelamento vai funcionar.'
  },
  {
    name: 'Cancelamento Superior',
    school: 'Branca',
    cost: 'o custo original',
    range: 'curto',
    duration: 'permanente',
    summary: 'Branca, custo = custo da magia original',
    description: 'A escola de Magia Branca tem uma forma mais eficaz de Cancelamento de Magia, com consumo de energia mais baixo: o cancelador precisa gastar a mesma quantidade de PMs usada para lançar a magia original (em vez de o dobro).'
  },
  {
    name: 'O Canto da Sereia',
    school: 'Elemental (espírito)',
    cost: '2 PMs por criatura',
    range: 'longo',
    duration: 'sustentável',
    summary: 'Elemental (espírito), 2 PMs por criatura, dominação mental',
    description: 'O Canto da Sereia é a mais simples e conhecida magia de dominação mental/emocional. Ela afeta criaturas a até 50m e que estejam vendo ou ouvindo o mago. A vítima tem direito a um teste de Resistência +1 para negar o efeito: se falhar, enquanto durar a magia, ela passa a aceitar quase tudo que o mago diz como "sugestões bastante razoáveis". Há limites para a influência que o controlador tem sobre a vítima. Ela nunca pode ser convencida a fazer algo que acredite poder resultar em dano para si mesma, ou para pessoas com quem se importe; e nem nada que vá contra seus Códigos de Honra, Devoção, Protegido Indefeso — enfim, qualquer coisa que envolva alguma grande crença ou objetivo. Caso a vítima sofra qualquer ataque ou dano, a magia é imediatamente cancelada. Qualquer personagem com a perícia Manipulação pode lançar esta magia pelo custo normal em PMs, mesmo sem uma vantagem mágica.'
  },
  {
    name: 'Cegueira',
    school: 'Branca ou Negra',
    cost: '3 PMs',
    range: 'longo',
    duration: 'permanente até cancelada',
    summary: 'Branca ou Negra, 3 PMs',
    description: 'Lançada diretamente contra os olhos de uma criatura, esta magia pode ofuscar (com luz) ou obscurecer (com trevas) sua visão. O mago não precisa fazer nenhum teste para acertar, mas a vítima tem direito a um teste de Resistência para ignorar o efeito. Se falhar, ficará cega até que a magia seja cancelada. Uma criatura cega sofre uma penalidade de H–1 para fazer ataques corporais, e H–3 para ataques à distância e esquivas (personagens com Audição Aguçada ou Radar sofrem apenas H–1 para ataques à distância e esquivas). Nenhum remédio ou método de cura mundano pode curar esta cegueira, e nem magias de cura normais. As únicas magias capazes de devolver a visão são Cancelamento de Magia, Cura Total, Cura de Maldição, Desejo ou a própria Cegueira (lançada através da escola oposta: Branca para curar trevas, ou Negra para curar luz). Criaturas com Infravisão, Ver o Invisível, Visão Aguçada e Visão de Raio X (todos da vantagem Sentidos Especiais) também serão afetadas pela Cegueira. Contudo, certas criaturas que não dependem da visão — como morcegos, golfinhos, toupeiras ou personagens com Radar — são imunes a esta magia.'
  },
  {
    name: 'Chuva Congelante',
    school: 'Elemental (água)',
    cost: '10 PMs ou mais',
    range: 'pessoal',
    duration: 'permanente até cancelada',
    summary: 'Elemental (água), 10+ PMs, FA=3d por turno',
    damage: 'FA=3d por turno',
    description: 'Esta magia poderosa nunca foi totalmente aperfeiçoada. Uma vez conjurada, cria acima do mago uma esfera flutuante de gelo, que faz chover pequenas farpas de gelo na área abaixo (um círculo com 10m de diâmetro para cada 10 PMs gastos). Todos na área afetada (incluindo o mago!) sofrem um ataque por turno com FA=3d. O efeito é permanente e o mago não tem controle sobre o fenômeno. A esfera de gelo pode ser neutralizada apenas com Cancelamento de Magia, ou com uma magia de fogo que use no mínimo 10 PMs.'
  },
  {
    name: 'Chuva Quente',
    school: 'Elemental (água ou fogo)',
    cost: '0',
    range: 'pessoal',
    duration: 'sustentável',
    summary: 'Elemental (água ou fogo), 0 PMs',
    description: 'Os habitantes de Malpetrim atribuem a criação desta magia a sua mais ilustre habitante — Niele, a maga elfa mais famosa, poderosa e desejada de Arton. Tudo que ela faz é criar uma pequena e confortável chuva de água quente, ótima para tomar banho e curar resfriados. A Chuva Quente pode ser invocada apenas em aposentos fechados, e mantida enquanto o mago continua entoando as palavras mágicas de ativação. Essas palavras se parecem muito com certas cantigas élficas infantis. Por alguma razão, a água criada pela Chuva Quente não serve para matar a sede ou apagar chamas.'
  },
  {
    name: 'Coma',
    school: 'Negra',
    cost: '20 PMs',
    range: 'toque',
    duration: 'permanente até cancelada',
    summary: 'Negra, 20 PMs',
    description: 'Poucos magos necromantes conhecem esta raríssima magia, e menos ainda podem usá-la. Caso consiga tocar a vítima, esta deve fazer um teste de Resistência –1. Se falhar, seus Pontos de Vida caem imediatamente para zero e ela tomba inconsciente, ainda viva, mas em estado de congelamento. Sob efeito do Coma a vítima não envelhece, e após um ano nesse estado a maioria das doenças, venenos ou maldições deixa de funcionar. Por esse motivo um mago pode usar o Coma sobre si mesmo como medida de emergência, para preservar sua vida. Dizem que vários necromantes poderosos podem estar escondidos em coma, esperando por alguma pessoa ou evento que venha despertá-los. Uma vítima desta magia não pode ser despertada por meios mundanos, mesmo que receba dano. Apenas Acordar, Cancelamento ou Desejo podem interromper o Coma. Criaturas com Resistência superior à Habilidade do mago são imunes.'
  },
  {
    name: 'Comando de Khalmyr',
    school: 'Elemental (espírito)',
    cost: '4 PMs',
    range: 'curto',
    duration: 'instantânea',
    summary: 'Elemental (espírito), 4 PMs',
    description: 'Você pronuncia uma palavra de comando para o alvo, que ele tentará obedecer da melhor maneira possível. Você pode escolher uma das seguintes opções: "Venha": a vítima tenta alcançar o mago em velocidade máxima durante um turno, sem realizar nenhuma outra ação. "Solte": a vítima larga o que estiver segurando. "Caia": o alvo imediatamente cai no chão, permanecendo deitado por 1 rodada. Ele pode agir normalmente enquanto está caído, mas sofre as penalidades adequadas. Este comando também é conhecido como "Senta, Inuyasha!" "Fuja": a vítima tenta fugir do mago em velocidade máxima durante um turno, sem realizar nenhuma outra ação. "Pare": a vítima fica parada durante um turno. Não pode realizar qualquer outra ação, mas não é considerada indefesa. A vítima tem direito a um teste de Resistência –1 para evitar o efeito. Caso o alvo não possa cumprir o comando em menos de um turno, a magia falha automaticamente.'
  },
  {
    name: 'Consertar',
    school: 'Elemental (terra)',
    cost: '1 PM ou mais',
    range: 'toque',
    duration: 'permanente',
    summary: 'Elemental (terra), 1+ PMs',
    description: 'Esta magia repara pequenas rachaduras em objetos (mas não desentorta objetos). Em objetos metálicos, ela soldará o elo de uma corrente, um colar, ou uma faca, desde que apenas uma rachadura exista. Objetos de madeira ou cerâmica com diversas rachaduras podem ser colados de forma que pareçam novos, como se nunca tivessem quebrados. Um buraco em uma mochila ou uma roupa é completamente reparado com Consertar. Consertar também pode curar construtos: 1 Ponto de Vida por PM gasto.'
  },
  {
    name: 'Contra-Ataque Mental',
    school: 'Elemental (espírito)',
    cost: '10 PMs',
    range: 'pessoal',
    duration: 'sustentável',
    summary: 'Elemental (espírito), 10 PMs',
    damage: '1d (contra-ataque automático)',
    description: 'Uma versão mais poderosa e perigosa de Armadura Espiritual, esta rara magia não apenas bloqueia a mente do mago contra efeitos telepáticos, mas também envia um golpe mental como contra-ataque automático. Quando uma criatura tenta usar magia Elemental (espírito) contra um alvo com Contra-Ataque Mental ativado, o atacante deve imediatamente fazer um teste de Resistência. Falha resulta em 1d pontos de dano, que ignoram totalmente a Força de Defesa do atacante. Caso os PVs do atacante cheguem a zero devido a esse contra-golpe, ele entra em Coma (veja a magia de mesmo nome). Por algum motivo, sempre que alguém tenta usar um poder telepático contra um anão de Arton para descobrir onde fica seu reino secreto (Doherimm, a Montanha de Ferro), o anão manifesta um efeito idêntico a esta magia. Por isso ninguém se atreve a usar leitura mental em anões para obter informações sobre Doherimm.'
  },
  {
    name: 'Detecção de Magia*',
    school: 'todas',
    cost: '1 PM',
    range: 'longo',
    duration: 'sustentável',
    summary: 'todas, 1 PM',
    description: 'Esta magia básica permite ao conjurador ver um brilho luminoso suave emitido por qualquer objeto, criatura ou lugar que esteja sob efeito de magia. Não funciona contra seres sobrenaturais (mortos-vivos, magos, dragões...), mas funcionará em qualquer criatura que esteja, no momento, sob efeito de uma magia — como uma pessoa dominada mentalmente, um mago protegido por um escudo invisível, ou uma criatura sob efeito de uma magia de Invisibilidade (mas não criaturas que tenham invisibilidade como uma habilidade natural). Ilusões mágicas também podem ser detectadas por esse método.'
  },
  {
    name: 'Detecção do Mal',
    school: 'Branca',
    cost: '1 PM',
    range: 'pessoal',
    duration: 'sustentável',
    summary: 'Branca, 1 PM',
    description: 'Esta magia permite ao mago sentir a presença do mal (criaturas inteligentes que tenham intenção, declarada ou não, de causar-lhe qualquer dano ou prejuízo) a até 10m. A informação revelada depende do tempo empregado para analisar uma área ou criatura. 1ª Turno: presença ou ausência de maldade. 2ª Turno: quantidade de auras malignas na área, e a intensidade da aura maligna mais poderosa (normalmente a criatura maligna com maior pontuação). 3ª Turno: a intensidade e a localização de cada aura. Se uma aura está fora da linha de visão do conjurador, ele descobre sua direção, mas não a localização exata. Animais, armadilhas, venenos e outros riscos potenciais não são malignos (embora sejam perigosos), e esta magia não é capaz de detectá-los. A cada turno, é possível tentar analisar uma nova área. A magia não atravessa barreiras que excedam 90cm de madeira ou terra, 30cm de pedra, 2,5cm de metal comum ou uma folha fina de chumbo.'
  },
  {
    name: 'Dominação Total',
    school: 'Branca, Elemental e Negra',
    cost: '40 PMs',
    range: 'curto',
    duration: 'permanente até cancelada',
    requirements: 'o conjurador deve ter todas as escolas',
    summary: 'Branca, Elemental e Negra, 40 PMs, todas as escolas necessárias',
    description: 'Esta é a mais poderosa magia de controle mental conhecida, e felizmente poucos em Arton têm poder suficiente para usá-la. A vítima deve fazer um difícil teste de Resistência –3. Se falhar, torna-se um escravo total do mago, incapaz de desobedecer qualquer ordem sua e capaz de sacrificar a própria vida em sua defesa. Tudo que a pessoa dominada era ou acreditava não importa mais — sejam Devoções, Protegidos Indefesos, Códigos de Honra ou qualquer outra coisa. Entre as aventuras cantadas pelos bardos, as mais desafiadoras envolvem resgatar um herói nobre ou uma pessoa inocente escravizada por Dominação Total, a serviço de algum vilão ou monstro (dragões vermelhos são conhecidos por fazer escravos com esta magia). O problema está em vencer essa pessoa sem matá-la, ou reunir poder suficiente para cancelar a magia.'
  },
  {
    name: 'Encontro Aleatório',
    school: 'Negra',
    cost: '4 PMs',
    range: '10km',
    duration: 'instantânea',
    summary: 'Negra, 4 PMs',
    description: 'Esta magia conjura um grupo de criaturas agressivas existentes na região (tipo à escolha do mestre), que imediatamente atacam o conjurador e seus aliados. As criaturas surgem em 1d minutos. Acredita-se que esta magia serve para atrair caça, ou treinar aventureiros em combate contra monstros — mas também pode ser útil para distrair inimigos em situações de emergência.'
  },
  {
    name: 'Enfraquecer Magia',
    school: 'Branca',
    cost: '10 PMs',
    range: 'pessoal',
    duration: 'sustentável',
    summary: 'Branca, 10 PMs, raio 10m',
    description: 'Um enorme círculo luminoso é traçado no chão, delimitando uma área circular com 10m de raio, centrada no mago. Conjurar qualquer magia nesta área, exceto Magia Branca, requer o dobro de Pontos de Magia.'
  },
  {
    name: 'Enxame de Trovões',
    school: 'Branca ou Elemental (ar)',
    cost: '4 PMs',
    range: 'longo',
    duration: 'instantânea',
    summary: 'Branca ou Elemental (ar), 4 PMs, FA=H+2d, ignora Armadura',
    damage: 'FA=H+2d',
    description: 'Com esta mágica o mago pode disparar pelas mãos um estrondo sônico, que ruma na direção do alvo como pequenas lâminas giratórias luminosas. Este ataque tem FA igual a H+2d e ignora totalmente a Armadura do alvo em sua Força de Defesa — a menos que tenha Armadura Extra contra magia: neste caso, sua Armadura é normal (não dobra).'
  },
  {
    name: 'A Erupção de Aleph',
    school: 'Elemental (fogo ou terra)',
    cost: '10 PMs',
    range: 'longo',
    duration: 'instantânea',
    summary: 'Elemental (fogo ou terra), 10 PMs, FA=1d+10',
    damage: 'FA=1d+10',
    description: 'A criação desta magia é atribuída a Aleph Olhos Vermelhos, mas alguns estudiosos contestam essa teoria; Aleph é conhecido como um mago irresponsável e incompetente, que por algum motivo caiu nas graças de Wynna — a Deusa da Magia — e recebeu dela grandes poderes. Ele supostamente não seria capaz de desenvolver uma magia própria. A Erupção de Aleph permite abrir um buraco no chão, abaixo do oponente, e atingi-lo com um jato de lava derretida com FA=1d+10. Essa lava mágica ignora a Armadura do alvo, a menos que ele tenha Armadura Extra contra Fogo ou Magia: neste caso sua Armadura é normal (não dobra).'
  },
  {
    name: 'A Escapatória de Valkaria',
    school: 'Branca ou Negra',
    cost: '1 PM para cada 4 criaturas',
    range: 'curto',
    duration: 'instantânea',
    summary: 'Branca ou Negra, 1 PM para cada 4 criaturas',
    description: 'Lançada no interior de uma masmorra ou ruína, esta magia transporta o conjurador e seus aliados de volta à entrada. A magia não serve para escapar de prisões e outros lugares trancados — ela funcionará apenas quando o caminho para a saída estiver desimpedido. A magia também não funcionará caso o conjurador não conheça o ponto de entrada (por exemplo, caso tenha sido trazido inconsciente). Esta magia afeta apenas criaturas voluntárias. Não se pode transportar um alvo contra sua vontade — não é preciso fazer teste de Resistência.'
  },
  {
    name: 'Esconjuro de Mortos-Vivos',
    school: 'Branca ou Elemental (espírito)',
    cost: '1 PM por morto-vivo',
    range: 'curto',
    duration: 'permanente',
    requirements: 'Clericato',
    summary: 'Branca ou Elemental (espírito), 1 PM por morto-vivo, Exigência: Clericato',
    description: 'A maioria dos clérigos tem poder para expulsar esqueletos, zumbis, múmias e outros mortos-vivos com esta magia. Quando o clérigo entoa suas preces, quaisquer mortos-vivos em seu campo de visão devem fazer um teste de Resistência: falhar significa que a criatura tenta fugir, e nunca mais volta a incomodar aquele clérigo. A magia não vai funcionar caso o clérigo não consiga enxergá-los, e vice-versa. Quanto maior a Habilidade do clérigo, mais chances ele tem de ser bem-sucedido. Caso a Resistência do morto-vivo seja menor que a Habilidade do clérigo, essa diferença será aplicada como redutor no teste de Resistência. Um esqueleto com R1, ao resistir a um clérigo com H3, deve fazer um teste de Resistência –2 (3–1). Caso essa diferença seja 4 ou mais, o morto-vivo não tem direito a nenhum teste — o esconjuro é automaticamente bem-sucedido. Qualquer morto-vivo cuja Resistência seja maior que a Habilidade do clérigo é imune a esta magia. Por exemplo, é inútil para um clérigo com H4 tentar esconjurar um vampiro com R5; ele não precisa fazer o teste de Resistência. Existem também certos mortos-vivos poderosos que nunca podem ser esconjurados.'
  },
  {
    name: 'Escuridão',
    school: 'Negra',
    cost: '2 PMs',
    range: 'curto',
    duration: 'permanente até cancelada',
    summary: 'Negra, 2 PMs, raio 6m',
    description: 'Esta magia faz um objeto tocado pelo mago irradiar escuridão em uma área de 6m de raio. Nem mesmo as criaturas com Visão Aguçada, Infravisão, Ver o Invisível ou Visão de Raio X conseguem ver qualquer coisa na área (mas Audição Aguçada, Faro Aguçado e Radar funcionam normalmente). Luzes normais (tochas, velas, lampiões...) também não funcionam na área de Escuridão. Quando a magia é conjurada sobre um pequeno objeto, este objeto pode ser guardado (em um bolso, por exemplo) para interromper a Escuridão, que voltará a funcionar caso o objeto seja revelado novamente.'
  },
  {
    name: 'Explosão',
    school: 'Elemental (todas) ou Negra',
    cost: '2 PMs para cada 1d de dano',
    range: 'longo',
    duration: 'instantânea',
    summary: 'Elemental (todas) ou Negra, 2 PMs por 1d, FA=H+1d por cada 2 PMs',
    damage: 'FA=H+1d por cada 2 PMs gastos (máx. H+5d)',
    description: 'O mago pode fazer um ataque devastador, semelhante ao Ataque Mágico, com a diferença de que explode no ponto de impacto em uma grande bola de fogo, explosão d\'água, estilhaços de rochas, estrondo sônico ou impacto de trevas — dependendo da escola. A explosão tem FA igual a H, +1d para cada 2 PMs gastos (no máximo 10 PMs para H+5d). O dano se reduz em 1d para cada 3m de distância do ponto de impacto. Alvos que consigam uma esquiva recebem +2 em sua Força de Defesa para evitar o dano. As vantagens desta magia são que não é possível se esquivar completamente da explosão, e ela pode apanhar muitos alvos ao mesmo tempo.'
  },
  {
    name: 'Fada Servil',
    school: 'Branca ou Elemental (espírito)',
    cost: '1 PM',
    range: 'longo',
    duration: 'sustentável',
    summary: 'Branca ou Elemental (espírito), 1 PM',
    description: 'Esta magia conjura uma pequena fada feita de luz esverdeada, um espírito da floresta, capaz de realizar pequenas tarefas para o mago. Tarefas rotineiras incluem apanhar lenha, colher frutos, pescar, alimentar um cavalo e assim por diante. A fada não é uma criatura viva verdadeira, não pode lutar, e nem resistir a qualquer dano ou efeito que exija um teste de Resistência — ela falhará automaticamente no teste e será dissipada. A fada também desaparece se deixar a área de efeito da magia.'
  },
  {
    name: 'Farejar Tesouro',
    school: 'Branca ou Elemental (espírito)',
    cost: '1 PM',
    range: 'veja adiante',
    duration: 'instantânea',
    summary: 'Branca ou Elemental (espírito), 1 PM',
    description: 'Esta magia detecta se existe algum tesouro escondido na área (uma masmorra ou cidade), sendo que "tesouro" é qualquer item ou porção de itens valiosos que não esteja sendo carregado por nenhuma criatura. A magia não aponta o aposento ou local específico onde está o tesouro, nem diz a direção, valor e outras informações sobre o tesouro; apenas sua presença.'
  },
  {
    name: 'Fascinação',
    school: 'Branca ou Elemental (espírito)',
    cost: '10 PMs',
    range: 'toque',
    duration: 'permanente até cancelada',
    summary: 'Branca ou Elemental (espírito), 10 PMs',
    description: 'Diz a lenda que esta magia foi criada por um artista frustrado, muito competente em mágica, mas incapaz de produzir uma verdadeira obra de arte. Lançada sobre uma pintura, escultura, traje ou outra peça artística, ela exige de qualquer observador um teste de Resistência +1. Se falhar, a vítima não consegue tirar os olhos do objeto, totalmente encantada com sua beleza. O transe pode ser interrompido facilmente: basta que a vítima receba qualquer dano ou apenas seja sacudida ("Ei, acorda!"). Mortos-vivos, construtos e seres com R3 ou mais são imunes. Embora pareça inofensiva, esta mágica pode ser perigosa. Caso não seja arrancada de seu transe, uma vítima pode observar o objeto de sua fascinação durante dias, sem comer, beber ou dormir, até morrer de inanição.'
  },
  {
    name: 'Feras de Tenebra',
    school: 'Negra',
    cost: '2 PMs por turno',
    range: 'longo',
    duration: 'sustentável',
    summary: 'Negra, 2 PMs por turno, 1d feras',
    description: 'Esta magia concedida pela Deusa das Trevas convoca 1d "feras negras", criaturas sombrias de nível baixo que vivem no Reino das Trevas. Estas feras têm F2, H2, R1, A1, PdF0. Quando causam dano, eliminam Pontos de Magia em vez de Pontos de Vida. Feras negras sofrem dano apenas por magias das escolas Branca, Elemental (espírito) ou Negra. Elas não podem ser feridas de nenhuma outra forma (mas ainda podem ser afetadas por magias que não causam dano).'
  },
  {
    name: 'Ferrões Venenosos',
    school: 'Elemental (água) ou Negra',
    cost: '3 PMs',
    range: 'curto',
    duration: 'instantânea',
    summary: 'Elemental (água) ou Negra, 3 PMs, FA=H+2d, veneno',
    damage: 'FA=H+2d',
    description: 'Com esta magia o usuário dispara pelos dedos uma pequena chuva de dardos, parecidos com espinhos de cacto. O mago faz um ataque com FA igual a H+2d. Se vencer a FD da vítima, esta deve fazer um teste de Resistência –1 para negar o efeito. Se falhar, será envenenada. Uma vítima envenenada sofre uma penalidade de –1 em todas as suas características e começa a perder 1 PV por turno até a morte, ou até ser curada. O veneno pode ser detido com um teste bem-sucedido de Medicina (H+1) ou qualquer magia de cura (usada deste modo a magia não restaura PVs; apenas impede que o veneno continue agindo).'
  },
  {
    name: 'Fios de Gelo',
    school: 'Elemental (água)',
    cost: '10 PMs',
    range: 'curto',
    duration: 'instantânea',
    summary: 'Elemental (água), 10 PMs',
    description: 'Quando o mago toca uma superfície (parede, chão...), fios de gelo correm rapidamente através do plano tocado. Todos aqueles em contato com essa superfície a até 10m do mago devem ser bem-sucedidos um teste de Resistência, ou transformam-se em estátuas de gelo durante 1d horas. É muito eficaz em corredores e outros lugares fechados.'
  },
  {
    name: 'Flecha de Vento',
    school: 'Elemental (ar)',
    cost: '0',
    range: 'curto',
    duration: 'instantânea',
    summary: 'Elemental (ar), 0 PMs, FA=2',
    damage: 'FA=2',
    description: 'Esta magia muito simples cria uma flecha de vento. Seu dano é pequeno (FA=2), quase nunca ferindo realmente o alvo — ou causando apenas uma leve cicatriz. Fraca demais para combate efetivo, é usada apenas para demonstrar hostilidade ou romper cordas e objetos similares.'
  },
  {
    name: 'A Flor Perene de Milady "A"',
    school: 'Branca ou Elemental (água)',
    cost: '0',
    range: 'curto',
    duration: 'permanente até cancelada',
    summary: 'Branca ou Elemental (água), 0 PMs',
    description: 'Inventada por uma antiga aluna da Academia Arcana (que preferiu se manter anônima para evitar problemas...), esta magia simples pode ser realizada por muitos magos iniciantes. Ela faz nascer um pequeno e inofensivo gerânio. Quando arrancado, uma nova flor nasce no local — e assim indefinidamente, sendo impossível removê-la por meios normais. Lançada contra uma criatura viva, ela terá direito a um teste de Resistência para negar o efeito; se falhar, terá uma linda florzinha nascendo em alguma parte do corpo... A única forma de remover a flor é com Cancelamento de Magia; por isso a Flor Perene costuma ser usada pelos magos para aborrecer os não-magos que zombam de seu poder. As flores arrancadas desaparecem momentos depois. Esta magia não pode de nenhuma forma ser usada para causar dano ou provocar qualquer penalidade.'
  },
  {
    name: 'Fome de Megalokk',
    school: 'Negra',
    cost: '15 PMs',
    range: 'curto',
    duration: 'instantânea',
    summary: 'Negra, 15 PMs, 1d cargas, FA=3d cada, ignora Armadura',
    damage: 'FA=3d por carga (1d cargas)',
    description: 'Esta perigosa magia dispara 1d cargas de energia mágica em formato de insetos que atingem quaisquer alvos escolhidos pelo mago, dentro do alcance. Criaturas e objetos tocados pelas cargas são desintegrados (cada carga ataca com FA=3d, que ignora Armadura).'
  },
  {
    name: 'Força Mágica*',
    school: 'todas',
    cost: '2 a 10 PMs',
    range: 'curto',
    duration: 'sustentável',
    summary: 'todas, 2 a 10 PMs, Força = PMs/2',
    description: 'Qualquer das escolas pode usar magia para realizar algum esforço físico. Você pode criar um braço de pedra, uma garra de fogo, um tentáculo de trevas ou qualquer outra forma capaz de levantar, empurrar, puxar, atacar ou causar dano. Não importa qual a forma dessa manifestação, sua Força será sempre igual à metade do número de Pontos de Magia gastos (até o limite de 10 PMs). Por tanto, 6 PMs criam um jato d\'água com Força 3 (capaz de levantar 2.000 quilos). Esta magia é própria para fazer esforço físico, não para atacar. Um ataque realizado com Força Mágica sempre tem FA=F+H0+1d, independente da Habilidade real do mago.'
  },
  {
    name: 'Fúria de Beluhga',
    school: 'Elemental (água)',
    cost: '30 PMs',
    range: 'longo',
    duration: 'instantânea',
    summary: 'Elemental (água), 30 PMs, FA=10d, raio 10m',
    damage: 'FA=10d',
    description: 'A mais poderosa e brutal magia do gelo de que se tem notícia. Uma bola de gelo surge entre as mãos do mago, e então é lançada contra uma criatura, explodindo tudo e todos a até 10m do ponto de impacto com FA=10d. Criaturas reduzidas a 0 PVs através desta magia morrem imediatamente, transformadas em estátuas de gelo (sem direito ao Teste de Morte).'
  },
  {
    name: 'Fúria Guerreira',
    school: 'Elemental (espírito)',
    cost: '2 PMs',
    range: 'curto',
    duration: 'sustentável',
    summary: 'Elemental (espírito), 2 PMs, H+1, F+1, PdF+1',
    description: 'Esta magia desperta na pessoa afetada uma fúria guerreira que a favorece em combate. Durante a fúria uma criatura luta melhor (H+1, F+1 e PdF+1), mas não pode pensar claramente, atacando o primeiro inimigo que vê pela frente. Além disso, um personagem em fúria jamais pode se esquivar, nem usar magia ou qualquer vantagem que gasta PMs. Esta magia pode ser lançada sobre um companheiro para melhorar suas habilidades, ou então contra um inimigo para impedi-lo de usar outros poderes que tenha. Criaturas que recebam a Fúria Guerreira contra a vontade têm direito a um teste de Resistência para negar o efeito. A Fúria só pode ser invocada em situações de combate. Embora seja uma magia sustentável, seu efeito cessa assim que a luta termina; a criatura que estava em Fúria fica esgotada, sofrendo uma penalidade de –1 em todas as suas características durante uma hora.'
  },
  {
    name: 'A Furtividade de Hyninn',
    school: 'Branca ou Negra',
    cost: '1 PM',
    range: 'toque',
    duration: 'sustentável',
    summary: 'Branca ou Negra, 1 PM, H+2 em Furtividade',
    description: 'Esta magia concede um bônus de H+2 em testes de Furtividade para o conjurador ou seu aliado, facilitando mover-se às escondidas. Além disso, caso o alvo não tenha a especialização Furtividade, mesmo assim ele pode realizar testes para Tarefas Difíceis.'
  },
  {
    name: 'A Gagueira de Raviollius',
    school: 'Branca ou Elemental (água ou ar)',
    cost: '2 PMs',
    range: 'curto',
    duration: 'sustentável',
    summary: 'Branca ou Elemental (água ou ar), 2 PMs',
    description: 'O alvo deve fazer um teste de Resistência; se falhar, será acometido por uma gagueira terrível. Mas, caso a vítima tenha sucesso, quem sofre o efeito é o próprio mago. A Gagueira de Raviollius impede o uso de qualquer perícia que envolva a voz (como Manipulação). Lançar magias também se torna muito difícil; para ser capaz de realizar uma magia enquanto estiver gago, antes é preciso ter sucesso em um teste de Habilidade. Se falhar, a magia não funciona (mas também não gastará PMs).'
  },
  {
    name: 'Garras de Atavus',
    school: 'Elemental (água ou terra)',
    cost: '5 PMs',
    range: 'curto',
    duration: 'sustentável',
    summary: 'Elemental (água ou terra), 5 PMs, Força+2, dano por corte',
    description: 'Lançada sobre uma criatura, esta magia faz crescer garras em suas mãos para causar dano maior. Enquanto durar o efeito, o alvo da magia recebe Força+2 e causa dano por corte.'
  },
  {
    name: 'Ilusão',
    school: 'todas',
    cost: '1 PM ou mais',
    range: 'longo',
    duration: 'sustentável',
    summary: 'todas, 1+ PMs',
    description: 'Esta magia permite criar imagens falsas, baseadas em coisas que o mago conhece bem. Se um mago tenta projetar uma imagem de algo que nunca viu, qualquer pessoa ou criatura tem direito a um teste de Resistência para evitar ser enganada. O mesmo vale para imagens que pareçam claramente absurdas ou fora de lugar. Imagens criadas através desta magia não têm cheiro e não emitem qualquer som (para isso existe Ilusão Avançada), e também não podem causar qualquer dano. Elas não têm solidez: qualquer objeto material pode atravessar uma ilusão. É possível criar ilusões pequenas e simples com 1 PM. Quanto maior o consumo de energia, maiores e mais sofisticadas elas se tornam: 1 PM: uma imagem do tamanho de um objeto pequeno e imóvel. 2 PMs: uma imagem pequena (e em movimento), ou com até 1m de diâmetro (imóvel). 3 PMs: imagem com até 1m de diâmetro (em movimento), ou do tamanho de um homem (imóvel). 4 PMs: do tamanho de um homem (em movimento), ou um cavalo (imóvel). 5 PMs: um cavalo (em movimento), ou elefante (imóvel). 6 PMs: elefante em movimento, ou dragão imóvel. 7 PMs: dragão em movimento, ou exército imóvel. 8 PMs: exército em movimento, ou aldeia imóvel. 9 PMs: aldeia em movimento, ou montanha imóvel. 10 PMs: uma montanha em movimento!'
  },
  {
    name: 'Ilusão Avançada',
    school: 'todas',
    cost: '2 PMs ou mais',
    range: 'longo',
    duration: 'sustentável',
    summary: 'todas, 2+ PMs (dobro de Ilusão)',
    description: 'Esta magia funciona exatamente como Ilusão, obedecendo aos mesmos limites de tamanho, mas produz sons e cheiros. Contudo, ela ainda não tem solidez, não pode causar dano, e consome duas vezes mais PMs (por exemplo, 4 PMs para uma imagem pequena em movimento ou até 1m imóvel).'
  },
  {
    name: 'Ilusão Total',
    school: 'todas',
    cost: '4 PMs ou mais',
    range: 'longo',
    duration: 'sustentável',
    summary: 'todas, 4+ PMs (4x Ilusão), sólida',
    damage: 'FA=PMs+1d (dano ilusório)',
    description: 'Esta é a mais eficiente magia de Ilusão, capaz de enganar completamente todos os sentidos — porque é uma imagem sólida. Apenas em casos muito especiais são permitidos testes de Resistência para perceber essa ilusão, a critério do mestre. Sentidos Especiais não fazem diferença. A única forma de perceber algo suspeito é por Detecção de Magia, e nem mesmo isso garante que se trata mesmo de uma ilusão! A Ilusão Total é tão perfeita que pode até mesmo causar dano, mas será "dano ilusório". Caso receba dano de uma ilusão, o personagem tem direito a um teste de Resistência; se tiver sucesso, ele percebe que nada sofreu. Se falhar, sofre dano normal (a FA de uma ilusão é sempre igual aos PMs usados para criá-la +1d). Uma criatura que tenha seus PVs reduzidos a zero por dano ilusório sofre o mesmo efeito de uma magia Desmaio. Quando acordar, perceberá não ter recebido nenhum ferimento real. Uma Ilusão Total consome quatro vezes mais PMs (por exemplo, 8 PMs para uma imagem pequena em movimento ou até 1m imóvel).'
  },
  {
    name: 'Imagem Turva',
    school: 'Branca ou Negra',
    cost: '3 PMs',
    range: 'curto',
    duration: 'sustentável',
    summary: 'Branca ou Negra, 3 PMs, inimigos sofrem H–1',
    description: 'Lançada sobre uma criatura, esta magia torna sua imagem difícil de enxergar. Ela não pode ser vista com nitidez, parecendo desfocada. Lutar com a criatura afetada será bem mais difícil: seus adversários sofrem uma penalidade de –1 em Habilidade para atacar e se defender. Personagens com Sentidos Especiais de qualquer tipo não podem ser enganados pela Imagem Turva, e lutam normalmente.'
  },
  {
    name: 'Impulso',
    school: 'Elemental (espírito)',
    cost: '2 PMs',
    range: 'curto',
    duration: 'sustentável',
    summary: 'Elemental (espírito), 2 PMs, +1 iniciativa, –1 A e R',
    description: 'Este feitiço enche uma pessoa de motivação, coragem e certa burrice. A vítima será capaz de coisas que em geral não ousaria — como declarar-se fervorosamente para uma pessoa amada, dizer poucas e boas para um superior, desafiar um adversário mais forte... enfim, jogar toda a prudência pela janela. A vítima tem direito a um teste de Resistência para evitar o efeito. Se falhar, enquanto durar a magia, a criatura afetada recebe +1 em testes de iniciativa (por sua recém-adquirida impetuosidade), mas sofre redutor de –1 em Armadura e testes de Resistência (por sua imprudência).'
  },
  {
    name: 'Inferno de Gelo',
    school: 'Branca ou Elemental (água)',
    cost: '5 PMs',
    range: 'curto',
    duration: 'instantânea',
    summary: 'Branca ou Elemental (água), 5 PMs, FA=H+2d, ignora Armadura',
    damage: 'FA=H+2d',
    description: 'A verdadeira origem desta magia é controversa. Alguns magos afirmam que seus primeiros usuários seriam bárbaros de uma tribo desconhecida, que se escondem nos pontos mais remotos das Montanhas Uivantes — mas histórias mais exageradas dizem que eles receberam esta magia de Beluhga, a Rainha dos Dragões Brancos. Esta mágica permite ao usuário disparar pelas mãos uma pequena salva de pontas de gelo, afiadas como facas e gélidas como uma nevasca. O mago ataca com FA igual a H+2d, e este ataque ignora totalmente a Armadura do alvo, que não entra em sua Força de Defesa. Como efeito extra, se receber qualquer dano, o alvo deve ainda fazer um teste de Resistência: se falhar ficará congelado e indefeso durante uma turno, incapaz de atacar, se esquivar ou usar magia.'
  },
  {
    name: 'Invisibilidade',
    school: 'todas',
    cost: '1 PM ou mais',
    range: 'curto',
    duration: 'sustentável',
    summary: 'todas, 1+ PMs',
    description: 'Esta magia permite tornar objetos e criaturas invisíveis. Coisas invisíveis ainda podem ser ouvidas, farejadas ou percebidas de outras formas. Ver o Invisível (de Sentidos Especiais) vence totalmente esta magia. Atacar uma criatura invisível impõe ao atacante uma penalidade de H–1. Uma criatura invisível não pode atacar ou lançar outras magias enquanto está nesse estado, ou a invisibilidade será cancelada. O mesmo acontece se ela, a qualquer momento, sofrer qualquer dano. Como na magia Ilusão, quanto maior o custo em PMs, maiores os objetos ou criaturas tornadas invisíveis: 1 PM: algo do tamanho de um objeto pequeno e imóvel. 2 PMs: algo pequeno (e em movimento), ou com até 1m de diâmetro (imóvel). 3 PMs: algo com até 1m de diâmetro (em movimento), ou do tamanho de um homem (imóvel). E assim por diante, como na magia Ilusão.'
  },
  {
    name: 'Invisibilidade Superior',
    school: 'todas',
    cost: '2 PMs ou mais',
    range: 'curto',
    duration: 'sustentável',
    summary: 'todas, 2+ PMs (dobro de Invisibilidade)',
    description: 'Similar à Invisibilidade normal, mas mais cara (custa duas vezes mais PMs) e bem mais eficiente. Esta versão não é cancelada quando o alvo ataca, lança outras magias ou sofre dano.'
  },
  {
    name: 'Luz',
    school: 'Branca ou Elemental (fogo)',
    cost: '1 PM',
    range: 'toque',
    duration: 'sustentável',
    summary: 'Branca ou Elemental (fogo), 1 PM, raio 6m',
    description: 'Esta magia faz um objeto tocado brilhar como uma tocha, iluminando uma área de 6m de raio (e mais 6m adicionais com uma luz fraca) a partir do ponto de origem. Essa distância é dobrada para personagens com Visão Aguçada. O efeito é imóvel, mas pode ser lançado sobre um objeto móvel — como um cajado carregado pelo mago. Uma Luz que entre em uma área de Escuridão mágica não funciona.'
  },
  {
    name: 'A Mágica Silenciosa de Talude',
    school: 'Elemental (ar)',
    cost: '1 PM',
    range: 'pessoal',
    duration: 'sustentável',
    summary: 'Elemental (ar), 1 PM',
    description: 'Os magos do ar dominam a magia de Silêncio, mas também sabem como vencê-la. Inventada pelo Mestre Máximo da Magia, esta mágica permite lançar magias sem emitir som. Sob efeito de Silêncio o mago continua incapaz de falar ou ouvir nada, mas pode lançar magias. O mesmo vale se estiver amordaçado, embaixo d\'água ou coisa assim. Esta magia é uma das poucas que podem ser lançadas em silêncio total, sem palavras (apenas gestos com as mãos; sem estes gestos, não se pode lançar a magia). Magos excepcionalmente paranoicos usam esta magia o tempo todo para evitar que suas palavras sejam ouvidas, ou seus lábios lidos — e suas magias descobertas.'
  },
  {
    name: 'Maldição das Trevas',
    school: 'Negra',
    cost: '5 a 15 PMs permanentes',
    range: 'visão',
    duration: 'permanente',
    summary: 'Negra, 5-15 PMs permanentes',
    description: 'Esta magia poderosa e terrível drena permanentemente PMs do conjurador, sendo por isso usada apenas em casos extremos. Invocada pelas criaturas mais maléficas, a magia impõe sobre a vítima uma Maldição escolhida pelo conjurador. O poder da Maldição depende do número de PMs sacrificados pelo conjurador: 5 PMs para uma Maldição ínfima (0 pontos). 10 PMs para uma Maldição suave (–1 pontos). 15 PMs para uma Maldição grave (–2 pontos). A vítima não tem direito a um teste de Resistência. Além de Maldições, o conjurador também pode infligir sobre a vítima qualquer desvantagem de mesma pontuação, à sua escolha. A Maldição pode ser removida de maneiras normais (como Cura de Maldição) ou cancelada pelo próprio conjurador livremente, quando ele desejar, mas sem que ele recupere seus PMs perdidos. Matar o conjurador não remove a Maldição.'
  },
  {
    name: 'Pânico',
    school: 'Negra',
    cost: '2 PMs por criatura',
    range: 'longo',
    duration: 'sustentável',
    summary: 'Negra, 2 PMs por criatura',
    description: 'Alvos desta magia devem fazer um teste de Resistência. Quem falha, fica apavorado e tenta fugir do mago de qualquer maneira, o mais rápido que puder. Uma vítima em pânico não pode usar qualquer manobra, vantagem ou magia que consuma PMs — exceto aquelas que ajudem em sua fuga, como esquivas, Aceleração, Transporte, Teleporte... O Pânico vai durar até que a magia termine ou até que a vítima saia do alcance da magia (o que pode ser difícil, se o mago começar uma perseguição...). Personagens ou criaturas que por algum motivo sejam imunes ao medo nunca são afetados por esta magia. Dragões, certos mortos-vivos e outras criaturas têm esta magia como uma habilidade natural.'
  },
  {
    name: 'Paralisia',
    school: 'Branca ou Negra',
    cost: '2 PMs por criatura',
    range: 'curto',
    duration: 'sustentável',
    summary: 'Branca ou Negra, 2 PMs por criatura',
    description: 'Esta é uma magia pacificadora, usada por clérigos benevolentes para encerrar lutas sem matar — ou por clérigos menos nobres, para deixar a vítima indefesa antes de ter a cabeça esmagada pela maça... Cada vítima desta magia deve ter sucesso em um teste de Resistência. Se falhar ficará paralisada, incapaz de se mover, falar ou usar qualquer magia ou manobra que gaste PMs. Um oponente paralisado é considerado indefeso. Atacar a vítima (mesmo sem causar dano) provoca o imediato cancelamento da magia. Esta magia afeta apenas criaturas vivas. Qualquer alvo com Resistência superior à Habilidade do mago também é imune.'
  },
  {
    name: 'Pequenos Desejos*',
    school: 'todas',
    cost: '0',
    range: 'curto',
    duration: 'sustentável ou 1 hora',
    summary: 'todas, 0 PMs',
    description: 'Esta magia permite realizar uma série de pequenos truques inofensivos, que um mago pode usar para treinar ou entreter uma audiência sem gastar poder mágico. Uma vez conjurada, a magia permite executar efeitos mágicos simples durante uma hora. Os efeitos são mínimos e muito limitados, como: Criar pequenos objetos. Mover algo lentamente com Força 0. Colorir, limpar ou sujar itens pequenos (incluindo roupas). Aquecer, esfriar e/ou temperar (mas não produzir) até 500 gramas de material inanimado (incluindo comida). O mago pode dar qualquer aparência ao efeito. Pequenos Desejos não pode de nenhuma forma fazer um ataque, causar dano, ou atrapalhar a concentração de um conjurador. Objetos criados com esta magia parecem malfeitos e artificiais, incapazes de enganar alguém. São também muito frágeis, não podem ser usados como instrumentos, ferramentas ou armas. Qualquer mudança feita em um objeto (que não seja movê-lo, limpá-lo ou sujá-lo) dura apenas 1 hora.'
  },
  {
    name: 'Permanência',
    school: 'Elemental (terra)',
    cost: '1 a 5 PMs permanentes',
    range: 'curto',
    duration: 'permanente até cancelada',
    summary: 'Elemental (terra), 1-5 PMs permanentes',
    description: 'Esta é uma magia importante para fabricar itens mágicos, mas também tem uma infinidade de outras aplicações. Ela serve para tornar permanente qualquer outra magia sustentada, sem que os PMs do mago fiquem "presos" nela. Então, um mago pode usar Aumento de Dano para criar uma espada de chamas e depois lançar sobre ela Permanência, para ter de volta o Ponto de Magia que normalmente ficaria preso na espada. Permanência é usada para tornar criaturas mágicas mais duradouras, aumentar a duração de ilusões, ou ainda fixar um efeito mágico no corpo de uma criatura. Apenas magias sustentáveis podem ser tornadas permanentes. O conjurador deve sacrificar metade dos PMs necessários para lançar a magia original (arredondado para cima). Assim, para tornar permanente uma Criatura Mágica feita com 5 PMs, o conjurador sacrifica 3 PMs. Uma magia Permanente ainda pode ser anulada com Cancelamento de Magia, mas neste caso o "cancelador" também deve sacrificar para sempre os PMs utilizados. O número máximo de magias ou efeitos que uma criatura pode ter em seu corpo, através de Permanência, é igual à sua própria Resistência. Quando usada para fabricar um item mágico, o custo da magia é 1 PM permanente, independente do poder do item. A Permanência de um item mágico não pode ser cancelada.'
  },
  {
    name: 'Petrificação',
    school: 'Elemental (terra)',
    cost: '5 PMs',
    range: 'toque',
    duration: 'permanente até cancelada',
    summary: 'Elemental (terra), 5 PMs',
    description: 'Esta é a temível magia que transforma criaturas em pedra. Ela pode ser lançada de duas maneiras: com um contato visual (basta à vítima olhar para o mago) ou ao toque. Em ambos os casos a vítima tem direito a um teste de Resistência para negar o efeito. Uma criatura transformada em pedra não está morta: ela pode ser revertida ao estado normal através de poções, pergaminhos ou as magias Cancelamento de Magia, Cura de Maldição ou Desejo. As "estátuas" de seres petrificados são quase indestrutíveis, e não podem ser danificadas com armas ou ataques normais — apenas por magia e armas mágicas. Caso sofra qualquer dano, por mínimo que seja, uma criatura petrificada morre instantaneamente assim que é devolvida ao normal (mas ainda pode ser ressuscitada). Esta magia afeta apenas criaturas vivas. Qualquer criatura com Resistência superior à Habilidade do mago também é imune.'
  },
  {
    name: 'Proteção Mágica*',
    school: 'todas',
    cost: '2 a 10 PMs por turno',
    range: 'curto',
    duration: 'sustentável',
    summary: 'todas, 2-10 PMs por turno, A+1 por cada 2 PMs',
    description: 'O conjurador usa mágica para proteger uma criatura, criando uma parede de fogo, uma armadura de pedra, um escudo de luz sólida ou qualquer outra coisa. O aumento é igual a A+1 para cada 2 PMs gastos. Então, por 4 PMs, você pode erguer uma barreira à sua volta (ou à volta de um companheiro) para conseguir A+2. Esta proteção é cumulativa com a Armadura natural do alvo, mas não com qualquer outra magia de proteção.'
  },
  {
    name: 'Proteção Mágica Superior',
    school: 'Branca',
    cost: '1 a 5 PMs por turno',
    range: 'curto',
    duration: 'sustentável',
    summary: 'Branca, 1-5 PMs por turno, A+1 por cada 1 PM',
    description: 'A escola de Magia Branca tem uma versão mais eficaz de Proteção Mágica; A+1 para cada 1 PM gasto.'
  },
  {
    name: 'Silêncio',
    school: 'Branca ou Elemental (ar)',
    cost: '2 a 10 PMs',
    range: 'curto',
    duration: 'permanente até cancelada',
    summary: 'Branca ou Elemental (ar), 2-10 PMs',
    description: 'Esta magia pode ser lançada contra um local ou uma criatura, mas não em objetos. Em um local, vai afetar um volume esférico com até 3m de raio para cada 2 PMs gastos (até 15m por 10 PMs). Dentro desta área será impossível ouvir ou produzir qualquer som. Não se pode realizar magias dentro desta área, mas personagens que estejam fora da área podem lançar magias lá dentro. Lançada contra uma criatura, a magia vai impedir que ela consiga ouvir ou dizer qualquer coisa, assim como produzir qualquer som. Um ladrão se tornaria totalmente silencioso e sorrateiro (podendo, dependendo da situação, receber bônus quando usa as perícias Crime ou Investigação), mas um mago ficaria impossibilitado de invocar magias! Caso uma criatura receba esta magia contra a sua vontade, pode tentar resistir com um teste de Resistência +1.'
  },
  {
    name: 'Sono',
    school: 'Elemental (espírito)',
    cost: '3 PMs ou mais por criatura',
    range: 'longo',
    duration: 'veja adiante',
    summary: 'Elemental (espírito), 3+ PMs por criatura',
    description: 'Uma versão mais poderosa da magia Desmaio, ela consegue fazer suas vítimas adormecerem profundamente se falharem em um teste de Resistência +1. A magia dura uma hora para cada 3 PMs gastos (e também pode ser cancelada). Uma criatura inconsciente desperta automaticamente se sofrer qualquer dano. Esta magia afeta apenas criaturas vivas. Criaturas com Resistência superior à Habilidade do mago também não podem ser afetadas.'
  },
  {
    name: 'Teleportação',
    school: 'Branca, Elemental (ar) ou Negra',
    cost: '2 PMs por criatura ou 50kg de carga',
    range: 'veja adiante',
    duration: 'instantânea',
    summary: 'Branca, Elemental (ar) ou Negra, 2 PMs por criatura',
    description: 'Este é o poder máximo de transporte mágico. O mago simplesmente desaparece de um lugar e reaparece em outro. A magia permite ao mago teletransportar a si mesmo e certo número de companheiros voluntários para qualquer lugar que o conjurador já tenha visitado. Não há limite de distância, mas o ponto de partida e o ponto de destino devem ficar ao ar livre (não funciona no interior de estruturas ou masmorras) e no mesmo plano de existência. Uma criatura teleportada contra a vontade tem direito a um teste de Resistência +1 para evitar o efeito. Não é possível teleportar nada para o interior de objetos sólidos. Caso o mago tente uma Teleportação para um lugar em que nunca esteve, a chance de sucesso é pequena (1 em 1d6): em caso de falha, o(s) passageiros(s) ressurge(m) em algum outro lugar, escolhido pelo mestre.'
  }
]

