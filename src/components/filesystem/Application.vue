<template>
    <application title="Files" :component="component"></application>
</template>

<script>
import Application from '@/components/Application'
import FileSystemContent from '@/components/filesystem/FileSystemConent'
export default {
  name: 'FileSystem',
  components: {
    Application
  },
  data () {
    return {
      component:FileSystemContent,
      msg: 'test'
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
