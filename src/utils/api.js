import request from 'request';

var api = function(){
    this.baseURL = 'http://localhost:8000/api/v1';
    this.request = function(method,action,parameters,cb){

      //define request parameters
      const url = this.baseURL+'/'+action;
      var options = {
        method: method,
        body: parameters,
        json: true,
        url: url
      }

      //define headers
      options.headers = {};

      //add auth header if jwt undefined
      if(typeof localStorage.jwt != 'undefined'){
        options.headers = {
          'Authorization': 'Bearer '+localStorage.jwt
        }
      }



      request(options, function (err, res, body) {
        if (err) {
          console.error('error: ', err)
          cb(err)
        }
        //var headers = res.headers 
        if(res.statusCode == 400)
          cb(body);
        else
        cb(null,res,body);
      });
    };
    this.get = function(action,parameters,cb){
      this.request('get',action,parameters,cb);
    }
    this.post = function(action,parameters,cb){
      this.request('post',action,parameters,cb);
    }
}

export default new api();