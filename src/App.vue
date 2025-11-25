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
  background-color: #f5f5f5;
  overflow-x: hidden;
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
}

@media (max-width: 480px) {
  #app {
    padding: 8px;
  }
}
</style>


