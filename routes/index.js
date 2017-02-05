var http = require('http')

module.exports = function(app){
  app.get('/', function(req,res){
    
    res.render('index', {'code': code})
    var code = req.query.code;
    var options = {
      hostname: 'https://platform.lifelog.sonymobile.com',
      path: '/oauth/2/token',
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
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
    
    request.end();
    
  })
  app.get('/login', function(req,res){
    var client_id = '30c5b9a5-cda3-42b5-8340-884cd115042b';
    
    res.redirect('https://platform.lifelog.sonymobile.com/oauth/2/authorize?client_id=' + client_id + '&scope=lifelog.profile.read+lifelog.activities.read+lifelog.locations.read');
    console.log(res)
    
  });
}