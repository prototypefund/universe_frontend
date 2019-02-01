<template>
  <div>
    <div class="applicationWindow">
      <header>{{ title }}</header>
      <div class="content">
        <component :is="component"></component>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css'
export default {
  name: 'Application',
  props: ['title', 'component'],
  methods: {
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
      console.log('ready');
      this.initApplication();
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
