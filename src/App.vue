<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(./assets/gfx/bg.jpg) no-repeat 100%;
}

</style>
