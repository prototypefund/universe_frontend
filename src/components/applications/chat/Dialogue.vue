<template>
    <div class="dialogueFrame">
        <header>
          <span>{{user.username}}</span>          
        </header>
        <div class="dialogue">
          <ul>
            <li v-for="message in messages">
              <span class="username">{{user.username}}</span>
              <span class="message">{{message}}</span>
            </li>
          </ul>
        </div>
        <footer>
          <form v-on:submit.prevent="submit" autocomplete="off">
            <input type="text" placeholder="type a message..." name="message" class="input border-radius chatInput pull-right" style="" v-model="message">
          </form>
        </footer>
      </div>
</template>
<script>


import user from '@/utils/user'
import cry from '@/utils/crypto'
import api from '@/utils/api'


let im = new function(){
  this.getKey = function(userid){
    return new Promise((resolve,reject)=>{
      api.get('user/'+userid+'/getKey',{},function(err,result,body){
        if(err){
          reject(err);
        }
        resolve(body)
      });
    });
  }
  this.getMessages = function(userid){
    return new Promise((resolve,reject)=>{
      api.get('user/'+userid+'/getMessages',{},function(err,result,body){
        if(err){
          reject(err);
        }
        resolve(body)
      });
    });
  }
  this.sendMessage = function(user, message){
    return new Promise((resolve,reject)=>{

      //get receiver key
      im.getKey(user.id)
      .then((receiverKey)=>{

        im.getKey(localStorage.userid)
        .then((senderKey)=>{
          //decrypt sender secret key and transform to 8 bit unsigned int
          let senderSecretKey = Uint8Array.from(Object.values(cry.symDecrypt(senderKey.secret_key, localStorage.password)));

          //encrypt message and transform to base64
          let encryptedMessage = cry.asymEncrypt(message,cry.decodeBase64(receiverKey.public_key), senderSecretKey);

          api.post('user/'+user.id+'/sendMessage',{message:encryptedMessage},function(err,result,body){
            if(err){
              reject(err);
            }
            resolve(body)
          });

        }).catch((e)=>{

        });

      })
      .catch((e)=>{

      });

    });
  }
}


export default {
  name: 'Dialogue',
  

  data () {
    return {
      messages:[],
      message:''
    }
  },
  props:['user'],
  methods:{
    loadMessages:function(){

      //get receiver key
      im.getKey(localStorage.userid)
      .then((receiverKey)=>{

        im.getKey(this.user.id)
        .then((senderKey)=>{

          //decrypt sender secret key and transform to 8 bit unsigned int
          let receiverSecretKey = Uint8Array.from(Object.values(cry.symDecrypt(receiverKey.secret_key, localStorage.password)));

          console.log('receiverSecretKey');
          console.log(receiverSecretKey);

          im.getMessages(this.user.id)
          .then((result)=>{
            console.log('['+result.filecontent.slice(0,-1)+']');
            let decryptedMessages = JSON.parse('['+result.filecontent.slice(0,-2)+']');
            for(let i in decryptedMessages){
              console.log(decryptedMessages[i])
              let plaintext = cry.asymDecrypt(decryptedMessages[i], cry.decodeBase64(senderKey.public_key), receiverSecretKey);
              console.log(plaintext);
            }
          });
        })
        .catch((e)=>{

        });
      });
    },
    submit:function(e){

      im.sendMessage(this.user, this.message)
      .then(function(result){
        console.log(result);
      })
      .catch(function(error){
        console.log(error)
      });
        /*
        cry.test()


        e.preventDefault();
        this.messages.push(this.message);
        this.message = '';*/
    }
  },
  created:function(){
    this.loadMessages();
  }
}
</script>
<style>
.dialogueFrame header {
  top:0;
  right: 0;
  left: 0;
  position:absolute;
  height: 50px;
  border-bottom: 1px solid #dcdcdc;
  padding: 11px;
}
.dialogueFrame .dialogue{
  position:absolute;
  top:50px;
  bottom:60px;
  overflow:auto;
}
.dialogueFrame footer {
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  height: 60px;
  border-top: 1px solid #dcdcdc;
  padding: 10px;
}

.dialogue ul li{
    margin-top: 15px; 
    padding: 10px;
    padding-bottom: 10px;     
    -moz-user-select: text;    
    -webkit-user-select: text;
}

.dialogue ul li .username{
  position:absolute;
  margin-top:-15px;
  font-size:10px;
}

.dialogue ul li .message{
  font-size:16px;
}

</style>