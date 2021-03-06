import nacl from "tweetnacl";
import {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64
} from "tweetnacl-util";

var cry = function(){
    this.encodeBase64 = encodeBase64;
    this.symEncrypt = function(json, key){
      let keyHash = this.hash(key,'');
      keyHash = keyHash.slice(0, 32);
      //const keyUint8Array = decodeUTF8(keyHash);
      const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
      const str = JSON.stringify(json);
      const messageUint8 = decodeUTF8(str);
      const box = nacl.secretbox(messageUint8, nonce, keyHash);
      const fullMessage = new Uint8Array(nonce.length + box.length);
      fullMessage.set(nonce);
      fullMessage.set(box, nonce.length);
      const base64FullMessage = encodeBase64(fullMessage);
      return base64FullMessage;
    };
    this.symDecrypt = function(encrypted, key){
      let keyHash = this.hash(key,'');
      keyHash = keyHash.slice(0, 32);
      let messageWithNonceAsUint8Array;
      if(typeof encrypted === 'string')
        messageWithNonceAsUint8Array = decodeBase64(encrypted);
      else

        messageWithNonceAsUint8Array = encrypted;
      const nonce = messageWithNonceAsUint8Array.slice(0, nacl.secretbox.nonceLength);
      const message = messageWithNonceAsUint8Array.slice(
        nacl.secretbox.nonceLength,
        encrypted.length
      );
      const decrypted = nacl.secretbox.open(message, nonce, keyHash);
      if (!decrypted) {
        throw new Error("Could not decrypt message");
      }

      const base64DecryptedMessage = encodeUTF8(decrypted);
      return JSON.parse(base64DecryptedMessage);
    };

    this.asymEncrypt = function(json, pubKeyReceiver, secretKeySender){
        const newNonce = () => nacl.randomBytes(nacl.secretbox.nonceLength);

        const nonce = newNonce();
        const messageUint8 = decodeUTF8(JSON.stringify(json));
        const box = nacl.box(messageUint8, nonce, pubKeyReceiver, secretKeySender);

        const fullMessage = new Uint8Array(nonce.length + box.length);
        fullMessage.set(nonce);
        fullMessage.set(box, nonce.length);
        const base64FullMessage = encodeBase64(fullMessage);
        return base64FullMessage;
    };
    this.asymDecrypt = function(encrypted, senderPublicKey, receiverSecretKey){
      const messageWithNonceAsUint8Array = decodeBase64(encrypted);
      const nonce = messageWithNonceAsUint8Array.slice(0, nacl.secretbox.nonceLength);
      const message = messageWithNonceAsUint8Array.slice(
        nacl.secretbox.nonceLength,
        encrypted.length
      );

      const plaintext = nacl.box.open(message,
       nonce,
        senderPublicKey, 
        receiverSecretKey)

      const base64DecryptedMessage = encodeUTF8(plaintext);
      return JSON.parse(base64DecryptedMessage);
    };

    this.hybridEncrypt = function(json, pubKeyReceiver, pubKeySender, secretKeySender){
      //@sec
      //not sure if a key > 32bit makes sense here because of
      //keyHash = keyHash.slice(0, 32);
      const randomKey = nacl.randomBytes(128)

      const encryptedJSON = this.symEncrypt(json, randomKey);
      const encryptedRandomKeyReceiver = this.asymEncrypt(randomKey, pubKeyReceiver, secretKeySender);
      const encryptedRandomKeySender = this.asymEncrypt(randomKey, pubKeySender, secretKeySender);

      return encryptedRandomKeyReceiver+'\\n'+encryptedRandomKeySender+'\\n'+encryptedJSON;

    };
    this.hybridDecrypt = function(encrypted, senderPublicKey, receiverPublicKey, receiverSecretKey){

      const parts = encrypted.split('\n');
      const encrypedRandomKeyReceiver = parts[0];
      let self = this;
      let randomKey = false;

      //try first with sender key (parts[0]) than with reciever key (parts[1])
      try{
        randomKey = self.asymDecrypt(parts[0], 
          senderPublicKey,
          receiverSecretKey);
      }catch(e){
        console.log(e);
      }
      if(!randomKey)
      try{
        randomKey = self.asymDecrypt(parts[1],
          receiverPublicKey,
          receiverSecretKey);
      }catch(e){

        console.log(e);
      }

      if(randomKey){
        randomKey = Uint8Array.from(Object.values(randomKey));
      }else
        throw 'could not decrypt public key';
      return self.symDecrypt(parts[2], randomKey);


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
    this.encodeBase64 = encodeBase64;
    this.decodeBase64 = decodeBase64;
}

export default new cry();