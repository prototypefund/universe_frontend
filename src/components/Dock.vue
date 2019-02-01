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
    <div id="dock">
      <universeButton text="Login" :click="toggleLogin" v-if="!auth"></universeButton>
      <universeButton text="Apps"></universeButton>
    </div>
  </div>
</template>

<script>

import $ from 'jquery';
import UniverseButton from '@/components/UniverseButton'
import api from '../utils/api'
import cry from '../utils/crypto'
import { authBus } from '../main';


export default {
  name: 'Dock',
  components: {
    UniverseButton
  },
  data () {
    return {
      auth:false,
      username: '',
      password: ''
    }
  },
  methods: {
    login : function(){
      alert('Login!');
        const self = this;
        const username = this.username;
        api.get('user/getUserSalt/'+username,{
        },function(err,result,body){
          if(err){
            if(error.error == 'no_user_found')
              alert('No matching user found');
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
                self.auth = true;
              }
            });
          }
          
        });
    },
    toggleLogin : function(){
      $('#loginBox').slideToggle();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#dock{
  position: absolute;
  height: 40px;
  width: 100%;
  bottom: 0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
  background: #000;
}
#loginBox{
  position: absolute;
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
</style>
