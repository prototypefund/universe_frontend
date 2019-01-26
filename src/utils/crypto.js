import nacl from "tweetnacl";
import {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64
} from "tweetnacl-util";


var cry = function(){

    this.symEncrypt = function(json, key){
      let keyHash = this.hash(key,'');
      console.log('keyHash');
      console.log(keyHash = keyHash.slice(0, 32));
      console.log(keyHash.length);



      //const keyUint8Array = decodeUTF8(keyHash);
      const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
      const messageUint8 = decodeUTF8(JSON.stringify(json));
      const box = nacl.secretbox(messageUint8, nonce, keyHash);

      const fullMessage = new Uint8Array(nonce.length + box.length);
      fullMessage.set(nonce);
      fullMessage.set(box, nonce.length);

      const base64FullMessage = encodeBase64(fullMessage);
      return base64FullMessage;
    };

    //password is used to encrypt secretKey
    this.generateUserKeys = function(password){

        const keyPair = nacl.box.keyPair();
        //@sec for debugging purpose

        //generate random salt for hashing the password
        const randomSalt = 'asdagskdhasdad';

        //hash password
        const passwordHash = this.hash(password,randomSalt);

        const encryptedSecretKey = this.symEncrypt(keyPair.secretKey,password);
        
        const encryptedSalt = this.symEncrypt(randomSalt,password);
        

        return {
          publicKey:encodeBase64(keyPair.publicKey),
          encryptedSecretKey:encryptedSecretKey,
          encryptedSalt:encryptedSalt,
          passwordHash:encodeBase64(passwordHash)
        }
    }
    this.test = function(){
        const keyAlice = nacl.box.keyPair();
        const keyBob = nacl.box.keyPair();
        console.log(nacl);

        const newNonce = () => nacl.randomBytes(nacl.secretbox.nonceLength);

          var json = {'key':'this is the value'};
          const nonce = newNonce();
          const messageUint8 = decodeUTF8(JSON.stringify(json));
          const ciphertext = nacl.box(messageUint8, nonce, keyBob.publicKey, keyAlice.secretKey);

          console.log('box:')
          console.log(ciphertext);

          const plaintext = nacl.box.open(ciphertext, nonce, keyAlice.publicKey, keyBob.secretKey)
          console.log(encodeUTF8(plaintext));

    };
    this.hash = function(string, salt){
      //@sec for debugging purpose
      //return string+'_'+salt;
      return nacl.hash(decodeUTF8(string+salt));

    };
}

export default new cry();