<template>
          <div class="guestArea">
            <img src="img/guest/guest_header.svg" id="headerIMG">
            <p id="subHeader">Welcome to the universeOS – the first social webOS</p>
            <div class="guestBox registerBox">
                <h2>Sign Up</h2>
                <div class="pull-left">
                    <form id="registrationForm" v-on:submit.prevent="submitRegistration">
                      <input  type="text"placeholder="Your Username" v-model="username" v-on:change="onRegistrationType">

                      <span v-if="this.showErrors.indexOf('username') > -1" id="checkUsernameStatus" class="regError">
                        <a>&nbsp;to short</a>
                        <div class="arrow-right"></div>
                      </span>


                      <input type="password" id="password" placeholder="Your Password" v-model="password" v-on:type="onRegistrationType">

                      <span v-if="this.showErrors.indexOf('password_strength') > -1&&!ignorePasswordCheck" class="regError">
                        <a>{{passwordError}}</a>
                        <a class="closeError" @click="ignorePasswordCheck = true">×</a>
                        <div class="arrow-right"></div>
                      </span>


                      <input type="password" style="margin-bottom:15px;" v-model="passwordRepeat" placeholder="Repeat Password" v-on:change="onRegistrationType" required>
                      <span v-if="this.showErrors.indexOf('password_missmatch') > -1" class="regError">
                        <a>The passwords don't match</a>
                        <div class="arrow-right"></div>
                      </span>

                      <div class="checkboxContainer">
                        <span><input type="checkbox" v-model="terms">
                          <label for="checkTerms">I accept the <a href="http://wiki.transparency-everywhere.com/en/index.php/Policy" target="_blank">terms</a></label>
                        </span>
                      </div>
                      <span v-if="this.showErrors.indexOf('terms') > -1" class="regError terms">
                        <a>You have to accept the terms</a>
                        <div class="arrow-right"></div>
                      </span>

                      <div class="checkboxContainer">
                        <span><input type="checkbox" v-model="uploadPrivateKey">
                          <label for="checkTerms">Upload private key</label>
                        </span>
                      </div>




                      <universeButton text="Sign me up!" :click="submitRegistration" style="float: right;margin-top: -27px;margin-right: 0px;"></universeButton>
                    </form>
                </div>
                <img v-if="showLoadingArea" src="~@/assets/gfx/loading-bubbles.svg" width="150" height="150">
            </div>
          </div>
</template>

<script>
import UniverseButton from '@/components/gui/UniverseButton'
import cry from '../utils/crypto'
import api from '../utils/api'


import $ from 'jquery';

