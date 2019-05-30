<template>
	<div>
	   <div class="leftNav dark">
      <ul>
         <li class="active"><span class="icon blue-gear"></span><span class="icon white-gear white"></span>General</li>
         <li><span class="icon blue-eye"></span><span class="icon white-eye white"></span>Privacy</li>
         <li><span class="icon blue-user"></span><span class="icon white-user white"></span>Buddylist</li>
         <li><span class="icon blue-group"></span><span class="icon white-group white"></span>Groups</li>
         <li><span class="icon blue-lock"></span><span class="icon white-lock white"></span>Security</li>
      </ul>
	   </div>
	   <div class="contentMain">
	   		<h2>Update Profile</h2>


        <div class="buddylist">
          <h2>Buddylist</h2>
          <ul>
          <li v-for="buddy in buddies">
            <div class="userpicture">
              <userPicture :userid="buddy.id" size="40"></userPicture>
            </div>
            <div class="username">
            {{buddy.username}}
            </div>
            <div class="buttons">
              <UniverseButton text="Delete" :click="function(){deleteBuddy(buddy.id)}"></UniverseButton>
              <!--<a href="#" onclick="settings.showUpdateBuddylistForm(); return false" title="write Message"><span class="icon dark-gear"></span></a>-->
            </div>
          </li>
        </ul>
      </div>

	   </div>
	</div>
</template>
<script>

import UserPicture from '@/components/gui/UserPicture'
import UniverseButton from '@/components/gui/UniverseButton'
import buddylist from '@/utils/buddylist'
import api from '@/utils/api'

export default {
  name: 'Settings',
  components:{
    UserPicture,
    UniverseButton
  },
  

  data () {
    return {
      name:'',
      buddies:[]
    }
  },
  methods:{
    deleteBuddy:function(userid){
      buddylist.deleteBuddy(userid).then(function(){
        console.log('done');
      })
    },
    submit:function(){
      
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
  width:70px;
}
.buddylist ul li div.buttons a{
  float:left;
}
</style>