<template>
    <div class="buddylist">
      <ul>
        <li v-for="buddy in buddies">
          <div class="userpicture">
            <userPicture :userid="buddy.id" size="40"></userPicture>
          </div>
          <div class="username">
          {{buddy.username}}
          </div>
          <div class="buttons">
            <a href="#" onclick="User.showProfile(buddy.id); return false" title="open Profile"><span class="icon icon-user"></span></a>
            <a href="#" @click="openChat(buddy.id)" title="write Message"><span class="icon icon-envelope"></span></a>
            <!--<a href="#" onclick="settings.showUpdateBuddylistForm(); return false" title="write Message"><span class="icon dark-gear"></span></a>-->
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
import {applicationBus} from '@/main'

import UniverseButton from '@/components/gui/UniverseButton'
import UserPicture from '@/components/gui/UserPicture'
import buddylist from '@/utils/buddylist'

export default {
  name: 'Buddylist',

  components:{
    UniverseButton,
    UserPicture
  },
  data () {
    return {
      buddies:[],
    }
  },
  methods:{
    openChat:function(buddy){
      let action = {
        type:'openChat',
        data:{userid:buddy}
      }
      applicationBus.$emit('chat', action);
    }
  },
  created:function(){
    buddylist.get().then((buddylist)=>{
        this.buddies = buddylist.buddylist;
    });

  }
}
</script>
<style scoped>
.buddylist ul{
  width:100%;
}

.buddylist ul li{
  clear:both;
}

.buddylist ul li div{
  float:left;
  margin:5px;
}
.buddylist ul li div.userpicture{
  width:45px;
}
.buddylist ul li div.username{
    font-size: 27px;
    padding: 9px 0;
    width: 100px;
}
.buddylist ul li div.buttons{
  padding: 9px 0;
  float:right;
  width:70px;
}
.buddylist ul li div.buttons a{
  float:left;
}
</style>