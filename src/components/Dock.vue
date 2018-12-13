<template>
  <div id="dock">Dock</div>
</template>

<script>
export default {
  name: 'Dock',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#dock{
  position: absolute;
  height: 40px;
  width: 100%;
  bottom: 0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
  background: #000;
}
</style>
