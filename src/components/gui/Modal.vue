<template>
  <div>
    <div class="modal">
      <header>
        {{ title }}
        <span class="icon white-close close"></span>
      </header>
      <div class="content">
        <component :is="component"></component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['title', 'component'],
  methods: {
    
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
</style>
