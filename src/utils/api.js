import request from 'request';

var api = function(){
    this.baseURL = 'http://localhost:1312';
    this.init = function(){
        console.log('eyo');

        request('https://ifconfig.co', function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body); // Print the HTML for the Google homepage.
        });
    }



    this.request = function(action,parameters,cb){
      const url = this.baseURL+'/'+action;
      var options = {
        method: 'post',
        body: parameters,
        json: true,
        url: url
      }
      request(options, function (err, res, body) {
        if (err) {
          console.error('error posting json: ', err)
          cb(err)
        }
        var headers = res.headers
        var statusCode = res.statusCode
        console.log('headers: ', headers)
        console.log('statusCode: ', statusCode)
        console.log('body: ', body)
        cb(null,res,body);
      });
    };
    this.post = this.request;
}

export default new api();