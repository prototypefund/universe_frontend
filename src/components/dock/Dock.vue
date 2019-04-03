<template>
  <div>
    <div id="loginBox" v-if="!auth">
                <form method="post" target="submitter" id="loginForm" onsubmit="login(); return false;">
                  <div>
                    <input type="text" placeholder="username" v-model="username">
                  </div>
                  <div>
                    <input type="password" placeholder="password" v-model="password">
                  </div>
                  <div>
                      <universeButton text="Login" :click="login" style="float: right;margin-right: 0;"></universeButton>
                  </div>
                </form>
    </div>
    <div id="dashboardWrapper" :class="{ 'down': !showDashboard }">
      <Dashboard></Dashboard>
    </div>
    <ul id="notifications">
      <li v-for="notification in openRequests">
        <notification :notification="notification" type="request"></notification>
      </li>
    </ul>

    <div id="dock">
      <div v-if="!auth">
        <universeButton text="Login" :click="toggleLogin" v-if="!auth"></universeButton>
        <universeButton text="Apps"></universeButton>
      </div>
      <div v-if="auth" id="buttons">
        <i class="icon white-chevron-down" v-if="showDashboard" @click="toggleDashboard"></i>
        <i class="icon white-chevron-up" v-if="!showDashboard" @click="toggleDashboard"></i>
        <span id="startButton">
          <i class="icon white-eye"></i>
          <i class="icon white-user"></i>
          <i class="icon white-comment"></i>
        </span>
        <i class="icon white-logout" @click="logout"></i>
      </div>
      <div class="dockRight pull-right" v-if="auth">
        <a title="search something" id="searchTrigger" @click="showSearch"><span class="icon white-search"></span></a>
        <a title="settings" id="settingsTrigger" @click="showSettings"><span class="icon white-gear"></span></a>
        <div id="clock" v-html="dateTime"></div>
      </div>
      <div  class="dockRight pull-right loggedOut" v-if="!auth">
        <div id="clock" v-html="dateTime"></div>
      </div>
    </div>
    <search :showsearch="showsearch"></search>
  </div>
</template>

<script>
import $ from 'jquery';
import Dashboard from '@/components/dock/Dashboard'
import Search from '@/components/Search'
import UniverseButton from '@/components/gui/UniverseButton'
import Notification from '@/components/gui/Notification'
import api from '@/utils/api'
import cry from '@/utils/crypto'
import { authBus, applicationBus, reloadBus } from '@/main';

export default {
  name: 'Dock',
  components: {
    UniverseButton,
    Search,
    Notification,
    Dashboard
  },
  data () {
    return {
      auth:false,
      username: '',
      password: '',
      dateTime:'',
      applications:{},
      showsearch:false,
      showDashboard:false,
      openRequests:[]
    }
  },
  methods: {
    getDateTime: function () {
      let options = { weekday: 'long', month: 'short', day: 'numeric' };
      let today  = new Date();
      return today.toLocaleDateString("en-US", options)+'&nbsp;&nbsp;&nbsp;'+(today.getHours()<10?'0':'')+today.getHours()+ ":" + (today.getMinutes()<10?'0':'')+today.getMinutes();
    },
    login : function(){
        const self = this;
        const username = this.username;
        api.get('user/getUserSalt/'+username,{
        },function(err,result,body){
          if(err){
            if(err.error == 'no_user_found')
              alert('No matching user found');
            else
              alert('could not login!');
          }
          else{
            
            const passwordSalt = cry.symDecrypt(body.encryptedSalt,self.password);

            const passwordHash = cry.encodeBase64(cry.hash(self.password,passwordSalt));


            api.post('user/login', {
              username,
              passwordHash
            },(error,result,body)=>{
              if(error)
                console.log(error)
              else{
                authBus.$emit('auth', {
                  user:body.user,
                  jwt:body.jwt
                });
                localStorage.setItem('jwt',body.jwt);
                localStorage.setItem('userid',body.user.id);
                localStorage.setItem('password',self.password);
                localStorage.setItem('passwordHash',passwordHash);
                window.location.reload();
                self.auth = true;
              }
            });
          }
          
        });
    },
    logout : function(){
      localStorage.clear();
      window.location.reload();
    },
    toggleDashboard : function(){
      this.showDashboard = !this.showDashboard;
    },
    toggleLogin : function(){
      $('#loginBox').slideToggle();
    },
    showSettings : function(){
      let self = this;
      this.applications.settings.style.hidden = false;
      applicationBus.$emit('applications', this.applications)
    },
    showSearch: function(){
      this.showsearch = true;
    }
  },
  mounted:function(){
    let self = this;

    if(localStorage.getItem('jwt')){
      self.auth = true;
    }
    //console.log(applicationBus.$data.valueOf('applications'));
    applicationBus.$nextTick();
    //will be called e.g. during login/logout
    applicationBus.$on('applications', (applications) => {
        self.applications = applications
    });
    reloadBus.$on('openRequests', (openRequests) => {
        console.log('openRequests',openRequests);
        this.openRequests = openRequests;
    });

    this.dateTime = this.getDateTime();
    setInterval(function(){
      self.dateTime = self.getDateTime();
    },60000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#dashboardWrapper{
  position: absolute;
  height: 250px;
  bottom: 0;
  width: 100%;
}
#dashboardWrapper.down{
  bottom: -285px;
}

#dock{
  position: absolute;
  height: 40px;
  width: 100%;
  bottom: 0px;
  background: #000;
}

#dock .icon{
  cursor:pointer;
}

#dock #buttons{
  margin-top:2.5px;
}
#dock #startButton{
  border-left: 1px solid #FFF;
  border-right: 1px solid #FFF;
  padding-right: 10px;
  padding-left: 7px;
  height: 30px;
  display: inline-block;
  margin: 0 10px 0 9px;
}

.dockRight{
  position: absolute;
  width: 300px;
  margin-top: -35px;
  right: 0;
}

.dockRight.loggedOut{
  margin-top:0;
}

.dockRight>*{
  float: right;
  margin-right: 15px;
}

.dockRight #clock{
  color:#FFF;
  margin-right:15px;
  margin-top: 6px;
}

#loginBox{
  position: absolute;
  display:none;
  z-index: 2;
  bottom: 40px;
  left: 0px;
  background-color: #607d8b;
  box-shadow: 1px 3px 8px 0px rgba(0, 0, 0, 0.3);
  height: 190px;
  padding: 25px;
}

#loginBox input[type="text"], #loginBox input[type="password"] {
    width: 320px;
    height: 40px;
    padding: 7px;
    font-size: 16px;
    margin-bottom: 15px;
    border: none;
}

#notifications{
    position: absolute;
    bottom: 40px;
}
</style>
