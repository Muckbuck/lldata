var http = require('http')
var https = require('https')
const request = require('request');

module.exports = function (app) {
  var client_id = '30c5b9a5-cda3-42b5-8340-884cd115042b';
  var client_secret = 'dblEOLzx43KGGALz2t0O9ryHgf8';
  var responseBody;
  var userData = null;
  app.get('/', function (req, res) {
    res.render('index');
  });
  // GET route - Redirect URL
  app.get('/data', function (req, res) {
    var code = req.query.code;
    var postData = {
      'client_id': client_id,
      'client_secret': client_secret,
      'grant_type': 'authorization_code',
      'code': code
    }
    // Send POST request with auth_code to retrieve access_token
    request.post({ url: 'https://platform.lifelog.sonymobile.com/oauth/2/token', form: postData }, function (err, httpResponse, body) {
      access_token = JSON.parse(httpResponse.body).access_token
      console.log('access_token: ' + access_token)


      

      const options = {  
          url: 'https://apigateway.lifelog.sonymobile.com/v1/users/me/activities?start_time=2017-02-28T09:00:00.000Z&end_time=2017-03-01T15:00:00.000Z&type=physical&limit=100',
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Authorization': "Bearer " + access_token,
              'Accept-Encoding': 'gzip',	 	 
              'Content-Encoding': 'gzip'

              
          },
          'gzip': true
      };

      request(options, function(err, res, body) {  
       /* var parsedBody = JSON.parse(body);
        var details = JSON.parse(parsedBody.result);
        var detailsString = JSON.stringify(details);
        console.log(detailsString);*/
        var result = JSON.parse(body).result
        for(i = 0; i < result.length; i++){
          console.log(result[i].details.steps)
        }
        //console.log((JSON.stringify(result.details.steps,null,2)))
          
      });


      // Send GET request with access_token to retrieve user data    
      /*var options = {
        url: 'https://platform.lifelog.sonymobile.com/v1/users/me/activities?start_time=2017-01-01T09:00:00.000Z&end_time=2017-02-05T10:00:00.000Z',
        headers: {
          'Authorization:': access_token,
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip',
          'Content-Encoding': 'gzip'

        }
      };
      function callback(error, response, body) {

        
        if (!error && response.statusCode == 200) {

          console.log('CB STATUS 200')


        }
        else {
          console.log('CB ERROR')
        }
      }

      request(options, callback);*/

    });











    res.render('data', { 'code': code, 'userData': userData });

  })

  // GET route - Redirect to LL login
  app.get('/login', function (req, res) {


    res.redirect('https://platform.lifelog.sonymobile.com/oauth/2/authorize?client_id=' + client_id + '&scope=lifelog.profile.read+lifelog.activities.read+lifelog.locations.read');


  });
}