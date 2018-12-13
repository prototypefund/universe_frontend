<template>
    <div class="universe-button" v-on:click="click()">{{text}}</div>
</template>
<script>
export default {
  name: 'UniverseButton',
  props:{
    text: {
      type: String,
      default: 'Submit'
    },
    click: {
      type: Function,
      default: function () {
        console.log('clicked')
        return null
      }
    },
    
  }
}
</script>
<style scoped>

.universe-button{
  color: #FFF;
  background-color:  #00bcd4;
  min-width: 100px;
  margin-top: 2.5px;
  height: 35px;
  padding: 7px 7px;
  text-align: center;
  font-size:16px;
  border: none;
  display: inline-block;
  cursor: pointer;
  margin-right: 3px;
}

.universe-button:hover{
  background: #18ffff;
}
</style>