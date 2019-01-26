<template>
  <div id="dock">
    <div class="box-shadow" id="startbox" style="z-index: 9999; position: absolute;">
                <form method="post" target="submitter" id="loginForm" onsubmit="login(); return false;">
                    <table valign="center" width="100%">
                        <tbody><tr valign="top">
                            <td><input type="text" placeholder="username" id="loginUsername"></td>
                        </tr>
                        <tr>
                            <td><input type="password" placeholder="password" id="loginPassword"></td>
                        </tr>
                        <tr>
                            <td><input type="submit" value="Log In" name="submit" class="button pull-right"></td>
                        </tr>
                    </tbody></table>
                </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dock',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#dock{
  position: absolute;
  height: 40px;
  width: 100%;
  bottom: 0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
  background: #000;
}
#startbox{
  position: absolute;
  bottom: 40px;
  left: 0px;
  background-color: #607d8b;
  box-shadow: 1px 3px 8px 0px rgba(0, 0, 0, 0.3);
  width: 360px;
  height: 190px;
  padding: 20px;
}
#startbox input[type="text"], #startbox input[type="password"] {

    width: 100%;
    height: 40px;
    padding: 7px;
    font-size: 16px;
    color: #313131;
    margin-bottom: 15px;
    border: none;

}
</style>
