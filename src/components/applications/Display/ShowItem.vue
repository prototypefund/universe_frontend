<template>
    <div class="itemBrowser">
        <header>
            <span>
                <span class="icon icon-file"></span>
            </span>
            <span class="browser_title">{{name}}</span>
            <span>
                <span class="icon icon-download"></span>
                <span class="icon icon-gear"></span>
            </span>
        </header>
        <!-- @sec v-html used here! -->
        <div v-if="this.contentType == 'HTMLContent'" class="browserContent" v-html="content">
        </div>
        <div v-if="this.contentType == 'code'" class="browserContent">
            <highlight>{{ content }}</highlight>
        </div>

    </div>
</template>
<script>
import hljs from 'highlight.js'
import Highlight from 'vue-highlight-component'
import file from '@/utils/file'
import linkUtil from '@/utils/link'
import api from '@/utils/api'

export default {
  name: 'ShowItem',
  components:{
    Highlight
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
            this.contentType = 'HTMLContent';
            content = result.filecontent;
            break;
          case 'js':
            this.contentType = 'code';
            content = result.filecontent;
            this.code_language = 'javascript';
            break;
        }
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

<style>
.itemBrowser{
    position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
}

.itemBrowser>header{
    height: 40px;
    border-bottom: 1px solid #cfd8dc;
}

.itemBrowser>header>span{
    float: left;
    height: 40px;
    padding-top: 5px;
}
.itemBrowser>header>span.browser_title{
    padding-top: 15px;
}
.itemBrowser>header>span:last-of-type{
    float: right;
    margin-right:5px;
}

.itemBrowser>.browserContent{
    position:absolute;
    top:40px;
    right:0;
    bottom:0;
    left:0;
    background:#c9c9c9;
}

.itemBrowser pre{
    margin:0;
}

/*
highlight.js
github.com style (c) Vasily Polovnyov <vast@whiteants.net>
*/
.hljs{display:block;overflow-x:auto;padding:.5em;color:#333;background:#f8f8f8}.hljs-comment,.hljs-quote{color:#998;font-style:italic}.hljs-keyword,.hljs-selector-tag,.hljs-subst{color:#333;font-weight:700}.hljs-literal,.hljs-number,.hljs-tag .hljs-attr,.hljs-template-variable,.hljs-variable{color:teal}.hljs-doctag,.hljs-string{color:#d14}.hljs-section,.hljs-selector-id,.hljs-title{color:#900;font-weight:700}.hljs-subst{font-weight:400}.hljs-class .hljs-title,.hljs-type{color:#458;font-weight:700}.hljs-attribute,.hljs-name,.hljs-tag{color:navy;font-weight:400}.hljs-meta,.hljs-strong{font-weight:700}.hljs-link,.hljs-regexp{color:#009926}.hljs-bullet,.hljs-symbol{color:#990073}.hljs-built_in,.hljs-builtin-name{color:#0086b3}.hljs-meta{color:#999}.hljs-deletion{background:#fdd}.hljs-addition{background:#dfd}.hljs-emphasis{font-style:italic}


</style>