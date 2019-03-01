<template>
    <form class="universeForm">
      <div class="row">
        <label>Title</label>
        <input type="text" placeholder="Title" v-model="name">
      </div>
      <div class="row">
        <PrivacySelector :privacy="privacy"></PrivacySelector>
      </div>
      <div class="row">
        <UniverseButton text="Create Directory" :click="submit" style="float: right;"></UniverseButton>
      </div>
    </form>
</template>

<script>
import UniverseButton from '@/components/gui/UniverseButton'
import PrivacySelector from '@/components/gui/PrivacySelector'
import api from '@/utils/api'
import { modalBus, applicationBus,alertBus } from '../../main';

export default {
  name: 'CreateDirectory',
  components:{
    UniverseButton,
    PrivacySelector
  },
  
  props: ['data'],

  data () {
    return {
      name:'',
      privacy:'',
      filesystemBus:{}
    }
  },
  methods:{
    submit:function(){
      var self = this;
      api.post('directories',{
        parent_directory_id:this.data.parent_directory_id,
        name:this.name,
        privacy:this.privacy
        },function(err){
          if(err){
            alertBus.$emit('alert', {
              text:err.error
            });
          }
          else{
            alertBus.$emit('alert', {
              text:'The folder was created!'
            });
            modalBus.$emit('modal', {

            });
            applicationBus.$on('filesystem_1', (applicationObj) => {
              self.filesystemBus = applicationObj;
            });
            self.filesystemBus.directory_id = self.data.parent_directory_id;
            applicationBus.$emit('filesystem_1', self.filesystemBus);
          }
      });
      console.log('submitted');
    }
  },
  created:function(){
    console.log(this.data);
  }
}
</script>

