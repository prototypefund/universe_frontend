<template>
<div id="searchMenu" :class="{ 'slideLeft' : show == true}">
  <header>
    <a href="#" id="toggleSearchMenu" @click="hide"><span class="icon white-close"></span></a>
    <h2>Search</h2>
    <ul id="selectSource" class="">
    <li class="trigger">Everything <span class="icon blue-chevron-down"></span></li>
    <li data-value="text" style="display: none;">Text</li>
    <li data-value="video" style="display: none;">Video</li>
    <li data-value="audio" style="display: none;">Audio</li>
    </ul>
    <ul id="selectType" class="">
    <li class="trigger">Everywhere <span class="icon blue-chevron-down"></span></li>
    <li data-value="universe" style="display: none;">the Universe</li>
    <li data-value="web" style="display: none;">the Web</li>
    </ul>
    <input type="text" placeholder="search" id="searchField" v-model="query">
    <span class="icon blue-search"></span>
    <!--<a href="#" id="openInTelescope" style="line-height: 40px;margin-left: 3px"><span class="icon white-search" style="margin-bottom: -8px;"></span>&nbsp;Open in Telescope</a>-->
  </header>
       <div id="loadingArea">
          <div class="listContainer" v-if="results.users">
             <header>Users</header>
             <ul class="list resultList">
                <div v-for="user, index in results.users" :key="user.id">
                    <li>
                       <userPicture :userid="user.id" size="30"></userPicture>
                       <a>{{user.name}}</a>
                       <a @click="toggleSettings(index)">
                        <span class="icon icon-gear dark"></span><span class="icon white-gear white"></span>
                       </a>
                    </li>
                    <li class="searchContext" v-if="user.showSettings&&buddy_ids.indexOf(user.id)>1">
                       <ul>
                          <li @click="sendFriendRequest(user.id)" v-if="buddy_ids.indexOf(user.id)>1"><span class="icon blue-plus"></span>Add User</li>
                       </ul>
                    </li>
                </div>
             </ul>
             <div class="loadAll" data-type="users"><a href="#">show all</a></div>
          </div>
      </div>
</div>
</template>
<script>

import {alertBus} from '@/main';  

import UniverseButton from '@/components/gui/UniverseButton'
import SettingsButton from '@/components/gui/SettingsButton'
import buddylist from '@/utils/buddylist'
import UserPicture from '@/components/gui/UserPicture'
import api from '@/utils/api'
import user from '@/utils/user'

export default {
  name: 'Search',
  props:['showsearch'],
  components:{
    UniverseButton,
    UserPicture,
    SettingsButton
  },
  data () {
    return {
      name:'',
      show:this.showsearch,
      query:'',
      results:{},
      buddy_ids:[]
    }
  },
  watch: {
    showsearch: {
      handler: function(val) {
        console.log(val);
        this.show=val;
      },
      deep: true
    },
    query: {
  handler: function(val) {
  console.log(val);
  this.search();
      },
      deep: true
    }
  },
  methods:{
    search:function(){
        var self = this;
        api.get('search/'+this.query,{
        },function(err,result,body){
          if(err){
            console.log(err);
          }
          else{
            self.results = body;

          }
        });
    },
    toggleSettings:function(index){
        if(typeof this.results.users[index].showSettings == 'undefined')
            this.results.users[index].showSettings = true;
        else
            this.results.users[index].showSettings = !this.results.users[index].showSettings;
        this.$forceUpdate();
    },
    sendFriendRequest:function(userid){
        user.sendFriendRequest(userid)
        .then(()=>{
          alertBus.$emit('alert', {
            text:'Friendrequest sent'
          });
        })
        .catch(()=>{
          alertBus.$emit('alert', {
            text:'Error sending friend request'
          });

        });
    },
    hide:function(){
  this.show = false
    }
  },
  created:function(){
    let self = this;
    buddylist.get().then((buddylist)=>{
      console.log(buddylist.buddylist);
      for(let i in buddylist.buddylist){
        console.log(buddylist.buddylist[i]);
        self.$data.buddy_ids.push(buddylist.buddylist[i].id);
      }
    });
  }
}

</script>
<style scoped>



#searchMenu, #searchMenu a, #searchMenu a:link, #searchMenu a:visited {
    color: #fefefe;
    font-size: 20px;
    font-weight: 300;
    text-align: left;
}
#searchMenu{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    width: 337px;
    margin-right: -337px;
    padding: 20px;
    background: #607d8b;
    color: #FFF;
    z-index: 999;
  -webkit-transition: right .3s ease;
}

#searchMenu header #toggleSearchMenu{
    position:absolute; 
    top: 32px; 
    right: 284px;
}


