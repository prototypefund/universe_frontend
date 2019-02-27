<template>
    <div class="linkBrowser">
        <header>{{name}}</header>
        <!-- @sec v-html used here! -->
        <div v-if="this.contentType == 'HTMLContent'" class="browserContent" v-html="content">
        </div>
    </div>
</template>
<script>

import file from '@/utils/file'
import linkUtil from '@/utils/link'
import UniverseButton from '@/components/gui/UniverseButton'
import api from '@/utils/api'

export default {
  name: 'ShowItem',
  components:{
    UniverseButton
  },
  

  data () {
    return {
      name:'',
      contentType:'',
      content:'wouhuhuhu'
    }
  },
  props:['item'],
  watch: {
    item: function (item) {
      if(item.type == 'file')
        this.openFile(item);
      else if(item.type == 'link')
        this.openLink(item);
    }
  },
  methods:{
    openFile:function(item){
    console.log('opening file!',item);
      file.loadFile(item.data.id)
      .then((result)=>{

        console.log('opening file!');
        let content;
        switch(result.file.filename.split('.').pop()){
          case 'txt':
            content = result.filecontent
            break;
          case 'js':
            content = '<pre v-highlightjs><code class="javascript">const s = new Date().toString()</code></pre>'
            break;
        }
        console.log(content);
        console.log(content);
        this.contentType = 'HTMLContent';
        this.content = content;
        this.name = result.file.name;
      })
      .catch((e)=>{
        console.log('E');
        console.log(e);
      });
    },
    openLink:function(link){
      //openlink loads a webshot image of the link if its an unknown format.
      console.log('opening link wouhuhu');
      let content = ''
      let yt = linkUtil.validateYoutubeUrl(link.data.link); //either returns youtube videoid or false

      this.name = link.data.name;
      this.contentType = 'HTMLContent';
      if(yt){
        this.content = '<iframe id="ytplayer" type="text/html" width="640" height="360" src="http://www.youtube.com/embed/'+yt+'?autoplay=1&origin=http://example.com" frameborder="0"/>';

      }else{
        this.content = '<img src="https://webshotserver.herokuapp.com/api/'+encodeURIComponent(link.data.link)+'">';
      }
      this.$forceUpdate();
    }
  },
  created:function(){
    console.log('CREATED',this.item,this.item.type);
    if(this.item.type == 'file')
        this.openFile(this.item);
    else if(this.item.type == 'link')
        this.openLink(this.item);
  }
}
</script>