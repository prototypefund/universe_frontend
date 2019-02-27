<template>
  <div>
      <header>
        <span class="icon icon-filesystem"></span>
        <span class="title">{{name}}</span>
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
          <span class="title">Upload files</span>
        </li>
        <li @click="addLink()">
          <span class="icon white-file"></span>
          <span class="title">Add Link</span>
        </li>
      </ul>
      <ul class="collectionList">
        <li class="header">Files</li>
        <li v-if="files.length == 0">No files uploaded. Click on the settings button above to upload them.</li>
        <li v-for="file in files" @click="openFile(file)">
          <span class="icons">
            <span class="icon icon-file"></span>
          </span>
          <span class="title">
            {{file.name}}
          </span>
          <span class="buttons">
            <span class="icon icon-download"></span>
            <span class="icon icon-gear"></span>
          </span>
        </li>

        <!--<li class="header">Images</li>
        <li>No images uploaded. Click on the settings button above to upload them.</li>-->

        <li class="header">Links</li>
        <li v-if="links.length == 0">No links added. Click on the settings button above to add them.</li>
        <li v-for="link in links" @click="openLink(link)">
          <span class="icons">
            <span class="icon icon-link"></span>
          </span>
          <span class="title">
            {{link.name}}
          </span>
          <span class="buttons">
            <span class="icon icon-gear"></span>
          </span>
        </li>

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
      files:[],
      links:[]
    }
  },
  props:['collection'],
  watch: {
    collection: function (collection_id) {
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
      this.openCollectionOnBusUpdate = false;
      this.filesystemBus.directory_id = -1;
      this.filesystemBus.collection_id = id;
      applicationBus.$emit('filesystem_1', this.filesystemBus)

      let self = this;
      this.getItems(id,function(result){
        self.name = result.info.name;
        self.files = result.files;
        self.links = result.links;
      });
    },
    uploadFile:function(){
      modalBus.$emit('modal', {
        title:'Upload File',
        component:UploadFile,
        data:{collection_id:this.collection_id}
      });
    },
    openFile:function(file){
      applicationBus.$emit('display', {
        type:'file',
        data:file
      });
    },
    openLink:function(link){
      applicationBus.$emit('display', {
        type:'link',
        data:link
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
  padding: 0 10px;
  border-bottom: 1px solid #cfd8dc;
}
header>span{
  display: block;
  margin: 13px 0;
  float: left;
}
header .title{
  padding-top:10px;
  padding-left:5px;
}
header .headerbuttons{
  float:right;
  padding-right:10px;
}
li.header{
    padding: 10px 0 10px 0;
    color: #00bcd4;
    font-size: 20px;
    font-weight: 300;
    margin-left: 10px;
}

.collectionList .buttons{
  float:right;
  padding-right:5px;
}

.collectionList li{
  clear:left;
}

.collectionList li>span.icons{
  padding-left: 10px;
}

.collectionList li>span{
  float:left;
  display:block;

}

.collectionList li>.title{
  padding-top:10px;
}


</style>
