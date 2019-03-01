<template>
    <div class="notification" v-if="show">
            <div class="messageMain">
                <userPicture :userid="1" size="20"></userPicture>
                {{text}}
            </div>
            <div class="messageButton">
            <universeButton :text="acceptButton.text" :click="acceptButton.callback"></universeButton>
            <universeButton :text="denyButton.text" :click="denyButton.callback" :anti="true"></universeButton>
            </div>
        </div>
</template>

<script>

import { alertBus } from '../../main';
import user from '@/utils/user'
import request from '@/utils/request'
import buddylist from '@/utils/buddylist'
import UniverseButton from '@/components/gui/UniverseButton'
import UserPicture from '@/components/gui/UserPicture'
export default {
  name: 'Notification',
  props: ['type','notification'],
  components: {
    UniverseButton,
    UserPicture
  },

  data () {
    return {
      text:'',
      userid:0,
      acceptButton:{
        text:'accept',
        callback:()=>{}
      },
      denyButton:{
        text:'deny',
        callback:()=>{}
      },
      show:true
    }
  },
  methods: {
    hide:function(){
      console.log('hide');
      this.show = false
      console.log(this.show)
    }
    
  },
  mounted: function () {

    let self = this;
    if(this.type == 'request'){
      this.text = this.notification;
      if(this.notification.type == 'buddy'){
        let self = this;
        user.getInfo(this.notification.user_b)
        .then(function(info){
          self.userid = self.notification.user_b;
          self.text = info.username+' wants to be your buddy';
          self.acceptButton = {
              text:'accept',
              callback:()=>{
                buddylist.addBuddy(self.notification)
                .then(()=>{
                        alertBus.$emit('alert', {
                          text:'Friendrequest accepted'
                        });
                        self.hide();
                })
                .catch((e)=>{
                        alertBus.$emit('alert', {
                          text:'There was an error accepting the friend request'
                        });
                        self.hide();
                });
              }
          },
          self.denyButton = {
              text:'delete',
              callback:()=>{
                request.delete(self.notification.id)
                .then((result)=>{
                          alertBus.$emit('alert', {
                            text:'Friendrequest deleted'
                          });
                          self.hide();
                })
              }
          }

        });
      }

    }
  },

}
</script>

<style scoped>
.notification{
  background-color: #263238;
    box-shadow: 1px 3px 8px 0px rgba(0, 0, 0, 0.3);
    width: 310px;
    max-height: 120px;
    color: #FFF;
    padding: 10px;
    font-size: 20px;
    margin-top: 1px;
    margin-left: 1px;
}
.messageButton {
    margin-top: 10px;
    height: 44px;
}

.notification .userpicture {
  display:inline-block;
    margin-right: 5px;;
}
</style>
