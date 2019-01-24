<template>
  <div id="main">
    <h2>universe</h2>
    <h3>Welcome to the universe - the first social webOS</h3>
    <registration></registration>
    <FileSystem></FileSystem>
    <Dock></Dock>
  </div>
</template>

<script>
import Dock from '@/components/Dock'
import Application from '@/components/Application'
import Registration from '@/components/Registration'
import FileSystem from '@/components/filesystem/Application'
export default {
  name: 'Main',
  components: {
    Dock,
    Application,
    Registration,
    FileSystem
  },
  data () {
    return {
      dockcomponent: Dock
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
