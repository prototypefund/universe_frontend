<template>
  <div>
    <div class="applicationWindow" :style="styleObject">
      <header>{{ title }}</header>
      <div class="content">
        <component :is="component"></component>
      </div>
      <footer>
         {{styleObject}}
      </footer>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css'
export default {
  name: 'Application',
  props: ['title', 'component','styles'],
  data () {
    return {
      styleObject: {
      },
      left:0,
      style:this.styles
    }
  },
  watch: {
    style: {
      handler: function(val, oldVal) {
        console.log(oldVal, val);

        console.log('style update');
        this.initStyles(val);
      },
      deep: true
    }
  },
  methods: {
    initStyles (styles) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      if(this.styles){
        if(this.styles.width)
          this.styleObject.width = this.styles.width*(windowWidth/12)+'px';
        if(this.styles.left)
          this.styleObject.left = this.styles.left*(windowWidth/12)+'px';
        if(this.styles.right)
          this.styleObject.right = this.styles.right*(windowWidth/12)+'px';
        if(this.styles.top)
          this.styleObject.top = this.styles.top*(windowHeight/4)+'px';
        if(this.styles.height)
          this.styleObject.height = this.styles.height*(windowHeight/4)+'px';
        if(this.styles.hidden)
          this.styleObject.display = 'none';
        else
          this.styleObject.display = '';
      }
      this.$forceUpdate();
    },
    initApplication () {

      
      $(".applicationWindow").not('.ui-draggable').draggable({
              cancel: '.inhalt',
              containment: '#app',
              scroll: false,
              drag: function(){
                  //disable textmarking
                  $('*').disableSelection();
              },
              stop: function(){
                  //enable textmarking
                  $('*').enableSelection();
              }
      });

      $(".applicationWindow").not('.ui-resizable').resizable({
              handles: 'n, e, s, w, ne, se, sw, nw',
              containment: '#app',
              start: function(){
                  //disable textmarking
                  $('*').disableSelection();
                  if($(this) != undefined){
                          //bring window to front 
                          $(this).css('z-index', 9999);
                          $(this).css('position', 'absolute');
                  }
              },
              stop: function(){
                  //enable textmarking
                  $('*').enableSelection();
              }
      });

      $('.applicationWindow').children().bind('mousedown',function(){

          if($(this) != undefined){
            
            $(".applicationWindow").css('z-index', 999);
            $(this).parent(".applicationWindow").css('z-index', 9999); 
            $(this).parent(".applicationWindow").css('position', 'absolute');
          
            $('.applicationWindow').removeClass('onTop');
            $(this).parent(".applicationWindow").addClass('onTop');

          }
      });


    }
  },
  mounted: function () {
      this.initApplication();
      this.initStyles(this.styles);
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.applicationWindow{
  padding: 0;
  position: absolute;
  z-index: 1;
  background: #FFF;
  min-width: 250px;
  min-height: 260px;
  border-radius: 3px;
  box-shadow: 1px 3px 8px 0px rgba(0, 0, 0, 0.3);
  opacity: 0.8;
  transition: opacity 1s ease-in-out;
}

.applicationWindow > header {
    color: #454545;
    cursor: move;
    height: 60px;
    overflow: none;
    padding: 20px 0 0 15px;
    text-overflow: ellipsis;
    font-size: 24px;
    white-space: nowrap;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdcdc;
}

.applicationWindow > .content{
    background-color: #FFF;
    top: 60px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
}
</style>
