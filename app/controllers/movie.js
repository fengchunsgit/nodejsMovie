var _=require('underscore')
var Movie=require('../models/movie')

// detail
exports.detail=function(req,res){
  var id=req.params.id

  Movie.findById(id,function(err,movie){
    res.render('detail',{
      title:'详情'+movie.title,
      movie:movie
    })
  })
}

//admin
exports.new = function(req,res){
  console.log(req.url)
    res.render('admin',{
      title:'后台录入页面',
      movie:{
        title:'',
        doctor:'',
        country:'',
        year:'',
        poster:'',
        flash:'',
        summary:'',
        language:''
      }
    })
}

//admin post movie  /admin/movie/new
exports.save= function(req,res){
  var id=req.body.movie._id
  var movieObj=req.body.movie

  var _movie=new Movie()

  if(id !== 'undefined'){
    Movie.findById(id,function(err,movie){
      if(err){
        console.log(+err)
      }
      _movie=_.extend(movie,movieObj)
      _movie.save(function(err,movie){
        if(err){
          console.log(+err)
        }
        res.redirect('/movie/'+movie._id)
      })
    })
  }
  else{
    _movie=new Movie({
      doctor:movieObj.doctor,
      title:movieObj.title,
      language:movieObj.language,
      country:movieObj.country,
      summary:movieObj.summary,
      flash:movieObj.flash,
      poster:movieObj.poster,
      year:movieObj.year
    })
    _movie.save(function(err,movie){
      if(err){
        console.log(err)
      }
      res.redirect('/movie/'+movie._id)
    })
  }
}

//list  '/admin/list'
exports.list= function(req,res){

  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    res.render('list',{
      title:'movie 详情',
      movies:movies
    })
  })
}

//list delete '/admin/list'
exports.del= function(req,res){
  var id=req.query.id

  if(id){
    Movie.remove({_id:id},function(err,movie){
      if(err){
        console.log(err)
      }else{
        res.json({success:1})
      }
    })
  }
  
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    res.render('list',{
      title:'movie 详情',
      movies:movies
    })
  })
}

//admin update movie '/admin/update/:id'
exports.update= function(req,res){
  var id=req.params.id
  if(id){
    Movie.findById(id,function(err,movie){
      if(err){
        console.log(err)
      }
      res.render('admin',{
        title:'后台',
        movie:movie
      })
    })
  }
}
