<template>
	<div>
	   <ul>
	   	<li v-for="buddy in buddies">
	   		<span>
	   			<userPicture :userid="1" size="40"></userPicture>
	   		</span>
	   		<span>
	   			Juergen Vogel
	   		</span>
	   		<a href="#" onclick="User.showProfile('2194'); return false" title="open Profile"><span class="icon icon-user"></span></a>
	   		<a href="#" onclick="im.openDialogue('tusk'); return false" title="write Message"><span class="icon icon-envelope"></span></a>
	   		<a href="#" onclick="settings.showUpdateBuddylistForm(); return false" title="write Message"><span class="icon dark-gear"></span></a>
	   	</li>
	   </ul>
	</div>
</template>
<script>
import UniverseButton from '@/components/gui/UniverseButton'
import UserPicture from '@/components/gui/UserPicture'
import api from '@/utils/api'
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