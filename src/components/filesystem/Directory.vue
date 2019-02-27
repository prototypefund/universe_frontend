<template>
  <div>
      <header>
        <span class="path">{{path}}</span>
        <span class="icon icon-gear pull-right" v-if="auth" @click="showSettings=!showSettings"></span>
      </header>
      <ul class="blue-settings" v-if="showSettings">
        <li>
          <span class="icon white-heart"></span>
          <span class="title">Add to favorites</span>
        </li>
        <li @click="createDirectory(directory_id)">
          <span class="icon white-folder"></span>
          <span class="title">Add folder</span>
        </li>
        <li @click="createCollection(directory_id)">
          <span class="icon white-filesystem"></span>
          <span class="title">Add collection</span>
        </li>
      </ul>
      <ul class="directoryList">
        <li @click="openDirectory(0)">
          <span class="icon icon-folder"></span>
          <span class="title">..</span>
        </li>
        <li v-for="directory in directories" @click="openDirectory(directory.id)">
          <span class="icon icon-folder"></span>
          <span class="title">{{directory.name}}</span>
        </li>
        <li v-for="collection in collections" @click="openCollection(collection.id)">
          <span class="icon icon-filesystem"></span>
          <span class="title">{{collection.name}}</span>
        </li>
      </ul>
  </div>
</template>

<script>

import { authBus, modalBus, applicationBus } from '../../main';


import api from '@/utils/api'

import CreateDirectory from './CreateDirectory'
import CreateCollection from './CreateCollection'

export default {
  name: 'Directory',
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
  props:['directory'],
  watch: {
    directory: function (directory_id) {
      this.openDirectory(directory_id);
    }
  },
  methods:{
    getItems:function(parent_id,cb){
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

      //set to false so applicationBus.$emit doesn't trigget infinite loop
      this.openDirectoryOnBusUpdate = false;

      this.filesystemBus.collection_id = -1;
      this.filesystemBus.directory_id = id;
      applicationBus.$emit('filesystem_1', this.filesystemBus);
      this.openDirectoryOnBusUpdate = true;

      let self = this;
      this.getItems(id,function(result){
        self.path = result.info.path;
        self.directories = result.directories;
        self.collections = result.collections;
      });
    },
    openCollection:function(id){
      console.log('open collection '+id);
      this.filesystemBus.directory_id = -1;
      this.filesystemBus.collection_id = id;
      applicationBus.$emit('filesystem_1', this.filesystemBus)
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
    this.directory_id = this.directory;
    let self = this;
    this.openDirectory(1);



    applicationBus.$on('filesystem_1', (applicationObj) => {
        self.filesystemBus = applicationObj;

        //bool openDirectoryOnBusUpdate is used to prevent infinte loop when openDirectory execute its set to false
        if(self.openDirectoryOnBusUpdate&&applicationObj.directory_id>-1)
          self.openDirectory(applicationObj.directory_id);
    });

    authBus.$on('auth', (authObj) => {
        if(typeof authObj.jwt != 'undefined'){
          self.auth = true;
        }
    });
    if(localStorage.getItem('jwt')){
      self.auth = true;
    }
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

header>.path{
    margin-top: 7px;
    display: block;
    float: left;
}
</style>
