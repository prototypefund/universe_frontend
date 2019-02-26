import api from './api';

let request = function(){
	this.delete = function(requestid){
		return new Promise(
			(resolve, reject)=>{
				api.delete('requests/'+requestid,{},function(err,result,body){
			        if(err){
			              reject(err);
			        }
			        else{
			        	resolve(body);
			        }
			    });
			});
	}
}

export default new request();