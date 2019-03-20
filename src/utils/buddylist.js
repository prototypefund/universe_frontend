import api from './api';
import cry from './crypto';
import user from '@/utils/user'
import request from '@/utils/request'

var buddylist = function(){
	this.create = function(buddylistArray){
    return new Promise((resolve,reject)=>{
      //let key = Uint8Array.from(atob(localStorage.passwordHash), c => c.charCodeAt(0));
      let encryptedFile = cry.symEncrypt(buddylistArray, localStorage.passwordHash);
      var file = new File([encryptedFile], "buddylist.json", {
        type: "text/json",
      });
      api.postFile('files/upload', {
        collection_id:'_USERCONFIG',
        privacy:'h'
      }, file, function(err, result){
        console.log(result);
        user.setConfig('buddylist_file',result.id)
        .then(function(res){
          resolve(result)
        })
        .catch(reject);
      })
    })
	};
	this.update = function(buddylistObj){
	  let buddylistArray = buddylistObj.buddylist

    console.log('updating file!', buddylistArray);
	  //return alert('UPDATE NOW!');
 	  //let key = Uint8Array.from(atob(localStorage.passwordHash), c => c.charCodeAt(0));
	  let encryptedFile = cry.symEncrypt(buddylistArray, localStorage.passwordHash);

      var file = new File([encryptedFile], "buddylist.json", {
        type: "text/json",
      });
      return new Promise((resolve, reject)=>{
        console.log(buddylistObj);
	      api.postFile('files/update', {
	      	file_id:buddylistObj.file.id,
	      }, file, function(err, result){
          console.log('got result!');
          console.log(result);
	      	if(err)
	      		reject(err)
	      	else
	      		resolve(result)
	      })
      });
	}
    this.get = function(){
	    return new Promise((resolve, reject)=>{
	        api.get('user/buddylist',{},function(err,result,body){
	            if(err){
	              reject(err);
	            }
	            else{
	              if(body){
		  			  let decryptedFile = cry.symDecrypt(body.filecontent, localStorage.passwordHash);
		              resolve({
		              	file:body.file,
		              	buddylist:decryptedFile
		              });
	              }else
	              	resolve(false)
	            }
	        });
	    })
    };
    this.addBuddy = function(requestObj){
    	let userid = requestObj.user_b;
    	let self = this;
    	return new Promise((resolve, reject)=>{
	    	this.get()
	    	.then((buddylistFile)=>{
          user.getInfo(userid)
          .then((info)=>{
              let UserEntry = {
                id:userid,
                username:info.username
              };
              //check if buddylistfile exists
              if(!buddylistFile){
                //create new buddylist
                self.create([UserEntry]).then(()=>{
                    request.delete(requestObj.id)
                    .then(resolve)
                    .catch(reject)
                })
              }else{
                buddylistFile.buddylist.push(UserEntry);
                //update existing buddylist
                console.log('update buddylist now!',UserEntry);
                self.update({
                  file:buddylistFile.file,
                  buddylist:buddylistFile.buddylist
                }).then((res)=>{
                  request.delete(requestObj.id)
                  .then((data)=>{
                      resolve(data);
                  })
                  .catch((e)=>{
                      reject(e)
                  })
                })
              }
          });
	    		
	    	})
	    	.catch(reject);
    	});
    };
}

export default new buddylist();