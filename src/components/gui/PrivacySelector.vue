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

</style>
