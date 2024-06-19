const express = require("express");
const app = express();
const parser = require("body-parser");
const https = require("https");
app.use(express.static("public"));
app.use(parser.urlencoded({extended:true}));
const port = process.env.PORT || 3001;



app.get("/", function(req , res){
  res.sendFile(__dirname + "/signup.html")
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.post("/", function(req , res){
  const firstName = req.body.n1;
  const lastName = req.body.n2;
  const email = req.body.m1;

  const data = {
      members:[
          {
              email_address: email,
              status: "unsubscribed",
              merge_fields: {
                  FNAME: firstName,
                  LNAME: lastName
              }
          }
      ]
  };

  const jsonData = JSON.stringify(data);

  const url = "Your Api";

  const options = {
      method : "POST", 
      auth : "author name"
  }

  const request = https.request(url, options , function(response){

      if    (response.statusCode === 200){
          res.sendFile(__dirname + "/succes.html");
      }
      else{
          res.sendFile(__dirname + "/failure.html");
      }

      response.on("data" , function(data){
          console.log(JSON.parse(data));
      })  
  })
  request.write(jsonData);
  request.end();
})

app.post("/failure", function(req , res){
  res.redirect("/")
})
