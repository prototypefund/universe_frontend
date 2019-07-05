<template>
    <div class="dialogueFrame">
        <header>
          <span>{{user.username}}</span>          
        </header>
        <div class="dialogue">
          <ul>
            <li v-for="message in messages"  v-bind:class="{ out: message.author!=userid }">
              <div  v-bind:class="{ out: message.author!=userid }">
                <span class="username" v-if="message.author==userid">{{user.username}}</span>
                <span class="username" v-if="message.author!=userid">{{authorinfo.username}}</span>
                <div class="message in" v-if="message.author==userid">{{message.message}}</div>
                <div class="message out" v-if="message.author!=userid">{{message.message}}</div>
              </div>
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

          message = {
            message:message,
            author:localStorage.userid,
            timestamp: new Date().toString()
          }


          //encrypt message and transform to base64
          let encryptedMessageNew = cry.hybridEncrypt(message,cry.decodeBase64(receiverKey.public_key),cry.decodeBase64(senderKey.public_key), senderSecretKey);


          let encryptedMessage = cry.asymEncrypt(message,cry.decodeBase64(receiverKey.public_key), senderSecretKey);

          api.post('user/'+user.id+'/sendMessage',{message:encryptedMessageNew},function(err,result,body){
            if(err){
              reject(err);
            }
            resolve(message,body)
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
      userid:0,
      message:'',
      authorinfo:{}
    }
  },
  props:['user'],
  methods:{
    loadMessages:function(){
      let self = this;
      //get receiver key
      im.getKey(localStorage.userid)
      .then((receiverKey)=>{

        im.getKey(this.user.id)
        .then((senderKey)=>{

          //decrypt sender secret key and transform to 8 bit unsigned int
          let receiverSecretKey = Uint8Array.from(Object.values(cry.symDecrypt(receiverKey.secret_key, localStorage.password)));

          im.getMessages(this.user.id)
          .then((result)=>{

            function pushMessages(file){
              let encryptedMessages = JSON.parse('['+file.filecontent.slice(0,-2)+']');
              for(let i in encryptedMessages){
                let symEncrypted = encryptedMessages[i];
                //here somewhere is the error=>
                let plaintext = cry.hybridDecrypt(encryptedMessages[i], cry.decodeBase64(senderKey.public_key), [],receiverSecretKey);

                self.messages.push(plaintext);
              }
            }
            pushMessages(result[0]);
            pushMessages(result[1]);
            self.messages.sort(function(a,b){
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(b.timestamp) - new Date(a.timestamp);
            });
          });
        })
        .catch((e)=>{

        });
      });
    },
    submit:function(e){
      let self = this;
      im.sendMessage(this.user, this.message)
      .then(function(messageObj,result){
        //push sent message to messages array
        self.messages.push(messageObj);
        self.message = '';
      })
      .catch(function(error){
        console.log(error)
      });
    }
  },
  created:function(){
    this.loadMessages();
    this.userid = localStorage.userid;
    let self = this;
    user.getInfo(localStorage.userid).
    then(function(userinfo){
      self.authorinfo = userinfo;
      console.log(userinfo);
    }).catch((e)=>{
      console.log(e);
    })
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
  position: absolute;
  top: 50px;
  right: 0;
  bottom: 60px;
  left: 0;
  overflow: auto;
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
    padding: 10px;
    padding-bottom: 10px;     
    -moz-user-select: text;    
    -webkit-user-select: text;
}

.dialogue ul li .username{
  position: absolute;
  margin-top: -15px;
  font-size: 10px;
}

.dialogue ul li .message{
  font-size:16px;
  padding:15px;
  border:1px solid #c9c9c9;
  border-radius:5px;
  margin-top:15px;
}
.dialogue ul li.out{
  margin-left:50px;
}

</style>