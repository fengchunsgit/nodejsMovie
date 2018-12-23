var Movie=require('../models/movie')

//index
exports.index=function(req,res){
  var _user=req.session.user
  if(_user){
    //app.locals.user=_user
  }
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    res.render('index',{
      title:'movie 首页',
      movies:movies
    })
  })
}