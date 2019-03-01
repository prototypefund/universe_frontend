import api from './api';
import cry from './crypto';
import user from '@/utils/user'
import request from '@/utils/request'

var buddylist = function(){
	this.create = function(buddylistArray){
	  console.log(buddylistArray);
	  console.log(localStorage.passwordHash);
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
      		console.log(result)
      	})
      	.catch(function(e){

      	});
      })
	};
	this.update = function(buddylistObj){
	  let buddylistArray = buddylistObj.buddylist
	  //return alert('UPDATE NOW!');
 	  //let key = Uint8Array.from(atob(localStorage.passwordHash), c => c.charCodeAt(0));
	  let encryptedFile = cry.symEncrypt(buddylistArray, localStorage.passwordHash);

      var file = new File([encryptedFile], "buddylist.json", {
        type: "text/json",
      });
      return new Promise((resolve, reject)=>{
	      api.postFile('files/update', {
	      	file_id:buddylistObj.file.id,
	      }, file, function(err, result){
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
	    		let buddylist = buddylistFile.buddylist
	    		let buddylistArray
	    		if(!buddylist)
	    			buddylistArray = [];
	    		else
	    			buddylistArray = buddylist

                user.getInfo(userid)
                .then(function(info){
                  
                    console.log('GOT INFO!');
                    console.log(info);
                    buddylistArray.push({
                        id:userid,
                        username:info.username
                    })

                    if(typeof buddylist == 'undefined'){
                        self.create(buddylistArray).then(()=>{

                            request.delete(requestObj.id)
                            .then(resolve)
                            .catch(reject)
                        })
                        .catch(reject)
                    }else{
                        self.update({
                            file:buddylistFile.file,
                            buddylist:buddylistArray
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