import {alertBus} from '@/main';  
export default {  
  name: 'Registration',
  data () {

    return {
      showLoadingArea:false,
      username: '',
      password: '',
      passwordRepeat: '',
      showErrors:[],
      passwordError:'',
      ignorePasswordCheck:false,
      terms:false,
      uploadPrivateKey:true,
      registrationSubmitted:false
    }
  },
  mounted:function(){

    //cry.generateUserKeys();
  },
  methods: {
    checkPasswordStrength(password){

                // Do not show anything when the length of password is zero.
                if (password.length === 0) 
                    return 0;
                // Create an array and push all possible values that you want in password
                var matchedCase = new Array();
                matchedCase.push("[$@$!%*#?&]"); // Special Charector
                matchedCase.push("[A-Z]");      // Uppercase Alpabates
                matchedCase.push("[0-9]");      // Numbers
                matchedCase.push("[a-z]");     // Lowercase Alphabates

                // Check the conditions
                var ctr = 0;
                for (var i = 0; i < matchedCase.length; i++) {
                    if (new RegExp(matchedCase[i]).test(password)) {
                        ctr++;
                    }
                }

                //add password length
                ctr = parseInt(ctr)+Math.round(password.length/15);

                return ctr;
    },
    submitRegistration(){
      this.registrationSubmitted = true;
      this.checkRegistrationInput()
      if(this.showErrors.length == 0){
        let userKeys = cry.generateUserKeys(this.password);

        let self = this;
        api.post('user/createUser',{
          username:this.username,
          userKeys:userKeys 
        },function(err,result){
          if(err){
            alertBus.$emit('alert', {
              text:err
            });
          }
          else{
            alertBus.$emit('alert', {
              text:'Welcome '+self.username
            });
            $('.guestArea').slideUp();
          }
          
        });
      }
    },
    onRegistrationType(){
      /*
      is called if user types in a field within the registration that is checked within checkRegistration()
      it is called on each key input after the first
      submittion try of the registration form
      */

      if(this.registrationSubmitted)
        this.checkRegistrationInput();
    },
    checkRegistrationInput(){
      //check if username is empty
      if(this.username.length < 3){
        this.usernameError = 'The username is to short';
        if(this.showErrors.indexOf('username') == -1)
          this.showErrors.push('username');
      }

      else if (this.showErrors.indexOf('username') !== -1)
        this.showErrors.splice(this.showErrors.indexOf('username'), 1);

      //check if passwords match
      if(this.password != this.passwordRepeat){
        if(this.showErrors.indexOf('password_missmatch') == -1)
          this.showErrors.push('password_missmatch');
      }
      else if (this.showErrors.indexOf('password_missmatch') !== -1) 
        this.showErrors.splice(this.showErrors.indexOf('password_missmatch'), 1);

      //check if terms are accepted
      if(!this.terms){
        if(this.showErrors.indexOf('terms') == -1)
          this.showErrors.push('terms');
      }
      else if (this.showErrors.indexOf('terms') !== -1) 
        this.showErrors.splice(this.showErrors.indexOf('terms'), 1);

      //check password strengh if user didn't disable it
      if(!this.ignorePasswordCheck){
        let password_strength = this.checkPasswordStrength(this.password);
        if(!password_strength)
          password_strength = 0;

        if(password_strength <2){
          if (this.showErrors.indexOf('password_strength') == -1) 
            this.showErrors.push('password_strength');
          
          this.passwordError = 'Uh-Oh! Your Granma could crack that password!'
        }
        else if(password_strength < 4){
          if (this.showErrors.indexOf('password_strength') == -1) 
            this.showErrors.push('password_strength');

          this.passwordError = 'Come on! Thats not a good password'
        }else if(password_strength >= 4){
          this.passwordError = '';
          if (this.showErrors.indexOf('password_strength') !== -1) this.showErrors.splice(this.showErrors.indexOf('password_strength'), 1);
        }
      }else{
        if(this.showErrors.indexOf('password_strength') > -1)
          this.showErrors.splice(this.showErrors.indexOf('password_strength'), 1);
      }
      

      console.log(this.showErrors);

    }
  },
  components: {
    UniverseButton
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.guestArea{
  margin-left:10px;
}

#headerIMG{
  width: 360px;
  margin-bottom: 25px;
  display: block;
  margin: 25px 0;
}

#subHeader {
  width: 910px;
  display: block;
  margin-bottom: 25px;
  color: #FFF;
  font-size: 38px;
}

.guestBox.registerBox {
  background-color: #607d8b;
}

.guestBox{
  position:absolute;
  z-index:1;
  background-color: #37474f;
  width: 335px;
  float: left;
  color: #FFF;
  margin-bottom: 10px;
  overflow: auto;
  padding: 25px;
}

.checkboxContainer:first-of-type{
  margin-top:0;
}
.checkboxContainer{
  margin: 7px 0;
  clear: both;
  float: left;
}

.guestBox h2{
  margin:0;
}

.guestBox input[type="text"], .guestBox input[type="password"] {
  width: 280px;
  height: 40px;
  margin: 15px 0;
  border: none;
  padding: 7px;
}

.guestBox input {
  clear: both;
  display: block;
}

.regError {
  position: fixed;
  margin-top: -50px;
  height: 30px;
  line-height: 30px;
  color: #FFF !important;
  padding-right: 5px;
  text-align: left;
  width: auto;
  margin-left: 288px;
  display: inline;
  background: rgb(121, 1, 37);
}
.regError > * {
  color: #FFF;
}

.regError .closeError{
    position: absolute;
    cursor: pointer;
    top: -16px;
    right: -6px;
}

.arrow-right {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: 15px solid #790125;
    margin-left: -14px;
    float: left;
    padding: 0;
}

.regError.terms{
  margin-top: 1.5px;
  margin-left: 160px;
}

#registrationForm input[type="checkbox"]{
    display: inline-block;
    height: 13px;
    margin-right: 5px;
}
</style>
