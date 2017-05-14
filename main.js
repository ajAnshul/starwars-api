var express = require('express');
var app = express();
var request = require('request');


function getStarWarsApiData(type,id){
  return new Promise(function(resolve,reject){
    var url = 'http://swapi.co/api/'+type+'/'+id;
    request(url, function (error, response, body) {
     if(error){
       reject(error);
     }
     if (!error && response.statusCode == 200) {
       resolve(body);
     } else{
       var msg = response.statusCode + " NOT FOUND";
       reject(msg);
     }
    })
  })
}

app.get("/api/findRiders",function(req,res){
  getStarWarsApiData(req.query.type,req.query.id).then(
  function(data){
    res.send(data);
  },
  function(error){
    res.send(error);
  })
});
app.listen(8080,function(){
  console.log("app is listening at 8080");
})
