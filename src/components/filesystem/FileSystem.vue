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
        <span class="icon blue-play"></span>{{directory_id}} Video{{collection_id}}Files
      </li>          
    </ul>
   </div>
   <div class="contentMain">

      <Directory v-if="directory_id>-1" :directory="directory_id"></Directory>
      <Collection v-if="collection_id>-1" :collection="collection_id"></Collection>

   </div>
  </div>
</template>

<script>
import { applicationBus } from '../../main';

import Directory from './Directory'
import Collection from './Collection'

export default {
  name: 'FileSystem',
  data () {
    return {
      directory_id:0,
      collection_id:-1
    }
  },
  components:{
    Directory,
    Collection
  },
  methods:{
    openDirectory:function(id){
      console.log('open directory #'+id);
      this.directory_id = id;
    }
  },
  mounted: function(){
    applicationBus.$on('filesystem_1', (applicationObj) => {
        console.log('filesystem updated!');
        console.log(applicationObj);
        this.directory_id = applicationObj.directory_id;
        this.collection_id = applicationObj.collection_id;
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
