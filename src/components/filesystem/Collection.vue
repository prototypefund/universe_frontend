<template>
  <div>
      <header>
        <span class="icon icon-filesystem"></span>
        <span class="elementtitle">{{name}}</span>
        <span class="headerbuttons">
          <span class="icon blue-list"></span>
          <span class="icon icon-small-symbols"></span>
          <span class="icon icon-large-symbols"></span>
          <span class="icon icon-gear" v-if="auth" @click="showSettings=!showSettings"></span>
        </span>
      </header>
      <ul class="blue-settings" v-if="showSettings">
        <li @click="uploadFile()">
          <span class="icon white-file"></span>
          Upload files
        </li>
        <li @click="addLink()">
          <span class="icon white-file"></span>
          Add Link
        </li>
      </ul>
      <ul>
        <li class="header">Files</li>
        <li v-if="files.length > 0">No files uploaded. Click on the settings button above to upload them.</li>
        <li v-for="file in files">
          <span class="icons">
            <span class="icon icon-file"></span>
          </span>
          <span class="title">
            {{file.name}}
          </span>
          <span class="buttons">
            <span class="icon icon-gear"></span>
          </span>
          <span class="size" style="display: none;">138 kB</span>
          <span class="date" style="display: none;">1970 Jan 01</span>
        </li>

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

import UploadFile from './UploadFile'

import CreateLink from './CreateLink'

export default {
  name: 'Collection',
  data () {
    return {
      auth:false,
      showSettings:false,
      openCollectionOnBusUpdate:true, //needs to be set false during opendirectory to prevent endless loop
      filesystemBus:{},
      collection_id:0,
      name:'',
      files:[]
    }
  },
  props:['collection'],
  watch: {
    collection: function (collection_id) {
        console.log('UPDATE!'+collection_id);
      this.openCollection(collection_id);
    }
  },
  methods:{
    getItems:function(parent_id,cb){
        api.get('collections/'+parent_id,{
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
      this.openCollectionOnBusUpdate = false;
      this.filesystemBus.directory_id = -1;
      this.filesystemBus.collection_id = id;
      applicationBus.$emit('filesystem_1', this.filesystemBus)

      let self = this;
      this.getItems(id,function(result){
        self.name = result.info.name;
        self.files = result.files;
      });
    },
    uploadFile:function(){
      modalBus.$emit('modal', {
        title:'Upload File',
        component:UploadFile,
        data:{collection_id:this.collection_id}
      });
    },
    addLink:function(){
      modalBus.$emit('modal', {
        title:'Add Link',
        component:CreateLink,
        data:{collection_id:this.collection_id}
      });
    }
  },
  mounted: function(){
    this.collection_id = this.collection;
    this.openCollection(this.collection);
    
    let self = this;
    applicationBus.$on('filesystem_1', (applicationObj) => {
        self.filesystemBus = applicationObj;
        
        console.log('UPDATE!');
        if(self.openCollectionOnBusUpdate && applicationObj.collection_id>-1)
          self.openCollection(applicationObj.collection_id);
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
