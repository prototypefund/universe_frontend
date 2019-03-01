<template>
  <tabs>
    <tab name="Home" :selected="true">
      <div>
        <center>
            <span class="icon blue-comment" style="height: 90px;width: 90px; margin-top:5px;margin-right: -17px;"></span>
            <h2 style="margin-top:0;">Chat</h2>
            <h3>Click on a user in your buddylist to open a dialogue</h3>
        </center>
      </div>
    </tab>
    <tab v-for="display_tab in display_tabs" :name="display_tab.name" :selected="display_tab.selected" v-if="display_tab.user">
      <Dialogue :user="display_tab.user"></Dialogue>
    </tab>
  </tabs>
</template>
<script>

import {applicationBus} from '@/main'

import api from '@/utils/api'
import user from '@/utils/user'

import Dialogue from '@/components/applications/chat/Dialogue'
import UniverseButton from '@/components/gui/UniverseButton'
import Tabs from '@/components/gui/Tabs'
import Tab from '@/components/gui/Tab'

export default {
  name: 'Chat',
  components:{
    UniverseButton,
    Dialogue,
    Tabs,
    Tab
  },
  

  data () {
    return {
      name:'',
      display_tabs:[{'name':'Home','selected':true,data:false}],
      messages:[],
      message:''
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
    openChat:function(buddy){
        console.log('user');
        user.getInfo(buddy)
        .then((info)=>{
          this.openTab({
            name:info.username,
            selected:true,
            user:info
          })
        });
    }
  },
  created:function(){
    let self = this;
    applicationBus.$on('chat', (action) => {
      self.openChat(action.data.userid);
    });
  }
}
</script>
<style>
.dialogueFrame header {
  top:0;
  right: 0;
  left: 0;
  position:absolute;
  height: 50px;
  border-bottom: 1px solid #dcdcdc;
  padding: 11px;
}
.dialogueFrame .dialogue{
  position:absolute;
  top:50px;
  bottom:60px;
}
.dialogueFrame footer {
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  height: 60px;
  border-top: 1px solid #dcdcdc;
  padding: 10px;
}
</style>