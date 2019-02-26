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
            <!--<tab name="whazzup">
                <h1>What what whaaat?!</h1>
            </tab>-->
        </tabs>
    </div>
</template>
<script>
import UniverseButton from '@/components/gui/UniverseButton'
import UserPicture from '@/components/gui/UserPicture'
import Tabs from '@/components/gui/Tabs'
import Tab from '@/components/gui/Tab'


import { authBus } from '@/main';

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
      auth:false
    }
  },
  methods:{
    submit:function(){
      
    }
  },
  created:function(){
    let self = this;
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