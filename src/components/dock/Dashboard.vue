<template>
<div id="dashBoard">
  <div id="dashBoxFrame">
    <div id="scrollFrame">
      <div class="dashBox" id="appBox_box">
        <a class="dashClose"></a>
        <header>Applications</header>
        <div class="content">
          <ul class="appList">
            <li onclick="applications.show('filesystem');" onmouseup="closeDockMenu()"><img src="gfx/applicationIcons/white/filesystem.svg" border="0" height="32" width="32">filesystem</li>
          </ul>
        </div>
      </div>
      <div class="dashBox" id="groupBox">
        <a class="dashClose"></a>
        <header>Your Groups</header>
        <div class="content">
          <p class="overlength">No Groups :/</p>
        </div>
        <footer><a href="#addGroup" onclick="groups.showCreateGroupForm();" title="Create a new Group"><i class="icon white-plus" style="color:#FFF; margin-bottom: -10px;"></i></a></footer>
      </div>
      <div class="dashBox" id="playlistBox">
        <a class="dashClose"></a>
        <header>Your Playlists</header>
        <div class="content">
          <ul></ul>
        </div>
        <footer><a href="#addPlaylist" onclick="playlists.showCreationForm();" title="Create a new Playlist"><i class="icon white-plus" style="color:#FFF"></i></a></footer>
      </div>
      <div class="dashBox" id="favBox">
        <a class="dashClose"></a>
        <header>Your Favorites</header>
        <div class="content">
          <div>
            <ul id="favList">
              <li class="overlength">You don't have any favourites so far.</li>
            </ul>
          </div>
        </div>
        <footer> </footer>
      </div>
      <div class="dashBox" id="taskBox">
        <a class="dashClose"></a>
        <header>Future Tasks</header>
        <div class="content">
          <ul></ul>
        </div>
        <footer><a href="#addTask" onclick="tasks.addForm();" title="Create a new Task"><i class="icon white-plus" style="color:#FFF"></i></a></footer>
      </div>
      <div class="dashBox" id="helpBox_box">
        <a class="dashClose"></a>
        <header>Need Help?</header>
        <div class="content">Have a look at the <a href="//wiki.transparency-everywhere.com/en/" target="_blank" title="Open the Transparency-Everywhere Wiki">wiki</a><br>Or take our <a href="#" onclick="support.showTour();">tour</a></div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Dashboard',
  methods: {

    
  },
  mounted: function () {

  },

}
</script>
<style>
#dashBoard{
        z-index: 99998;
        position: absolute;
        height: 250px;
        right: 0;
        bottom: 40px;
        left: 0;
        padding: 0 10px;
        background: rgba(0,0,0,0.85); /* Old browsers */
        overflow-y: hidden;          
    }
    
    #dashBoard footer{
        position: absolute;
        bottom: 0;
        text-align: center;
        left: 0;
        right: 0;
        margin-bottom: -8px;
    }
    
    #dashBoxFrame{
            max-width:100%;
        overflow-x:auto;
        overflow-y:hidden;
    }
    
    #dashBoxFrame #scrollFrame{
        min-width:1340px;
    }
    
    .dashBox:hover .content{
        display: block;
        overflow: auto;
    }
    
    .dashBox:hover footer{
        display: block;
    }

    .dashBox{
            color: #FFF;
            width: 180px;
            margin: 0 4px;
            position: relative;
            float: left;
            height: 240px;
    }
    
    .dashBox .content{
            overflow: auto;
            height: 180px;
    }
    
    .dashBox header{
            padding: 0;
            padding-top: 10px;
            padding-bottom: 10px;
            font-size: 22px;
            line-height: 15px;
            font-weight: 300;
        }
    
    .dashBox footer{
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        height: 23px;
        margin-bottom: 0!important;
        border-top: 0;
    }
    
    .dashBox footer a:first-of-type{
        float:left;
    }
    
    .dashBox footer a{
        float:right;
    }
        .dashBox footer .white-plus{
            margin-top: -4px!important;
        }
    .dashBox > div, .dashBox > ul {
        /*padding: 3px;*/
    }
    .dashBox .dashClose{
        position: absolute;
        top: 5px;
        left: 5px;
        background-position: -312px 0;
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-top: 1px;
        line-height: 14px;
        vertical-align: text-top;
        display: none;
        cursor: pointer;
    }
</style>