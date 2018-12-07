const express=require('express')
const app=express()
var path=require('path')
var bodyParser = require('body-parser')

app.set('views','./views/pages')
app.set('view engine','jade')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname,'bower_components/')))
app.use('/static',express.static('static'))
const port=3000
app.listen(port);



//index
app.get('/',function(req,res){
    console.log(req.url)
    res.render('index',{
      title:'首页',
      movies:[{
        title:'机械战警',
        _id:1,
        poster:'http://img31.mtime.cn/pi/2013/12/13/112514.36500695_1000X1000.jpg'
      },
    {
      title:'毒液',
      _id:2,
      poster:"http://img5.mtime.cn/pi/2018/09/12/144840.54226859_1000X1000.jpg"
    }]
    })
})

// detail
app.get('/movie/:id',function(req,res){
  console.log(req.url)
    res.render('detail',{
      title:'详情',
      movie:{
        title:'机械战警',
        doctor:'何塞',
        country:'美国',
        year:2014,
        poster:'http://img31.mtime.cn/pi/2013/12/13/112514.36500695_1000X1000.jpg',
        flash:'http://112.25.17.171/6777B53ACBA33762CB4BC5323/030020010053F2F2D4A99F1903B9EDBFDE05C9-3649-F6C2-B592-18F27851DA7B.mp4?ccode=0502&duration=272&expire=18000&psid=7c8f60eaa7ecc69154870addfc8e0e91&ups_client_netip=b7c7257e&ups_ts=1544183921&ups_userid=&utid=iL65EFd3MjMCARu6pMNCkshw&vid=XNzU4MTIxNzI4&vkey=Aeb9de3a8a95be524af62a229cddd37e4&sp=',
        summary:'毒液金句: 埃迪，你的身体，你的一切都是我的！ 埃迪，我开始有点喜欢你了！ 埃迪你敢说我是寄生虫，道歉！快向我道歉！ 埃迪，我这么做都是因为你',
        language:'英语'
      }
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

//list
app.get('/admin/list',function(req,res){
  console.log(req.url)
    res.render('list',{
      title:'列表',
      movies:[{
        title:'机械战警',
        _id:1,
        doctor:"何塞",
        country:"美国",
        year:2014,
        language:"英语",
        flash:"https://www.bilibili.com/video/av35613192/"
      }]
    })
})
console.log('started at http://localhost:'+port)