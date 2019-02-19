<template>
    <div class="alert alert-info">{{alertText}}</div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['text'],

  data () {
    return {
      alertText:this.text
    }
  },
  methods: {
    
  },
  mounted: function () {
      console.log('alert ready');
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert{
    padding:15px;
    margin-bottom:20px;
    border:1px solid transparent;
    border-radius: 3px;
    border-width: 1px;
    border-color: #00bcd4;
    position: fixed;
    z-index: 9999;
    left:50%;
    margin-left:-165px;
    width: 310px;
}
.alert h4{
    margin-top:0;
    color:inherit
}
.alert .alert-link{
    font-weight:700
}
.alert>p,.alert>ul{
    margin-bottom:0
}
.alert>p+p{
    margin-top:5px
}
.alert-dismissable,.alert-dismissible{
    padding-right:35px
}
.alert-dismissable .close,.alert-dismissible .close{
    position:relative;
    top:-2px;
    right:-21px;
    color:inherit
}
.alert-success{
    color:#3c763d;
    background-color:#dff0d8;
    border-color:#d6e9c6
}
.alert-success hr{
    border-top-color:#c9e2b3
}
.alert-success .alert-link{
    color:#2b542c
}
.alert-info{
    background-color: #263238;
    color: #FFF;
    border-color:#bce8f1;
    padding: 30px 30px;
    text-align: center;
    position: absolute;
}
.alert-info hr{
    border-top-color:#a6e1ec
}
.alert-info .alert-link{
    color:#245269
}
.alert-warning{
    color:#8a6d3b;
    background-color:#fcf8e3;
    border-color:#faebcc
}
.alert-warning hr{
    border-top-color:#f7e1b5
}
.alert-warning .alert-link{
    color:#66512c
}
.alert-danger{
    color: #FFF;
    background-color: #263238;
    border-color: #00bcd4;
}
.alert-danger hr{
    border-top-color:#e4b9c0
}
.alert-danger .alert-link{
    color:#843534
}


.alert.support{
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
