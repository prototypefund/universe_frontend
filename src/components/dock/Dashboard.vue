<template>
<div id="dashBoard">
  <div id="dashBoxFrame">
    <div id="scrollFrame">
      <div class="dashBox" id="appBox_box">
        <a class="dashClose"></a>
        <header>Applications</header>
        <div class="content">
          <ul class="appList">
            <li v-for="application in applications">
                <img :src="'img/appIcons/white/'+application.title+'.svg'" border="0" height="32" width="32">
                <span class="title">{{application.title}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { applicationBus } from '@/main';
export default {
  name: 'Dashboard',
  data () {
    return {
      applications:{}
    }
  },
  methods: {

    
  },
  mounted: function () {
    let self = this;
    applicationBus.$on('applications', (applications) => {
        self.applications = applications
    });

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
    #dashBoard .appList{
                    border-right: none;
                }
                #dashBoard .appList li{
                    background: #00bcd4;
                }
                
                #dashBoard .appList li img, #dashBoard .appList li .title{
                    float:left;
                    margin-right: 5px;
                }
                
                #dashBoard .appList li:hover{
                    background: #18ffff;
                }
            
                #dashBoard li{
                    padding: 5px;
                    padding-bottom: 12px;
                    cursor: pointer;
                    float: left;
                    font-size: 16px;
                    line-height: 30px;
                    width: 161px;
                    height: 40px;
                    background: #1a1b1b;
                    margin-bottom: 15px;
                }

</style>