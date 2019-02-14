<template>
  <div id="main">

    <div id="loadingArea">
      <Modal v-if="modal.component && modal.title.length > 0" :title="modal.title" :component="modal.component" :data="modal.data"></Modal>
    </div>
    <registration v-if="!auth"></registration>

    <ul>
      <li v-for="app in applications">
        <application :title="app.title" :component="app.component"></application>
      </li>
    </ul>

    <Dock></Dock>
  </div>
</template>

<script>
import Vue from 'vue'

import { authBus } from '../main';
import { modalBus } from '../main';
import Dock from '@/components/Dock'
import Registration from '@/components/Registration'


import Application from '@/components/Application'
import FileSystem from '@/components/filesystem/FileSystem'

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
      this.applications.push({
        title:'Files',
        component:FileSystem
      })
    }
  },
  created:function(){
      this.initApplications();

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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
