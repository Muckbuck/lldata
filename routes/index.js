module.exports = function(app){
  app.get('/', function(req,res){
    var code = req.params.code;
    res.render('index', {'code': code})
    
  })
  app.get('/login', function(req,res){
    var client_id = '3589cfb4-67ae-4bca-aa6a-bf9b45ae371a';
    res.redirect('https://platform.lifelog.sonymobile.com/oauth/2/authorize?client_id=' + client_id + '&scope=lifelog.activities.read');
    console.log(res)
    
  });
}