<template>
    <div class="dialogueFrame">
        <header>
          <span>{{user.username}}</span>          
        </header>
        <div class="dialogue">
          <ul>
            <li v-for="message in messages">
              <span class="username">{{user.username}}</span>
              <span class="message">{{message}}</span>
            </li>
          </ul>
        </div>
        <footer>
          <form v-on:submit.prevent="submit">
            <input type="text" placeholder="type a message..." name="message" class="input border-radius chatInput pull-right" style="" v-model="message">
          </form>
        </footer>
      </div>
</template>
<script>


import user from '@/utils/user'

export default {
  name: 'Dialogue',
  

  data () {
    return {
      messages:[],
      message:''
    }
  },
  props:['user'],
  methods:{
    submit:function(e){
        e.preventDefault();
        this.messages.push(this.message);
        this.message = '';
    }
  },
  created:function(){

  }
}
</script>
<style>
.dialogueFrame header {
  top:0;
  right: 0;
  left: 0;
  position:absolute;
  height: 50px;
  border-bottom: 1px solid #dcdcdc;
  padding: 11px;
}
.dialogueFrame .dialogue{
  position:absolute;
  top:50px;
  bottom:60px;
  overflow:auto;
}
.dialogueFrame footer {
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  height: 60px;
  border-top: 1px solid #dcdcdc;
  padding: 10px;
}

.dialogue ul li{
    margin-top: 15px; 
    padding: 10px;
    padding-bottom: 10px;     
    -moz-user-select: text;    
    -webkit-user-select: text;
}

.dialogue ul li .username{
  position:absolute;
  margin-top:-15px;
  font-size:10px;
}

.dialogue ul li .message{
  font-size:16px;
}

</style>