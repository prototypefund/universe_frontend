<template>
  <div>
   <div class="leftNav">
    <ul>
      <li @click="openDirectory(1)">
        <span class="icon blue-filesystem"></span> All Files
      </li>
      <li>
        <span class="icon blue-star"></span> Suggestions
      </li>
      <li>
        <span class="icon blue-file"></span> Documents
      </li>
      <li>
        <span class="icon blue-playlist"></span> Audio Files
      </li>
      <li>
        <span class="icon blue-play"></span> Video Files
      </li>          
    </ul>
   </div>
   <div class="contentMain">

      <Directory directory="1"></Directory>

   </div>
  </div>
</template>

<script>

import { authBus, modalBus, applicationBus } from '../../main';


import api from '@/utils/api'

import CreateDirectory from './CreateDirectory'
import CreateCollection from './CreateCollection'
import Directory from './Directory'

export default {
  name: 'FileSystemContent',
  data () {
    return {
      auth:false,
      showSettings:false,
      openDirectoryOnBusUpdate:true, //needs to be set false during opendirectory to prevent endless loop
      filesystemBus:{},
      directory_id:0,
      path:'universe/',
      directories: [],
      collections: []
    }
  },
  components:{Directory},
  methods:{
    openDirectory:function(id){
      console.log('open directory #'+id);
      this.path = id;
      this.directory_id = id;
      let self = this;
      this.openDirectoryOnBusUpdate = false;
      this.filesystemBus.directory_id = this.parent_directory_id;
      applicationBus.$emit('filesystem_1', this.filesystemBus);
      this.openDirectoryOnBusUpdate = true;
      this.getItems(id,function(result){
        self.directories = result.directories;
        self.collections = result.collections;
      });
    }
  },
  mounted: function(){
    authBus.$on('auth', (authObj) => {
        if(typeof authObj.jwt != 'undefined'){
          this.auth = true;
        }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.contentMain{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left:175px;
}

.contentMain header{
  overflow: hidden;
  border-bottom: 1px solid #dcdcdc;
  padding: 10px;
}

.settings li{
  cursor: pointer;
  margin: 0 !important;
  background-color: #37474f;
  color: #ffffff !important;
  padding: 3px;
  border-bottom: 1px solid #263238;
}
</style>
