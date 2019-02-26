import api from './api';

var user = function(){
    this.sendFriendRequest = function(userid){
      return new Promise((resolve, reject)=>{

        api.post('requests/',{
            type:'buddy',
            user_b:userid
          },function(err,result,body){
            if(err){
              reject(err);
            }
            else{
              resolve(body);
            }
          });
      })
    }
    this.acceptFriendRequest = function(){

      //get old buddylist

      //push user to it

      //encrypt and store it

      
    }
    this.deleteFriendRequest = function(request_id){
      return new Promise((resolve, reject)=>{
        api.post('requests/delete',{
            request_id:request_id
          },function(err,result,body){
            if(err){
              reject(err);
            }
            else{
              resolve(body);
            }
          });
      })
    }
    this.setConfig = function(index, value){
      return new Promise((resolve, reject)=>{
          api.post('user/setConfig',{
            index:index,
            value:value
          },function(err,result,body){
            if(err){
              reject(err);
            }
            else{
              resolve(body);
            }
          });
      })
    }

}

export default new user();