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




function SignalProtocolStore() {
  this.store = {};
}

SignalProtocolStore.prototype = {
  getIdentityKeyPair: function() {
    return Promise.resolve(this.get('identityKey'));
  },
  getLocalRegistrationId: function() {
    return Promise.resolve(this.get('registrationId'));
  },
  put: function(key, value) {
    if (key === undefined || value === undefined || key === null || value === null)
      throw new Error("Tried to store undefined/null");
    this.store[key] = value;
  },
  get: function(key, defaultValue) {
    if (key === null || key === undefined)
      throw new Error("Tried to get value for undefined/null key");
    if (key in this.store) {
      return this.store[key];
    } else {
      return defaultValue;
    }
  },
  remove: function(key) {
    if (key === null || key === undefined)
      throw new Error("Tried to remove value for undefined/null key");
    delete this.store[key];
  },

  isTrustedIdentity: function(identifier, identityKey) {
    if (identifier === null || identifier === undefined) {
      throw new Error("tried to check identity key for undefined/null key");
    }
    if (!(identityKey instanceof ArrayBuffer)) {
      throw new Error("Expected identityKey to be an ArrayBuffer");
    }
    var trusted = this.get('identityKey' + identifier);
    if (trusted === undefined) {
      return Promise.resolve(true);
    }
    return Promise.resolve(util.toString(identityKey) === util.toString(trusted));
  },
  loadIdentityKey: function(identifier) {
    if (identifier === null || identifier === undefined)
      throw new Error("Tried to get identity key for undefined/null key");
    return Promise.resolve(this.get('identityKey' + identifier));
  },
  saveIdentity: function(identifier, identityKey) {
    if (identifier === null || identifier === undefined)
      throw new Error("Tried to put identity key for undefined/null key");
    return Promise.resolve(this.put('identityKey' + identifier, identityKey));
  },

  /* Returns a prekeypair object or undefined */
  loadPreKey: function(keyId) {
    var res = this.get('25519KeypreKey' + keyId);
    if (res !== undefined) {
      res = { pubKey: res.pubKey, privKey: res.privKey };
    }
    return Promise.resolve(res);
  },
  storePreKey: function(keyId, keyPair) {
    return Promise.resolve(this.put('25519KeypreKey' + keyId, keyPair));
  },
  removePreKey: function(keyId) {
    return Promise.resolve(this.remove('25519KeypreKey' + keyId));
  },

  /* Returns a signed keypair object or undefined */
  loadSignedPreKey: function(keyId) {
    var res = this.get('25519KeysignedKey' + keyId);
    if (res !== undefined) {
      res = { pubKey: res.pubKey, privKey: res.privKey };
    }
    return Promise.resolve(res);
  },
  storeSignedPreKey: function(keyId, keyPair) {
    return Promise.resolve(this.put('25519KeysignedKey' + keyId, keyPair));
  },
  removeSignedPreKey: function(keyId) {
    return Promise.resolve(this.remove('25519KeysignedKey' + keyId));
  },

  loadSession: function(identifier) {
    return Promise.resolve(this.get('session' + identifier));
  },
  storeSession: function(identifier, record) {
    return Promise.resolve(this.put('session' + identifier, record));
  },
  removeSession: function(identifier) {
    return Promise.resolve(this.remove('session' + identifier));
  },
  removeAllSessions: function(identifier) {
    for (var id in this.store) {
      if (id.startsWith('session' + identifier)) {
        delete this.store[id];
      }
    }
    return Promise.resolve();
  }
};




var KeyHelper = libsignal.KeyHelper;

var debug = console;



