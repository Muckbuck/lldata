module.exports = function(app){
  app.get('/', function(req,res){
    var code = req.query.code;
    res.render('index', {'code': code})
    
  })
  app.get('/login', function(req,res){
    var client_id = '30c5b9a5-cda3-42b5-8340-884cd115042b';
    res.redirect('https://platform.lifelog.sonymobile.com/oauth/2/authorize?client_id=' + client_id + '&scope=lifelog.profile.read+lifelog.activities.read+lifelog.locations.read');
    console.log(res)
    
  });
}