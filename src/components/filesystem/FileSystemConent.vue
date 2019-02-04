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
      <header>
        {{path}}
        <span class="icon icon-gear pull-right" v-if="auth" @click="showSettings=!showSettings"></span>
      </header>
      <ul class="settings" v-if="showSettings">
        <li>
          <span class="icon white-heart"></span>
          Add to favorites
        </li>
        <li @click="createDirectory(directory_id)">
          <span class="icon white-folder"></span>
          Add folder
        </li>
        <li @click="createCollection(directory_id)">
          <span class="icon white-filesystem"></span>
          Add collection
        </li>
      </ul>
      <ul>
        <li v-for="directory in directories" @click="openDirectory(directory.id)">
          <span class="icon icon-folder"></span>
          {{directory.name}}
        </li>
      </ul>
     
   </div>
  </div>
</template>

<script>

import { authBus, modalBus, applicationBus } from '../../main';


import api from '@/utils/api'

import CreateDirectory from './CreateDirectory'
import CreateCollection from './CreateCollection'

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
      directories: []
    }
  },
  methods:{
    getDirectories:function(parent_id,cb){
        api.get('directories/'+parent_id,{
        },function(err,result,body){
          if(err){
            console.log(err);
          }
          else{
            cb(body);
          }
          
        });
    },
    openDirectory:function(id){
      console.log('open directory #'+id);
      this.path = id;
      this.directory_id = id;
      let self = this;
      this.openDirectoryOnBusUpdate = false;
      this.filesystemBus.directory_id = this.parent_directory_id;
      applicationBus.$emit('filesystem_1', this.filesystemBus);
      this.openDirectoryOnBusUpdate = true;
      this.getDirectories(id,function(result){
        self.directories = result.directories;
      });
    },
    createDirectory:function(parent_directory_id){
       modalBus.$emit('modal', {
        title:'Create Directory',
        component:CreateDirectory,
        data:{parent_directory_id:parent_directory_id}
      });
    },
    createCollection:function(directory_id){
       modalBus.$emit('modal', {
        title:'Create Collection',
        component:CreateCollection,
        data:{directory_id:directory_id}
      });
    }
  },
  mounted: function(){
    let self = this;
    this.openDirectory(0);



    applicationBus.$on('filesystem_1', (applicationObj) => {
        self.filesystemBus = applicationObj;
        if(self.openDirectoryOnBusUpdate)
          self.openDirectory(applicationObj.directory_id);
    });

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
