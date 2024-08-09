const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const https = require('https');
const { METHODS } = require('http');
const { log } = require('console');

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}))



app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
});
app.post("/", function(req,res){
    var name = req.body.FName;
    var lastname = req.body.LName;
    var Email = req.body.email;
//// BELOW IS THE Javascript object
    var data = {
        /// members is an array of objects
        members:[
            {
                email_address : Email,
                status : "subscribed",
                merge_fields: {
                    FNAME : name,
                    LNAME : lastname
                }
                
            }
        ]
    };
    //// now to stringify

    app.post("/faliure", function(req,res){
        res.redirect("/");
    })

    var stringedData = JSON.stringify(data);
    

    const url = "https://us13.api.mailchimp.com/3.0/lists/e07698743 ";
    const options ={
        method: "POST",
        auth: "Tanunurwa:a316aca817e9757bd20b4be1700a1333-us13"
    } ;
   const request = https.request(url, options ,function(response){
    if (response.statusCode === 200 ) {
        res.sendFile(__dirname + "/success.html")
    }
    else{
        res.sendFile(__dirname + "/faliure.html");
    };
        response.on("data",function(data){
        console.log(JSON.parse(data))})
        
    })
    request.write(stringedData);
    request.end();
});
app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port @Port: 3000");
});

/// api key    a316aca817e9757bd20b4be1700a1333-us13


/// audience id or list_id      e076987432