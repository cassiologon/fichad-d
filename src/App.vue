<template>
  <div id="app">
    <CharacterSheet />
  </div>
</template>

<script>
import CharacterSheet from './components/CharacterSheet.vue'

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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
  
  /* Fantasy Background - Using fundof.png image */
  background-color: #e8e3d8; /* Fallback color */
  background-image: url('./imagens/fundof.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

#app {
  min-height: 100vh;
  padding: 20px;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
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