#searchMenu header h2{
    size: 20px;
    font-weight: 200;
    margin-top: 0;
    margin-bottom: 5px;
}

#searchMenu header ul{
    position: absolute;
    color:  #18ffff; 
    margin-top: 3px;
}

#searchMenu header ul#selectSource{
    left: 20px;
}

#searchMenu header ul#selectType{
    left: 150px;
}
#searchMenu header ul.active{
    box-shadow:1px 3px 8px 0px rgba(0, 0, 0, 0.3);
    background-color: #37474f;
    z-index:1;
}

#searchMenu header ul:first-of-type li{
  margin-left: -2px;
}
#searchMenu header ul li{
    cursor: pointer;
    display:none;
    line-height: 20px;
    padding: 4px;
}

span.icon.blue-chevron-down {
    margin-left: -10px;
    left: 0;
    bottom: 0;
}
#searchMenu header ul li .icon{
  width: 32px;
  
  height: 32px;
  margin-bottom: -10px;
  margin-top: -5px;
}

#searchMenu header ul li.trigger{
    display:block;
}

#searchMenu header ul li.active{
    color:#c9c9c9;
}


#searchMenu header input[type=text]{
    width: 100%;
    height: 40px;
    font-size: 16px;
    margin-top: 35px;
    margin-left: 2px;
}


#searchMenu header .blue-search, #searchMenu header .white-close{
    height: 24px;
    width: 24px;
    position:absolute;
    margin-top: -22px;
    margin-left: 255px;
}

#searchMenu header .blue-search{
    margin-top: -46px;
    
    margin-left: 265px;
}

#searchMenu .userpicture {
  margin: 5px 5px;
}

.suggestionList:empty,
                .suggestionList:empty + header {
                    display: none;
                    height: 0;
                    margin: 0;
                    overflow: hidden;
                }
                
                .suggestionList{
                    margin-top: 2em;
                }

.suggestionBox{
    margin-top: 5px;
    margin-right: 15px;
    margin-left: 15px;
    margin-bottom: 30px;
    max-height: 150px;
    overflow: auto;
    background: #FFFFFF;
}

.suggestionBox header{
    position: absolute;
    margin-top: -1.5em;
}

.suggestion {
    position:relative;
}

#openInTelescope{
}
#searchMenu, #searchMenu a, #searchMenu a:link, #searchMenu a:visited{
    color: #fefefe;
    font-size: 20px;
    font-weight: 300;
    text-align: left;
}
#searchMenu #loadingArea{
            margin-top: 35px;
        
            margin-left: 3px;
}

   
#searchMenu > h2{
    margin-top: 15px;
    margin-bottom: 60px;
    margin-left: 15px;
    float: left; 
    font-weight: 200;
    font-size: 20px;
}

#searchMenu > .listContainer:first-of-type{
  clear: left;
}
#searchMenu > .listContainer{
  margin: 50px 15px;
  margin-bottom: 0px;
}

#searchMenu .list{
  background: #ffffff;
  overflow: auto;
}



.resultList li{
    height:40px;
    line-height: 40px;
    border-bottom: 1px solid #607d8b;
}
.resultList li a, .resultList li a:link,.resultList li a:visited, .resultList li a:active{
    color: #313131!important;
    font-size: 14px;
}
.resultList li:hover{
    background-color: #00bcd4;
}
.resultList li:hover a, .resultList li:hover a:link,.resultList li:hover a:visited, .resultList li:hover a:active{
    color: #fefefe!important;
}

.resultList li .icon, .resultList li .userPicture{
    margin-bottom: -8px;
    height: 30px;
    width: 30px;
}
.resultList li .userPicture{
    margin-top: 5px;
}

.resultList .searchContext{
    background-color:  #eceff1!important;
}

.searchContext ul li{
    width: 50%;
    float: left;
    padding-left: 5px;
}

.searchContext .icon{
    margin-bottom: -10px!important;
    margin-right: 5px;
}

.resultList>li:hover>a, .resultList>li:hover>a:link,.resultList>li:hover>a:visited{
    color: #313131;
}

.resultList li:hover a{
    color: #FFF;
}

.resultList li .icon-gear, .resultList li .white-gear{
    width:30px;
    height:30px; 
    float:right; 
    margin-right:15px;
    margin-top: 4px;
    cursor: pointer;
}

.resultList li .icon.white{
    display:none;
}

.resultList li:hover .icon.white{
    display:inline-block;
}
.resultList li:hover .icon.dark{
    display:none;
}
#searchMenu .loadAll{
    font-size: 14px;
    margin-top: 15px;
    text-align:right;
}
#searchMenu .loadAll a{
    color: #18ffff!important;
    font-size: 14px;
}

.slideLeft {
     right: 337px!important;
}

</style>
