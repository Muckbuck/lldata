var http = require('http')
var request = require('request')

module.exports = function(app){
  var client_id = '30c5b9a5-cda3-42b5-8340-884cd115042b';
  var client_secret = 'dblEOLzx43KGGALz2t0O9ryHgf8'
  var responseData = null
  app.get('/', function(req,res){
    var code = req.query.code;
    var postData = {
      'client_id': client_id,
      'client_secret': client_secret,
      'grant_type': 'authorization_code',
      'code': code
    }
    request.post({url:'https://platform.lifelog.sonymobile.com/oauth/2/refresh_token', form: postData}, function(err,httpResponse,body){ console.log(httpResponse); responseData += JSON.stringify(httpResponse); })
  
    res.render('index', {'code': code, 'responseData': responseData })
    
  })
  app.get('/login', function(req,res){
    
    
    res.redirect('https://platform.lifelog.sonymobile.com/oauth/2/authorize?client_id=' + client_id + '&scope=lifelog.profile.read+lifelog.activities.read+lifelog.locations.read');
    console.log(res)
    
  });
}