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
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    var req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });

    req.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
    });

    // write data to request body
    req.write(postData);
    req.end();
    
  })
  app.get('/login', function(req,res){
    var client_id = '30c5b9a5-cda3-42b5-8340-884cd115042b';
    
    res.redirect('https://platform.lifelog.sonymobile.com/oauth/2/authorize?client_id=' + client_id + '&scope=lifelog.profile.read+lifelog.activities.read+lifelog.locations.read');
    
    
  });
}