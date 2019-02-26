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
	   </div>
	</div>
</template>
<script>
import UniverseButton from '@/components/gui/UniverseButton'
import api from '@/utils/api'

export default {
  name: 'Settings',
  components:{
    UniverseButton
  },
  

  data () {
    return {
      name:'',
    }
  },
  methods:{
    submit:function(){
      
    }
  },
  created:function(){
  }
}
</script>