const express=require('express')
const app=express()
var path=require('path')
var bodyParser = require('body-parser')
var mongoose=require('mongoose')
var _=require('underscore')
var Movie=require('./models/movie')
DB_URL = 'mongodb://localhost:12345/imooc';

mongoose.connect(DB_URL);

app.set('views','./views/pages')
app.set('view engine','jade')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname,'public/')))
app.use('/static',express.static('static'))
app.locals.moment=require('moment')
const port=3000
app.listen(port);



//index
app.get('/',function(req,res){
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    res.render('index',{
      title:'movie 首页',
      movies:movies
    })
  })
      // {
      //   title:'毒液',
      //   _id:2,
      //   poster:"http://img5.mtime.cn/pi/2018/09/12/144840.54226859_1000X1000.jpg"
      // }]
      // })
})

// detail
app.get('/movie/:id',function(req,res){
  var id=req.params.id

  Movie.findById(id,function(err,movie){
    res.render('detail',{
      title:'详情'+movie.title,
      movie:movie
    })
  })
})

//admin
app.get('/admin',function(req,res){
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
})

//admin post movie
app.post('/admin/movie/new',function(req,res){
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
})

//list
app.get('/admin/list',function(req,res){

  Movie.fetch(function(err,movies){
    if(err){
      console.log(err)
    }
    res.render('list',{
      title:'movie 详情',
      movies:movies
    })
  })
})

//list delete
app.delete('/admin/list',function(req,res){
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
})

//admin update movie
app.get('/admin/update/:id',function(req,res){
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
})

console.log('started at http://localhost:'+port)

