<template>
          <div class="guestArea">
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

                      <span v-if="this.showErrors.indexOf('password_strength') > -1" class="regError">
                        <a>{{passwordError}}</a>
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




                      <universeButton text="Sign me up!" :click="submitRegistration" style="float: right;margin-right: 15px;margin-top: -8px;"></universeButton>
                    </form>
                </div>
                <img v-if="showLoadingArea" src="~@/assets/gfx/loading-bubbles.svg" width="150" height="150">
            </div>
          </div>
</template>

<script>
import UniverseButton from '@/components/UniverseButton'
import cry from '../utils/crypto'
cry.test();

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
        var userKeys = cry.generateAsymKeys();
        console.log(userKeys);
        alert('submit registration now!');
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

      var password_strength = this.checkPasswordStrength(this.password);
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
.guestBox.registerBox {
    background-color: #607d8b;
}

.guestBox{
  background-color: #37474f;
  box-shadow: 1px 3px 8px 0px rgba(0, 0, 0, 0.3);
  width: 365px;
  float: left;
  color: #FFF;
  margin-bottom: 10px;
  overflow: auto;
  padding: 20px 20px;
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
  width: 320px;
  height: 40px;
  margin: 15px 0;
  border: none;
  padding: 0 15px;
}

.guestBox input {
  clear: both;
  display: block;
}

.regError {
  position: absolute;
  background-color: #790125;
  margin-top: -50px;
  height: 30px;
  line-height: 30px;
  color: #FFF !important;
  padding-right: 5px;
  text-align: left;
  width: auto;
  margin-left: 353px;
  display: inline;
  background: rgb(121, 1, 37);
}
.regError > * {
  color: #FFF;
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
  margin-top: 3px;
  margin-left:20px;
}

#registrationForm input[type="checkbox"]{
    display: inline-block;
    height: 9px;
}
</style>
