var express = require('express');
var bodyParser = require('body-parser');
var app = express.createServer();
var path = require('path');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username:String,
    password:String,
    email:String
});
var postSchema = mongoose.Schema({
    body:String,
    permalink:String,
    author:String,
    title:String,
    tags:[String],
    //comments:{type:String}  if so, the data extracted from mongo will show in wrong way like  "[object Object...]"
    //comments:String or you can just not define it, there will be no problem
    comments:[{body:String,
               email:String,
               author:String}]
});

var Post = mongoose.model('Post',postSchema);
var User = mongoose.model('User',userSchema);
mongoose.connect('localhost:27017/blog');

app.use(bodyParser.json());
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.use(express.static(path.join(__dirname, 'client'))); //***direct to index.html in client file

//=========displayMainPagePosts=======
app.get('/displayMainPagePosts', function(req,res){
    var query = Post.find().limit(10);
    query.exec(function(err,posts){
        if(err) throw err;
        res.send(posts);
    });
});


//=========getPostDetailsByPermalink============
app.get('/getPostDetailsByPermalink/:permalink', function(req,res){
    var permalink = req.params.permalink;
    Post.find({'permalink':permalink}, function(err, post){
        if(err) throw err;
        else{
            res.send(post);
        }
    });
});

//=========postComments===================
app.all('/postComments/:permalink',function(req,res){
    var permalink = req.params.permalink;
    var name = req.body.commentName;  //bodyParser
    var newcomment = req.body.commentBody;
    if(req.body.commentEmail==null) var email = '';
    else email =  req.body.commentEmail;
    var comment={'body':newcomment,'email':email,'author':name};
    Post.update({permalink:permalink}, {$push:{"comments":comment}}, function(err,modified){
         if(err) throw err;
         else
         console.log('modified: '+modified);
         res.send(200);
    });
});

//=========signin=======================
app.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({'username':username},function(err,data){
        if(err) throw err;
        if(!data) return res.status(401).send({ message: { username: 'Incorrect username' } });
        else if(data.password!=password) return res.status(401).send({message:{password:'Incorrect password'}});
        else res.send({username:username});
    });
    //====1
    //res.send({token:token, user: user});
    //in angularJS:$window.localStorage.currentUser = JSON.stringify(response.data.user);
    //$rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
    //====2
    //after check in db and compare the match
    //backend can start a session ('_id:hash,username:username') insert this session into db
    //then response it as cookie back to frontend, so front end can judge which username according to session _id
});




//=========signup========================
app.post('/signup',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var user = new User({
        "username":username,
        "password":password,
        "email":email
    });
    user.save(function(err){
        if(err) throw err;
        else {
            console.log('save new user');
            res.send(200);
        }
    });

});


app.listen('3031',function(){
    console.log('now is running at localhost:3031')
});