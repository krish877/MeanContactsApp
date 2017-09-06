var express = require('express');
var app = express();
var mongo = require('mongojs');
var db = mongo('contactListApp',['contacts']);
var bodyParser = require('body-parser');

/*
app.get('/index/', function (req,res) {
	res.send('yes iam in');
});*/
app.use(express.static(__dirname+'/uifiles'));
app.use(bodyParser.json());

app.get('/contacts',function(req,res){
console.log('Received a get request');
db.contacts.find(function(err,docs){
console.log('received data from DB');
console.log(docs);
res.json(docs);
})
});

app.post('/contacts/',function(req,res){
console.log(req.body);
db.contacts.insert(req.body, function(err,docs){
  res.json(docs);
});
});

app.delete('/contacts/:id',function(req,res){
console.log(req.params.id);
db.contacts.remove({_id:mongo.ObjectId(req.params.id)},function(err,docs){
 res.json(docs);
});
})

app.get('/contacts/:id',function(req,res){
console.log(req.params.id);
db.contacts.findOne({_id:mongo.ObjectId(req.params.id)},function(err,docs){
 res.json(docs);
});
})

app.put('/contacts/:id',function(req,res){
console.log(req.params.id);
db.contacts.update({_id:mongo.ObjectId(req.params.id)},{$set:{'name':req.body.name,'number':req.body.number,'email':req.body.email}},function(err,docs){
   res.json(docs);
});
})

app.listen(1111);
console.log('node server started');