<template>
  <div>
    <input type="text" v-model="value">

    <div class="privacySettings">
            <header>Privacy settings</header>
            <ul>
              <li class="privacyPublicTrigger active">
                <span class="icon white-check"></span><h2><input type="checkbox" name="privacyPublic" value="true" class="privacyPublicTrigger uncheckCustom uncheckHidden" checked="checked">Public</h2>
              </li>
              <li class="privacyHiddenTrigger">
                <span class="icon white-check"></span><h2><input type="checkbox" class="privacyHiddenTrigger uncheckPublic uncheckCustom" name="privacyHidden" value="true">Only me</h2>
              </li>
              <li class="privacyCustomTrigger privacyShowFriendDetails ">
                <span class="icon white-check"></span><h2><input type="checkbox" class="privacyBuddyTrigger privacyCustomTrigger uncheckPublic uncheckHidden">Friends</h2>
              </li>
              <li class=" sub privacyShowBuddy" style="display: list-item;">
                <div>
                  <input type="checkbox" name="privacyCustomSee[]" value="f" data-privacytype="see" class="privacyCustomTrigger uncheckPublic uncheckGroups uncheckHidden privacyBuddyTrigger privacyBuddyTrigger_see">See
                </div>
                <div>
                  <input type="checkbox" name="privacyCustomEdit[]" value="f" data-privacytype="edit" class="uncheckPublic privacyCustomTrigger uncheckGroups uncheckHidden privacyBuddyTrigger privacyBuddyTrigger_edit">Edit
                </div>
              </li>
              <li class="privacyGroupTrigger">
                                    <span class="icon white-check"></span><h2><input type="checkbox" class="uncheckPublic privacyGroupTrigger privacyCustomTrigger uncheckHidden">Groups</h2>
              </li>
              <li class=" sub privacyShowGroups " style="display: list-item;">
                <ul class="groupList">
                  <li style="padding-left:10px;">Your are in no group</li>
                </ul>
              </li>
            </ul>
          </div>
  </div>
</template>
<script>
export default {
  name: 'PrivacySelector',
  props: ['privacy'],
  data () {
    return {
      value:'p'
    }
  },
  methods:{
    
  },
  mounted: function () {
      console.log('privacy ready with value '+this.privacy);
      this.value = this.privacy;
      this.$watch('value', value => {
        console.log('asd');
        this.privacy = value;
      }, {immediate:true})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.privacySettings {
                    color: #313131;
                }
                
        .privacySettings h1, .privacySettings h2, .privacySettings h3{
          margin: 0;
          line-height:15px;
        }
        
        .privacySettings h2{
          line-height: 23px;
          font-size: 16px;
                                        display: inline-block;
        }
        
        .privacySettings > header{
                                        color: #FFF;
          position: relative;
          font-size: 16px;
          line-height: 30px;
                                        margin-bottom: 10px;
                                }
        
        .privacySettings ul{
        }
        
        .privacySettings>ul>li{
                                    margin-bottom: 12px;
                                    padding: 3px;
                                    padding-left: 35px;
                                    clear: both;
                                    height: 40px;
                                    line-height: 36px;
                                    color: #313131;
                                    background-color: #ffffff;
                                    margin-bottom: 5px;
                                    cursor: pointer;
        }
                                
                                .privacySettings>ul>li .white-check{
                                    display:none;
                                }
                                
        .privacySettings>ul>li.active{
                                    background-color:  #00bcd4;
                                    color:#FFF;
                                    padding-left: 2px;
                                }
                                
                                .privacySettings>ul>li.active .white-check{
                                    display: inline-block;
                                    margin-right: 2px;
                                    height: 30px;
                                    width: 30px;
                                    margin-bottom: -8px;
                                }
                                
                                .privacySettings h2 input[type=checkbox]{
                                    display:none;
                                }
                                
        
        .privacySettings input[type=checkbox]{
          margin: -3.5px 1px 0 -13px;
        }
        
        .privacySettings .sub{
          margin-left: 25px;
                                        border-top: none;
                                        display: none;
                                        height: 40px;
                                        padding-left: 35px;
                                        padding-top: 0px;
                                }
        
        .privacySettings .sub > div{
                                        width:45%;
                                        height: 35px;
                                        font-size: 18px;
                                        display: inline-block;
        
                                        vertical-align: middle;
}
        
        .privacySettings .sub > div:first-of-type{
          margin-left: 0;
        }
        
        .privacySettings .groupList li{
          clear: both;
          padding-left: 5px;
        
          min-height: 30px;
}
        
        .privacySettings .groupList li > div:first-of-type{
          margin-left: 0;
          width: 120px;
        }
        
        .privacySettings .groupList li > div{
          margin-left: 20px;
                                        
          float: left;
        
          display: block;
}
</style>
