<template>
    <div class="display">
      <tabs>
            <tab name="Home" :selected="true">
              <div v-if="auth" class="home">
                <header>
                  <div class="userPictureContainer">
                    <userPicture :userid="userid" size="40"></userPicture>
                  </div>
                  <h3>Hey username!,<br/>good too see you :)</h3>
                </header>
                <div class="navi">
                  <ul>
                    <li><span class="icon white-home"></span></li>
                    <li>Groups</li>
                    <li>Favorites</li>
                    <li>Playlists</li>
                    <li>My Files</li>
                  </ul>
                </div>
              </div>
              <div v-if="!auth">
                <h1>Please Login</h1>
              </div>
            </tab>
            <tab v-for="display_tab in display_tabs" :name="display_tab.name" :selected="display_tab.selected" v-if="display_tab.item">
              <showItem :item="display_tab.item"></showItem>

            </tab>
        </tabs>
    </div>
</template>
<script>
import file from '@/utils/file'
import linkUtil from '@/utils/link'

import UniverseButton from '@/components/gui/UniverseButton'
import UserPicture from '@/components/gui/UserPicture'

import ShowItem from './ShowItem';
import Tabs from '@/components/gui/Tabs'
import Tab from '@/components/gui/Tab'


import { authBus, applicationBus } from '@/main';

export default {
  name: 'Display',
  components:{
    UniverseButton,
    UserPicture,
    Tabs,
    Tab,
    ShowItem
  },
  data () {
    return {
      auth:false,
      display_tabs:[{'name':'Home','selected':true,item:false}]
    }
  },
  methods:{
    openTab:function(tabData){
      //deselect all other tabs
      for (let i in this.display_tabs) {
        this.display_tabs[i].selected = false;
      }
      this.display_tabs.push(tabData);
    },
    openFile:function(item){
        this.openTab({
          name:item.data.name,
          selected:true,
          item:item
        })
    },
    openLink:function(link){
      //openlink loads a webshot image of the link if its an unknown format.
      link.type = 'link';
      this.openTab({
          name:link.data.name,
          selected:true,
          item:link
      });
    }
  },
  created:function(){
    let self = this;
    applicationBus.$on('display', (item) => {
      if(item.type == 'file')
        this.openFile(item);
      else if(item.type == 'link')
        this.openLink(item)

    });

    authBus.$on('auth', (authObj) => {
        if(typeof authObj.jwt != 'undefined'){
          self.auth = true;
        }
    });
    if(localStorage.getItem('jwt')){
      self.auth = true;
      self.userid = localStorage.getItem('userid');

    }
  }
}
</script>
<style scoped>
.home header{
  margin-top:-16px;
}

.home header .userPictureContainer{
    float: left;
    height: 100px;
    width: 100px;
    padding:30px;
}
.home header .userpicture{
  border-radius:0!important;
  border:none!important;
}
.home header h3{
  padding:30px 0 0 0;
  font-size:16px;
  font-weight:200;
}
.navi {
    float: left;
    width: 100%;
}
.navi li:first-of-type {
    width: 40px;
    background-color: #00bcd4;
}
.navi li {
    display: inline-block;
    float: left;
    width: -moz-calc(25% - 10px);
    width: -webkit-calc(25% - 10px);
    width: calc(25% - 10px);
    height: 40px;
    text-align: center;
    background-color: #eceff1;
    border-right: 1px solid #ffffff;
    cursor: pointer;
    line-height: 2.4;
}
</style>