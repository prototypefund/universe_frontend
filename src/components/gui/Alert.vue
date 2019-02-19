<template>
    <div class="alert alert-info">There was an error.</div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['text'],
  methods: {
    
  },
  mounted: function () {
      console.log('alert ready');
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert.support{
    position: fixed; 
    z-index: 999999;
    /* display: none; */
    background: #607D8B;
    color: #FFF;
    border-radius: 0;
    height: 120px;
    width: 280px;
}
.alert.support.arrow-right {
    margin-left: -20px;
    margin-top: 10px;
}

.alert.support footer{
    position: absolute;
    bottom: 0;
    right: 0px;
    left: 0px;
}
.alert.support footer .button{
    margin: 5px;
}


.alert.support .icon{
    position: absolute;
    margin-bottom: -18px;
}
.alert.support .blue-chevron-up{
    margin-top: -54px;
    margin-left: -9px;
}
.alert.support .blue-chevron-right{
    position: absolute;
    margin-top: -81px;
    margin-left: 264px;
}
.alert.support.arrow-left {
    margin-top: 9px;
}

.alert.support .blue-chevron-down.right{
    left: auto;
    right: 0;
    margin-right: -10px;
}
.alert.support .blue-chevron-left {
    margin-left: -18px;
    margin-top: -84px;
}
.alert.support.arrow-top {
    margin-top: -100px;
}

/*universeForm end*/
</style>
