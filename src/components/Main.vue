<template>
  <div id="main">

    <div id="loadingArea">
      <Modal v-if="modal.component && modal.title.length > 0" :title="modal.title" :component="modal.component" :data="modal.data"></Modal>
      <ul>
        <li v-for="alert in alerts" :key="alert.text">
          <alert v-if="alert !=false" :text="alert.text"></alert>
        </li>
      </ul>
    </div>
    <registration v-if="!auth"></registration>
    <div id="desktop">
      <ul>
        <li v-for="app in applications">
          <application :title="app.title" :component="app.component" :styles="app.style"></application>
        </li>
      </ul>
    </div>

    <Dock></Dock>
  </div>
</template>

<script>
import { authBus,alertBus,modalBus,applicationBus, reloadBus } from '@/main';
import Dock from '@/components/dock/Dock'
import Registration from '@/components/Registration'
import Application from '@/components/Application'
import FileSystem from '@/components/filesystem/FileSystem'
import Settings from '@/components/applications/Settings'
import Buddylist from '@/components/applications/Buddylist'
import Display from '@/components/applications/Display/Display'
import Chat from '@/components/applications/chat/Chat'


import Modal from '@/components/gui/Modal'
import Alert from '@/components/gui/Alert'

import api from '@/utils/api'

export default {
  name: 'Main',
  components: {
    Dock,
    Registration,
    Modal,
    Application,
    Alert
  },
  data () {
    return {
      dockcomponent: Dock,
      auth:false,
      modal:{

      },
      applications:[],
      alerts:[]
    }
  },
  methods: {
    initApplications: function (authorized) {
      this.applications = {
        files:
              {
                title:'Files',
                component:FileSystem,
                style:{
                  width:4.5,
                  height:1.5,
                  left:6.5,
                  top:1.5
                }
              }

      }
      if(authorized){
        this.applications.files.style.left = 0.1;
        this.applications.files.style.top = 0.1;
        this.applications.settings = {
          title:'Settings',
          component:Settings,
          style:{
            hidden:true,
            width:4.5,
            height:3,
            left:2,
            top:1
          }
        };

        this.applications.buddylist = {
            title:'Buddylist',
            component:Buddylist,
            style:{
              width:2,
              height:3,
              left:9,
              top:0.1
            }
          };

         this.applications.display = {
            title:'Display',
            component:Display,
            style:{
              width:8,
              height:2,
              left:0.3,
              top:1.7
            }
          };

         this.applications.chat = {
            title:'Chat',
            component:Chat,
            style:{
              width:4,
              height:1.5,
              left:4.8,
              top:0.1
            }
          };
      }

      
      let self = this;
      setTimeout(()=>{
        applicationBus.$emit('applications', this.applications);

      },1000)
    },
    reload:function(){
        api.get('user/reload',{
        },function(err,result,body){
          if(err){
            console.log(err);
          }
          else{
            for(let i in body){
              reloadBus.$emit(i,body[i]);
            }
          }
        });
    }
  },
  created:function(){

      //init reload
      setInterval(this.reload,10000)
      if(localStorage.getItem('jwt')){
        this.auth = true;
      }

      //will be called e.g. during login/logout
      authBus.$on('auth', (authObj) => {
        if(typeof authObj.jwt != 'undefined'){
          this.auth = true;
        }
      });


      let self = this;
      //update alert object

      alertBus.$on('alert', (alertObj) => {
        self.alerts.push(alertObj);
        let current_index = self.alerts.length-1;

        //remove object from alerts array after 5s
        setTimeout(()=>{
          self.alerts[current_index] = false;
          self.$forceUpdate();
        },15000)
      });

      //update modalobj
      modalBus.$on('modal', (modalObj) => {
        this.modal = modalObj;
      });
      //initialize modalobj
      modalBus.$emit('modal', {
      });
      //will be called e.g. during login/logout
      applicationBus.$on('applications', (applications) => {
        self.applications = applications;
        self.$forceUpdate();
      });
      this.initApplications(this.auth);

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#desktop{
  position:fixed;
  top:0;
  right:0;
  bottom:40px;
  left:0;
  z-index:0;
}
</style>
