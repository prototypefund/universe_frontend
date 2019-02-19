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
}

export default new user();