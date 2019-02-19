<template>
  <div class="userpicture standarduser" v-bind:style="{ width: size + 'px', height: size + 'px', borderRadius:size/2+'px' }">
  </div>
</template>

<script>
export default {
  name: 'UserPicture',
  props: ['userid', 'size'],
  mounted: function () {
      console.log('modal ready');
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userpicture{
    background-position: center center;
    background-size: cover!important;
    background-repeat: no-repeat;
    border: 2px solid;
    float: left;
    cursor: pointer;
}
.standarduser {
    background-image: url(../../assets/gfx/standarduser.png);
}
</style>
