<template>
    <div class="universe-button" v-bind:class="{ 'anti-button': anti }"v-on:click="click()">{{text}}</div>
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
        return null
      }
    },
    anti: {
      type:Boolean,
      default: false
    }
    
  }
}
</script>
<style scoped>

.universe-button{
  color: #FFF;
  background-color: #00bcd4;
  min-width: 100px;
  margin-top: 2.5px;
  height: 35px;
  padding: 9px 7px;
  text-align: center;
  font-size: 16px;
  border: none;
  display: inline-block;
  cursor: pointer;
  margin-right: 3px;
  float:left;
}

.anti-button {
    color: #FFF;
    background-color: #37474f;
    width: 100px;
    margin-top: 2.5px;
    height: 35px;
    padding: 7px;
    text-align: center;
    font-size: 16px;
  float:left;
}

.antiButton:hover, .button:hover, .antiButton:focus, .button:focus, .antiButton:visited, .button:visited {
    color: #FFF;
}

.universe-button:hover{
  background: #18ffff;
}
</style>