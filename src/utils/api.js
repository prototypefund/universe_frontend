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
        if(res.statusCode == 400){
          if(body.message == 'Invalid auth token provided.'){
          localStorage.clear();
          window.location.reload();
          }
        } 
        else
        cb(null,res,body);
      });
    };
    this.get = function(action,parameters,cb){
      this.request('get',action,parameters,cb);
    }
    this.delete = function(action,parameters,cb){
      this.request('delete',action,parameters,cb);
    }
    this.post = function(action,parameters,cb){
      this.request('post',action,parameters,cb);
    }
    this.postFile = function(action, parameters, file, cb){

      console.log('asd1');
      const url = this.baseURL+'/'+action;
      let req = new XMLHttpRequest();


      
   

      let formData = new FormData();
      for(var i in parameters){
        formData.append(i, parameters[i]);    
      }
      formData.append("file", file);                         
      req.open("POST", url);
      if(typeof localStorage.jwt != 'undefined'){
        req.setRequestHeader("Authorization", 'Bearer '+localStorage.jwt);
      }
      req.send(formData);
      req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status === 200) {
              let response = JSON.parse(req.responseText);
              cb(null, response);
            } else {
               console.log('failed');
               cb('failed');
            }
        }
      }
     /*var formData = {
        my_field: 'my_value',
        my_file: file,
      };
      console.log('asd2');
      request.post({url:url, formData: formData}, function(err, httpResponse, body) {
        if (err) {
          return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
      });*/

    }
}

export default new api();