export default {  
  name: 'Registration',
  data () {

    return {
      showLoadingArea:false,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted:function(){






libsignal.SignalProtocolStore = SignalProtocolStore;
console.log(SignalProtocolStore);


var Crypt = function(){
  this.generateRegistrationId = function(){
    // just returns 0 will be changed to the userid when the key is stored later
    return 0
  }
  this.generateIdentity = function(cb){
    var self = this;
    KeyHelper.generateIdentityKeyPair().then(function(keyPair){
      cb(null,{
          'identityKeyPair': keyPair,
          'registrationId': self.generateRegistrationId()
        })
    });
  }


  /**
  * Generates Signed PreKey
  *
  * @async
  * @function generateSignedPreKey
  * @param {object} identity userid and identity key
  * @return {error<string>, signedPreKey} signed private and public preKey and signature
  */
  this.generatePreKey = function(preKeyId,cb){
    KeyHelper.generatePreKey(preKeyId).then(function(preKey){
        cb(null,preKey)
    })
  }

  /**
  * Generates Signed PreKey
  *
  * @async
  * @function generateSignedPreKey
  * @param {object} identity userid and identity key
  * @param {int} signedPreKeyId id of the key that will be generated
  * @return {error<string>, preKey}  private and public preKey
  */
  this.generateSignedPreKey = function(identity, signedPreKeyId, cb){
    KeyHelper.generateSignedPreKey(identity, signedPreKeyId).then(function(signedPreKey){
        cb(null,signedPreKey)
    })
  }


  this.generateUserKeys = function(){

  }
  this.storeUserKeys = function(){

  }
  this.generateKeyBundle = function(identityKey, preKey, signedPreKey){
            return {
                identityKey: identityKey.pubKey,
                registrationId : identityKey.Id, //equals identitykey
                preKey:  {
                    keyId     : preKey.Id,
                    publicKey : preKey.keyPair.pubKey
                },
                signedPreKey: {
                    keyId     : signedPreKey.Id,
                    publicKey : signedPreKey.keyPair.pubKey,
                    signature : signedPreKey.signature
                }
            };
  };
  this.test = function(){
    var self = this;
    debug.log('generating identity for Alice...');
    this.generateIdentity(function(error,identityAlice){
      if(error)
        debug.log(error)
      else{
        debug.log('... done:');
        debug.log(identityAlice);
        var signedPreKeyId = 1337;
        var preKeyId = 12;
        debug.log('generate signed preKey using alices identity..');
        self.generateSignedPreKey(identityAlice.identityKeyPair, signedPreKeyId,function(error, signedPreKey){

          if(error)
            debug.log(error);
          else{
            debug.log('... done:');
            debug.log(signedPreKey);

            debug.log('..generate unsigned prekeys');
            self.generatePreKey(preKeyId,function(error,preKey){
              if(error)
                debug.log('error');
              else{
                debug.log('...done');
                debug.log(preKey);


                debug.log('generated all the keys!');
                //preKey signedPreKey identity



              }
            });

          }


        });
      }
    });
  }
}

var crypt = new Crypt();
//crypt.test();
//die();


function generateIdentity(store) {
    return Promise.all([
        KeyHelper.generateIdentityKeyPair(),
        crypt.generateRegistrationId(),
    ]).then(function(result) {
      console.log(store);
        store.put('identityKey', result[0]);
        store.put('registrationId', result[1]);
    });
}

function generatePreKeyBundle(store, preKeyId, signedPreKeyId) {
    return Promise.all([
        store.getIdentityKeyPair(),
        store.getLocalRegistrationId()
    ]).then(function(result) {
        var identity = result[0];
        var registrationId = result[1];

        console.log('identity');
        console.log(identity);

        return Promise.all([
            KeyHelper.generatePreKey(preKeyId),
            KeyHelper.generateSignedPreKey(identity, signedPreKeyId),
        ]).then(function(keys) {
            var preKey = keys[0]
            var signedPreKey = keys[1];

            store.storePreKey(preKeyId, preKey.keyPair);
            store.storeSignedPreKey(signedPreKeyId, signedPreKey.keyPair);

            return {
                identityKey: identity.pubKey,
                registrationId : registrationId,
                preKey:  {
                    keyId     : preKeyId,
                    publicKey : preKey.keyPair.pubKey
                },
                signedPreKey: {
                    keyId     : signedPreKeyId,
                    publicKey : signedPreKey.keyPair.pubKey,
                    signature : signedPreKey.signature
                }
            };
        });
    });
}




/*Message Encryption and Decryption*/



var ALICE_ADDRESS = new libsignal.SignalProtocolAddress("xxxxxxxxxxxxx", 1);
var BOB_ADDRESS   = new libsignal.SignalProtocolAddress("xxxxxxxxxxxxx", 1);

    var aliceStore = new libsignal.SignalProtocolStore();

    var bobStore = new libsignal.SignalProtocolStore();
    var bobPreKeyId = 1337;
    var bobSignedKeyId = 1;
    var alicePreKeyId = 1338;
    var aliceSignedKeyId = 1;


        Promise.all([
            generateIdentity(aliceStore),
            generateIdentity(bobStore),
        ]).then(function() {
            return generatePreKeyBundle(aliceStore, alicePreKeyId, aliceSignedKeyId);
        }).then(function(preKeyBundle) {
            console.log('got preKeyBundle');
            console.log(preKeyBundle)

            var builder = new libsignal.SessionBuilder(bobStore, ALICE_ADDRESS);
            return builder.processPreKey(preKeyBundle).then(function() {
              
              console.log(aliceStore);

              var enc = new TextEncoder(); // always utf-8
              var msg = enc.encode("This is the message message message a");
              console.log(msg);

              console.log('non updated (?) store:');
              console.log(aliceStore);
              console.log(bobStore);
              var originalMessage = msg;
              var aliceSessionCipher = new libsignal.SessionCipher(aliceStore, BOB_ADDRESS);
              var bobSessionCipher = new libsignal.SessionCipher(bobStore, ALICE_ADDRESS);

              console.log('updated (?) store:');
              console.log(aliceStore);
              console.log(bobStore);


              bobSessionCipher.encrypt(originalMessage).then(function(ciphertext) {

                console.log('ciphertext');
                console.log(ciphertext);

                  // check for ciphertext.type to be 3 which includes the PREKEY_BUNDLE
                  return aliceSessionCipher.decryptPreKeyWhisperMessage(ciphertext.body, 'binary');

              }).then(function(plaintext) {


                var enc = new TextDecoder("utf-8");
                plaintext = enc.decode(plaintext);

                  console.log('pt');
                  console.log(plaintext);

              });

              
              bobSessionCipher.encrypt(originalMessage).then(function(ciphertext) {

                  return aliceSessionCipher.decryptWhisperMessage(ciphertext.body, 'binary');

              }).then(function(plaintext) {

                  assertEqualArrayBuffers(plaintext, originalMessage);

              });
              

            });
        });















    //cry.generateUserKeys();
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
