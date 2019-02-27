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
            <tab v-for="display_tab in display_tabs" :name="display_tab.name" :selected="display_tab.selected" v-html="display_tab.content">
            </tab>
            <!--<tab name="whazzup">
                <h1>What what whaaat?!</h1>
            </tab>-->
        </tabs>
    </div>
</template>
<script>
import file from '@/utils/file'
import linkUtil from '@/utils/link'

import UniverseButton from '@/components/gui/UniverseButton'
import UserPicture from '@/components/gui/UserPicture'
import Tabs from '@/components/gui/Tabs'
import Tab from '@/components/gui/Tab'


import { authBus, applicationBus } from '@/main';

export default {
  name: 'Display',
  components:{
    UniverseButton,
    UserPicture,
    Tabs,
    Tab
  },
  data () {
    return {
      auth:false,
      display_tabs:[]
    }
  },
  methods:{
    openTab:function(tabData){
      //deselect all other tabs
      for (let i = 0; i < this.display_tabs.length; i++) {
        this.display_tabs[i].selected = false;
      }
      this.display_tabs.push(tabData);
    },
    generateFileBrowser:function(name, content){
      return '<div class="linkBrowser"><header>youtube'+name+'</header><div class="browserContent">'+content+'</div></div>';
    },
    openFile:function(item){
      file.loadFile(item.data.id)
      .then((result)=>{

        let content;
        switch(result.file.filename.split('.').pop()){
          case 'txt':
            content = result.filecontent
          break;
        }

        let html = this.generateFileBrowser(item.data.name, content);
        this.openTab({
          name:result.file.name,
          content:html,
          selected:true
        })
      })
      .catch((e)=>{
        console.log('E');
        console.log(e);
      });
    },
    openLink:function(link){
      //openlink loads a webshot image of the link if its an unknown format.

      let content = ''
      let yt = linkUtil.validateYoutubeUrl(link.data.link); //either returns youtube videoid or false
      if(yt){
        content = '<iframe id="ytplayer" type="text/html" width="640" height="360" src="http://www.youtube.com/embed/'+yt+'?autoplay=1&origin=http://example.com" frameborder="0"/>';

      }else{
        content = '<div class="linkBrowser"><header>'+link.data.name+'</header><div class="browserContent"><img src="https://webshotserver.herokuapp.com/api/'+encodeURIComponent(link.data.link)+'"></div></div>';

      }
      let html = this.generateFileBrowser(link.data.name, content);
      this.openTab({
          name:link.data.name,
          content:html,
          selected:true
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