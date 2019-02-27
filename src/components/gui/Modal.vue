<template>
  <div>
    <div class="modal">
      <header>
        {{ title }}
        <span class="icon white-close close" @click="close"></span>
      </header>
      <div class="content">
        <component :is="component" :data="data"></component>
      </div>
    </div>
  </div>
</template>
<script>
import { modalBus } from '@/main';
export default {
  name: 'Modal',
  props: ['title', 'component', 'data'],
  methods:{
    close:function(){
      //close modal
      modalBus.$emit('modal', {});
    }
  },
  mounted: function () {
      console.log('modal ready');
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal{
  position: fixed;
  overflow: auto;
  top: 70px;
  left: 50%;
  background-color: #607d8b;
  color: #fefefe;
  margin-left: -200px;
  width: 400px;
  max-height: 75%;
  min-height:100px;
  z-index: 99999;
}
.modal>header{
  font-size:24px;
  padding:15px;
  border-bottom: 1px solid #dcdcdc;
}
.modal>.content{
  padding:15px;  
}
.modal>header>.close{
  position: absolute;
  right: 10px;
  top: 10px;
}


/*universeForm start*/
.universeForm .row{
  position:relative;
}
.universeForm input[type=text]{
  width: calc(100% - 15px);
  height: 40px;
  padding: 7px;
  font-size: 16px;
  color: #313131;
  margin-bottom: 15px;
  border: none;
  background: #FFF;
}
/*universeForm end*/
</style>
