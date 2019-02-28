<template>
  <tabs>
    <tab name="Home" :selected="true">
      <div>
        <center>
            <span class="icon blue-comment" style="height: 90px;width: 90px; margin-top:5px;margin-right: -17px;"></span>
            <h2 style="margin-top:0;">Chat</h2>
            <h3>Click on a user in your buddylist to open a dialogue</h3>
        </center>
      </div>
    </tab>
  </tabs>
</template>
<script>
import UniverseButton from '@/components/gui/UniverseButton'
import api from '@/utils/api'

import Tabs from '@/components/gui/Tabs'
import Tab from '@/components/gui/Tab'

export default {
  name: 'Chat',
  components:{
    UniverseButton,
    Tabs,
    Tab
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