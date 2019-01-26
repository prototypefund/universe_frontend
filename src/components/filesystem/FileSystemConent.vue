<template>
  <div>
   <div class="leftnav">
     <ul>
       
     </ul>
   </div>
   <div class="main">
     
   </div>
  </div>
</template>

<script> 
import api from '@/utils/api'
export default {
  name: 'FileSystemContent',
  data () {
    return {
      msg: 'test'
    }
  },
  mounted: function(){
    
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
