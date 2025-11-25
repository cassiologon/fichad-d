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
}

#app {
  min-height: 100vh;
  padding: 20px;
}
</style>


