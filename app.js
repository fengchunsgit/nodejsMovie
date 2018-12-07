const express=require('express')
const app=express()

app.set('views','./views')
app.set('view engine','jade')
const port=3000
app.listen(port);



//index
app.get('/',function(req,res){
    console.log(req.url)
    res.render('index',{
      title:'首页'
    })
})

// detail
app.get('/movie/:id',function(req,res){
    res.render('detail',{
      title:'详情'
    })
})

//admin
app.get('/admin',function(req,res){
    res.render('admin',{
      title:'管理员'
    })
})

//list
app.get('/admin/list',function(req,res){
    res.render('list',{
      title:'列表'
    })
})
console.log('started at http://localhost:'+port)