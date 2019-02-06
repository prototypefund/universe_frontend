<template>
  <div>
      <header>
        <span class="icon icon-filesystem"></span>
        <span class="elementtitle">Metamorphosis</span>
        <span class="headerbuttons">
          <span class="icon blue-list"></span>
          <span class="icon icon-small-symbols"></span>
          <span class="icon icon-large-symbols"></span>
          <span class="icon icon-gear" v-if="auth" @click="showSettings=!showSettings"></span>
        </span>
      </header>
      <ul class="blue-settings" v-if="showSettings">
        <li>
          <span class="icon white-file"></span>
          Upload files
        </li>
      </ul>
      <ul>
        <li class="header">Files</li>
        <li>No files uploaded. Click on the settings button above to upload them.</li>
        <li class="header">Images</li>
        <li>No images uploaded. Click on the settings button above to upload them.</li>
        <li class="header">Links</li>
        <li>No links added. Click on the settings button above to add them.</li>
      </ul>
  </div>
</template>

<script>
import { authBus, modalBus, applicationBus } from '../../main';

import api from '@/utils/api'

import CreateDirectory from './CreateDirectory'
import CreateCollection from './CreateCollection'

export default {
  name: 'Collection',
  data () {
    return {
      auth:false,
      showSettings:false,
      openDirectoryOnBusUpdate:true, //needs to be set false during opendirectory to prevent endless loop
      filesystemBus:{},
      collection_id:0,
      path:'universe/',
      directories: [],
      collections: []
    }
  },
  props:['directory'],
  watch: {
    collection: function (collection_id) {
      this.openCollection(collection_id);
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
    openCollection:function(id){
      console.log('open collection');
      this.filesystemBus.directory_id = -1;
      this.filesystemBus.collection_id = id;
      applicationBus.$emit('filesystem_1', this.filesystemBus)
    },
  },
  mounted: function(){
    this.collection_id = this.collection;
    let self = this;

    applicationBus.$on('filesystem_1', (applicationObj) => {
        self.filesystemBus = applicationObj;
        //bool openDirectoryOnBusUpdate is used to prevent infinte loop when openDirectory execute its set to false
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
header {
  height: 60px;
  padding-top: 12px;
  padding-right: 10px;
  border-bottom: 1px solid #cfd8dc;
}
header .headerbuttons{
  float:right;
}

li.header{
  color: #00bcd4;
}
</style>
