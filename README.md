# Ficha de Personagem - 3DT Alpha

Sistema de ficha de personagem para RPG com distribuição de pontos e salvamento automático em cookies.

## Instalação

```bash
npm install
```

## Executar em Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## Build para Produção

```bash
npm run build
```

## Funcionalidades

- **Distribuição de Pontos**: Sistema completo para distribuir pontos entre os atributos
- **Salvamento Automático**: Todos os dados são salvos automaticamente em cookies
- **Interface Responsiva**: Design adaptável para diferentes tamanhos de tela
- **Campos da Ficha**:
  - Informações básicas (Nome, Raça, Classe, Nível)
  - Atributos (Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma)
  - História/Background
  - Anotações

## Estrutura do Projeto

```
APP/
├── src/
│   ├── components/
│   │   └── CharacterSheet.vue    # Componente principal da ficha
│   ├── utils/
│   │   └── cookieUtils.js        # Utilitários para manipulação de cookies
│   ├── App.vue                   # Componente raiz
│   └── main.js                   # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Tecnologias

- Vue.js 3
- Vite
- JavaScript ES6+


