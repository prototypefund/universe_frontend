import request from 'request';

var api = function(){
    this.init = function(){
        console.log('eyo');

        request('https://ifconfig.co', function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body); // Print the HTML for the Google homepage.
        });
    }
}

export default new api();