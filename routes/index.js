var http = require('http')
var request = require('request')

module.exports = function(app){
  var client_id = '30c5b9a5-cda3-42b5-8340-884cd115042b';
  var client_secret = 'dblEOLzx43KGGALz2t0O9ryHgf8';
  var responseData = null;
  var userData = null;

  // GET route - Redirect URL
  app.get('/data', function(req,res){
    var code = req.query.code;
    var postData = {
      'client_id': client_id,
      'client_secret': client_secret,
      'grant_type': 'authorization_code',
      'code': code
    }
    // Send POST request with auth_code to retrieve access_token
    request.post({url:'https://platform.lifelog.sonymobile.com/oauth/2/token', form: postData}, function(err,httpResponse,body){  responseData = httpResponse; });
    var access_token = postData.access_token;
    console.log(responseData)
    
    var body = responseData[0].body

    // Send GET request with access_token to retrieve user data    
    var options = {
      url: 'https://platform.lifelog.sonymobile.com/v1/users/me/activities?start_time=2017-01-01T09:00:00.000Z&end_time=2017-02-05T10:00:00.000Z',
      headers: {
        'Authorization:': access_token,
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip', 
        'Content-Encoding': 'gzip'

      }
    };
    
    function callback(error, response, body) {
      var info = JSON.parse(body);
      userData = info
      console.log('yo1')
      if (!error && response.statusCode == 200) {
        
        console.log('yo2')
        
        
      }
    }
    
    request(options, callback);

    res.render('index', {'code': code, 'userData': userData });
    
  })

  // GET route - Redirect to LL login
  app.get('/login', function(req,res){
    
    
    res.redirect('https://platform.lifelog.sonymobile.com/oauth/2/authorize?client_id=' + client_id + '&scope=lifelog.profile.read+lifelog.activities.read+lifelog.locations.read');
    
    
  });
}