<template>
  <div id="app">
    <CharacterSheet />
  </div>
</template>

<script>
import CharacterSheet from './components/CharacterSheet.vue'
import './styles/medieval-modals.css'

export default {
  name: 'App',
  components: {
    CharacterSheet
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Cinzel', 'MedievalSharp', serif;
  overflow-x: hidden;
  
  /* Fantasy Background - fundo3.png acompanhando o scroll */
  background-color: #2c1810; /* Fallback color - marrom escuro medieval */
  background-image: url('./imagens/fundo3.png');
  background-size: cover;
  background-position: center top;
  background-attachment: scroll; /* acompanha o scroll, parte da estrutura */
  background-repeat: no-repeat;
  color: #3d2817;
}

#app {
  min-height: 100vh;
  padding: 20px;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  padding-top: 60px;
}

/* Responsividade para App.vue */
@media (max-width: 768px) {
  #app {
    padding: 10px;
  }
  
  body {
    background-size: cover;
    background-attachment: scroll; /* Better performance on mobile */
  }
}

@media (max-width: 480px) {
  #app {
    padding: 8px;
  }
  
  body {
    background-size: cover;
    background-attachment: scroll; /* Better performance on mobile */
  }
}
</style>


