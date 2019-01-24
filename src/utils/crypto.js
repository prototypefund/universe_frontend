import nacl from "tweetnacl";
import {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64
} from "tweetnacl-util";


var cry = function(){
    this.generateAsymKeys = function(){
        const keyPair = nacl.box.keyPair();
        return keyPair;
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

    }
}

export default new cry();