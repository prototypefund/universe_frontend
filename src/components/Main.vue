<template>
  <div id="main">

    <div id="loadingArea">
      <Modal v-if="modal.component && modal.title.length > 0" :title="modal.title" :component="modal.component" :data="modal.data"></Modal>
    </div>
    <registration v-if="!auth"></registration>

    <ul>
      <li v-for="app in applications">
        <application :title="app.title" :component="app.component" :styles="app.style"></application>
      </li>
    </ul>

    <Dock></Dock>
  </div>
</template>

<script>
import { authBus,modalBus,applicationBus } from '../main';
import Dock from '@/components/Dock'
import Registration from '@/components/Registration'


import Application from '@/components/Application'
import FileSystem from '@/components/filesystem/FileSystem'
import Settings from '@/components/Settings'

import Modal from '@/components/gui/Modal'

export default {
  name: 'Main',
  components: {
    Dock,
    Registration,
    Modal,
    Application
  },
  data () {
    return {
      dockcomponent: Dock,
      auth:false,
      modal:{

      },
      applications:[]
    }
  },
  methods: {
    initApplications: function () {
      this.applications = {
        files:
              {
                title:'Files',
                component:FileSystem
              },
        settings:
              {
                title:'Settings',
                component:Settings,
                style:{
                  hidden:true,
                  width:6,
                  height:2,
                  left:2,
                  top:1
                }
              }
      }
      let self = this;
      setTimeout(()=>{
        applicationBus.$emit('applications', this.applications);

      },1000)
    }
  },
  created:function(){

      if(localStorage.getItem('jwt')){
        this.auth = true;
      }

      //will be called e.g. during login/logout
      authBus.$on('auth', (authObj) => {
        if(typeof authObj.jwt != 'undefined'){
          this.auth = true;
        }
      });

      //update modalobj
      modalBus.$on('modal', (modalObj) => {
        this.modal = modalObj;
      });
      //initialize modalobj
      modalBus.$emit('modal', {
      });

      let self = this;
      //will be called e.g. during login/logout
      applicationBus.$on('applications', (applications) => {
        console.log(applications.settings);
        console.log('asd');
        self.applications = applications;
        console.log(self.applications);
        self.$forceUpdate();
      });

      this.initApplications();

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
