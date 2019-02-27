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
        this.userid = this.notification.user_b;
        this.text = this.notification.user_b+' wants to be your buddy';
        this.acceptButton = {
            text:'accept',
            callback:()=>{
              buddylist.addBuddy(this.notification)
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
        this.denyButton = {
            text:'delete',
            callback:()=>{
              user.deleteFriendRequest(this.notification.id)
          .then((result)=>{
                    alertBus.$emit('alert', {
                      text:'Friendrequest deleted'
                    });
          })
          .catch((e)=>{
                    alertBus.$emit('alert', {
                      text:'There was an error deleting the friend request'
                    });

          });
            }
        }
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
