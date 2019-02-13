<template>
    <form class="universeForm">
      <div class="row">
        <label>Title</label>
        <input type="text" placeholder="Title" v-model="name">
      </div>
      <div class="row">
        <label>Privacy</label>
        <input type="text" placeholder="Privacy" v-model="privacy">
      </div>
      <div class="row">
        <label>Info</label>
        <input type="text" placeholder="info" v-model="info">
      </div>
      <div class="row">
        <UniverseButton text="Create Directory" :click="submit" style="float: right;"></UniverseButton>
      </div>
    </form>
</template>

<script>
import UniverseButton from '@/components/gui/UniverseButton'
import api from '@/utils/api'
import { modalBus, applicationBus } from '../../main';

export default {
  name: 'CreateCollection',
  components:{
    UniverseButton
  },
  
  props: ['data'],

  data () {
    return {
      name:'',
      privacy:'',
      info:'',
      filesystemBus:{}
    }
  },
  methods:{
    submit:function(){
      let self = this;
      api.post('collection',{
        directory_id:this.data.directory_id,
        name:this.name,
        privacy:this.privacy,
        info:this.info
        },function(err,result,body){
          if(err){
            console.log(err);
          }
          else{
            alert('The collection was created!');
            modalBus.$emit('modal', {});
            
            applicationBus.$on('filesystem_1', (applicationObj) => {
              self.filesystemBus = applicationObj;
            });
            self.filesystemBus.directory_id = self.data.directory_id;
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
