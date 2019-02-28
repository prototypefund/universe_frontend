<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
    font-family: 'ubuntu';
    src: url('../public/fonts/ubuntu-l-webfont.eot');
    src: url('../public/fonts/ubuntu-l-webfont.eot?#iefix') format('embedded-opentype'),
         url('../public/fonts/ubuntu-l-webfont.woff2') format('woff2'),
         url('../public/fonts/ubuntu-l-webfont.woff') format('woff'),
         url('../public/fonts/ubuntu-l-webfont.ttf') format('truetype'),
         url('../public/fonts/ubuntu-l-webfont.svg#ubuntu_monoregular') format('svg');
    font-weight: normal;
    font-style: normal;

}
html, body {margin: 0; height: 100%; overflow: hidden}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family:ubuntu;
  font-weight:200!important;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(./assets/gfx/bg.jpg) no-repeat 100%;
}

h1, h2 {
    font-size: 24px;
}

h2{
  font-weight:200;
}

ul{
  list-style: none;
  margin:0;
  padding:0;
}

a{
    color: #313131;
    text-decoration: none;
}

.pull-right{
  float:right;
}

.pull-left{
  float:left;
}

.clear{
  clear:both;
}

input[type=text], input[type=password] {
    width: 100%;
    height: 40px;
    padding: 7px;
    font-size: 16px;
    color: #313131;
    margin-bottom: 15px;
    border: none;
    border: 1px solid #c9c9c9;
}

*{
  box-sizing: border-box;
}

.blue-settings li{
  cursor: pointer;
  margin: 0 !important;
  background-color: #37474f;
  color: #ffffff !important;
  padding: 3px;
  border-bottom: 1px solid #263238;
}

.directoryList li, .blue-settings li{
  clear: both;
}

.blue-settings li{
  clear: both;
  height:38px;
}

.directoryList li>span, .blue-settings li>span{
  float:left;
}

.directoryList li>span.title, .blue-settings li>span.title{
  height: 35px;
  display: block;
  padding: 9px 5px;
  float: left;
}

.leftNav{
  background: #cfd8dc;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 175px;
}

.leftNav ul li{
  margin: 0px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
}

.leftNav ul li:hover{
  background:#FFF;
  cursor:pointer;
}

.leftNav .icon{
  margin-bottom:-11px;
}

.leftNav.dark li{
    padding: 0;
    color: #FFF;
    padding-left: 5px;
    padding-right: 5px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    background: #37474f;
    overflow: hidden;
    font-size: 16px;
}
.leftNav.dark li .white{
    display:none;
}

.leftNav.dark li:hover, .leftNav.dark li.active{
    background-color:  #00bcd4;
}

.leftNav.dark li:hover .icon,.leftNav.dark li.active .icon{
    display: none!important;
}
.leftNav.dark li:hover .white, .leftNav.dark li.active .white{
    display: inline-block!important;
}

.leftNav.dark li:active, .leftNav.dark li:focus{
    background-color:  #263238;
}

.leftNav.dark li .icon{
    margin-right: 5px;
    margin-bottom: -9px;
}

.contentMain{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left:175px;
}

.userPicture {
    background-position: center center;
    background-size: cover!important;
    background-repeat: no-repeat;
    border: 2px solid;
    float: left;
    cursor: pointer;
}
</style>
