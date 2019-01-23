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
@font-face {
    font-family: 'ubuntu';
    src: url('../public/fonts/ubuntu-l-webfont.eot');
    src: url('../public/fonts/ubuntu-l-webfont.eot?#iefix') format('embedded-opentype'),
         url('../public/fonts/ubuntu-l-webfont.woff2') format('woff2'),
         url('../public/fonts/ubuntu-l-webfont.woff') format('woff'),
         url('../public/fonts/ubuntu-l-webfont.ttf') format('truetype'),
         url('../public/fonts/ubuntu-l-webfont.svg#ubuntu_monoregular') format('svg');
    font-weight: normal;
    font-style: normal;

}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family:ubuntu;
  font-weight:200!important;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(./assets/gfx/bg.jpg) no-repeat 100%;
}
h2{
  font-weight:200;
}

</style>
