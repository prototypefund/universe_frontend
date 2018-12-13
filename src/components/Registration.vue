<template>
          <div class="guestArea">
            <img src="~@/assets/gfx/guest/guest_header.svg" alt="universe" id="header">
            <div class="guestBox registerBox">
                <h2>Sign Up</h2>
                <div class="pull-left">
                    <form id="registrationForm">
                    <input type="text" id="regUsername" placeholder="Your Username" class="checkReg">
                    <span id="checkUsernameStatus" class="regError">
                      <a>&nbsp;to short</a>
                      <div class="arrow-right"></div>
                    </span>
                    <input type="password" id="password" placeholder="Your Password" class="checkReg">
                    <span id="checkPasswordStatus" class="regError" style="display: inline; background: rgb(121, 1, 37);">
                      <a>Uh-Oh! My mom could crack that password!</a>
                      <div class="arrow-right" style="border-right: 15px solid rgb(121, 1, 37);"></div>
                    </span>
                    <input type="password" style="margin-bottom:15px;" id="passwordRepeat" placeholder="Repeat Password" class="checkReg">
                    <span styel="display: inline-block;padding-top: 10px"><input type="checkbox" style="display: inline-block;" class="checkRegBox" name="checkTemrs">
                      <label for="checkTerms">I accept the <a href="http://wiki.transparency-everywhere.com/en/index.php/Policy" target="_blank">terms</a></label>
                    </span>
                    <input type="hidden" value="" id="checkReg">
                    <universeButton text="Sign me up!" :click="register_user"></universeButton>
                    </form>
                </div>
                <img v-if="showLoadingArea" src="~@/assets/gfx/loading-bubbles.svg" width="150" height="150">
            </div>
          </div>
</template>

<script>

import UniverseButton from '@/components/UniverseButton'

var debug = console;

var cry = new function(){

  /* KEY STORING */
  this.publicStore = {},
  this.secureStore = {},
  this.put = function(key, value) {
    if (key === undefined || value === undefined || key === null || value === null)
      throw new Error("Tried to store undefined/null");
    this.publicStore[key] = value;
  },
  this.putSecure = function(key, value) {
    if (key === undefined || value === undefined || key === null || value === null)
      throw new Error("Tried to store undefined/null");
    this.secureStore[key] = value;
  },
  this.storePreKey = function(keyId,keyPair) {
    this.put('25519KeypreKey' + keyId, keyPair)
  }
  this.storeIdentityKeypair = function(userIdentifier, identityKeyPair){
    this.put('IdentityPubKey'+userIdentifier, identityKeyPair.pubKey);
    this.putSecure('IdentityPrivKey'+userIdentifier, identityKeyPair.privKey);
  }

  /* preKeyGeneration */

  this.generateSignedPreKey = function(keyId,identityKeyPair, cb){
        debug.log('generate signed prekey '+keyId+'...');
        libsignal.KeyHelper.generateSignedPreKey(identityKeyPair, keyId).then(function(signedPreKey) {
            debug.log('...done: ',signedPreKey);
            cb(signedPreKey);
        });
  };
  this.generateUserKeys = function(userIdentifier,cb){
    var self = this;
    var signal = libsignal;
    var KeyHelper = signal.KeyHelper;

    debug.log('start generating user keys');
    debug.log('generate registration id...');
    var registrationId = KeyHelper.generateRegistrationId();
    // Store registrationId somewhere durable and safe.
    debug.log('...done: ',registrationId);

    debug.log('generate identityKeyPair...');

    KeyHelper.generateIdentityKeyPair().then(function(identityKeyPair) {
        // keyPair -> { pubKey: ArrayBuffer, privKey: ArrayBuffer }
        // Store identityKeyPair somewhere durable and safe.
        
        debug.log('... done', identityKeyPair);
        var keyId = 1;
        self.generateSignedPreKey(keyId,identityKeyPair,function(signedPreKey){
            self.storePreKey(signedPreKey.keyId, signedPreKey.keyPair);
            console.log(self.publicStore);
        })
    });

    /*var keyId = 10;
    
    KeyHelper.generatePreKey(keyId).then(function(preKey) {
        self.storePreKey(preKey.keyId, preKey.keyPair);
        console.log(self.publicStore);
    });*/
    // Register preKeys and signedPreKey with the server

  };
}

export default {  
  name: 'Registration',
  data () {

    return {
      showLoadingArea:false,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted:function(){

    cry.generateUserKeys();
  },
  methods: {
    register_user(){
      console.log('start registration');
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
  height: 270px;
  float: left;
  color: #FFF;
  margin-bottom: 10px;
  overflow: auto;
  padding: 15px 20px;
}

.guestBox input[type="text"], .guestBox input[type="password"] {
  width: 320px;
  height: 40px;
  margin-top: 10px;
  border: none;
}

.guestBox input {
  clear: both;
  display: block;
}

.regError {
  display: none;
    position: absolute;
    background-color: #790125;
    margin-top: -35px;
    height: 30px;
    line-height: 30px;
    color: #FFF !important;
    padding-right: 5px;
    text-align: left;
    width: 320px;
    margin-left: 325px;
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
</style>
