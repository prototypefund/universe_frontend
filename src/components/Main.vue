<template>
  <div id="main">
    <h1>{{ msg }}</h1>
    <h2>universe</h2>
    <registration></registration>
    <application title="Testapplication"></application>
    <application title="YuliyaApplication"></application>
    <dock></dock>
  </div>
</template>

<script>
import Dock from '@/components/Dock'
import Application from '@/components/Application'
import Registration from '@/components/Registration'
export default {
  name: 'Main',
  components: {
    Dock,
    Application,
    Registration
  },
  data () {
    return {
      msg: 'Welcome to the universe'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
