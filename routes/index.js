var http = require('http')

module.exports = function(app){
  var client_id = '30c5b9a5-cda3-42b5-8340-884cd115042b';
  var client_secret = 'dblEOLzx43KGGALz2t0O9ryHgf8'
  app.get('/', function(req,res){
    var code = req.query.code;
    var postData = {
      'client_id': client_id,
      'client_secret': client_secret,
      'grant_type': 'refresh_token',
      'refresh_token': code
    }
    res.render('index', {'code': code})
    
    var options = {
      hostname: 'https://platform.lifelog.sonymobile.com',
      path: '/oauth/2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    var request = http.request(options, (response) => {
      console.log(`STATUS: ${response.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      response.on('end', () => {
        console.log('No more data in response.');
      });
    });

    request.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
    });

    // write data to request body
    request.write(postData);
    request.end();
    
  })
  app.get('/login', function(req,res){
    
    
    res.redirect('https://platform.lifelog.sonymobile.com/oauth/2/authorize?client_id=' + client_id + '&scope=lifelog.profile.read+lifelog.activities.read+lifelog.locations.read');
    console.log(res)
    
  });
}