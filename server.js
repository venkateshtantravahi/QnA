const path=require('path');
const http = require('http');
const express = require("express");
const socketio = require('socket.io');
const app = express();
const mongo= require('mongoose');
const router = express.Router();
const server = http.createServer(app);
const fastcsv = require("fast-csv");
const fs = require("fs");
const converter=require("json-2-csv");
const io = socketio(server);
const download = require("downloadjs");
app.use(express.static(path.join(__dirname, '/public/views')));
var name;
var question
mongo.connect('mongodb+srv://MindBenders:MindBenders123@cluster0.txfw7.mongodb.net/students?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true });  
var studentSchema = new mongo.Schema({  
    name: String,  
    Answer: String
});
var QuestionsSchema = new mongo.Schema({
    Question: String
});

QList = mongo.model(`Qlistas`, QuestionsSchema); 

io.on('connection', socket =>{
    
    
    socket.on('names',n=>{
        name=n;
        console.log(n);    
        io.emit('uname',n);
        socket.emit('uid',n);
    });
console.log(name);
});
var countno=0
var countyes=0
io.on('connection', sock=>{
    
    sock.emit('username',name);
    sock.on('question',hello=>{
        io.emit('QnA',hello);
        question = hello.msg;
        Student = mongo.model(`${question}`, studentSchema); 
        selected= hello.selectedValue
    });
    sock.on('results',back=>{
        var ListQ = new QList({  
            Question:`${question}`,  
        }); 
        //need to remove the redundants
        ListQ.save((err,questions) => {    
            if(err){     
                console.log('Something went wrong!');     
            }    
            else {      
                console.log("You added: " + questions);      
            }      
        });
      // var ws = fs.createWriteStre am(`${question}`+`.csv`);
        Student.find().then(function(data){
            console.log(data);
            // fastcsv
            //   .write(data., { headers: true })
            //   .on("finish", function() {
            //     console.log("file.csv successfully!");
            //   })
            //   .pipe(ws);
            // converter.json2csv(data, (err, csv) => {
            //     if (err) {
            //         throw err;s
            //     }
        
            if (selected!='Poll'){
            fs.writeFileSync(`files/${question}.txt`,`\n Question: ${question}\n\n -------------------------------------------------------------------------------------`)
            
            
            for(object in data){
                    console.log(data[object]                                                                                                                                                                                                    )
                    fs.appendFileSync(`files/${question}.txt`,`\n ${data[object].name}: ${data[object].Answer}\n`)
            }
    
                // print CSV string

                // download(`files/${question}.csv`)
               
                // router.get('/admin.html/', (req, res) => {
                //     res.download(`files/${question}.txt`);
                //     console.log('file sent');
                //     sock.emit('downloadIt','pls do');
                // });
            // });
            app.get(`/downloads`,function(req, res){
                res.download(`files/${question}.txt`)
                console.log('found ittttttttttttttttt');
                // res.download(`${question}.txt`);
                });
            sock.emit('downloadIt','fileLocation');
            }
            if(selected=='Poll'){
                console.log('inside else')
                countNo=0
                countYes=0
                for(objects in data){
                    if (data[objects].Answer=='No'){
                        countNo+=1;
                    }
                    else{
                        countYes+=1
                    }
                    
                }
                countno=countNo;
                countyes=countYes;
                console.log(countNo,countYes);
                sock.emit('showChart',{countNo,countYes});
                
            }
            
            
        });      
       
    });
    sock.on('pollResult',credits=>{
        // var text={
        //     name:credits.myName,
        //     Answer:credits.ans
        // };
        // mongo.connect(url,function(err,db){
        //     asert.equal(null,err);
        //     db.collection(`${credits.q}`).insertOne(text,function(err,result){
        //         asert.equal(null,err);
        //         console.log('item inserted');
        //         db.close();
        //     });
        // });
        var poll = new Student({  
            name:`${credits.myName}`,  
            Answer:`${credits.ans}`
        });  
        poll.save((err,student) => {    
            if(err){     
                console.log('Something went wrong!');     
            }    
            else {      
                console.log("You added: " + student);      
            }      
        });
        console.log(credits);    
    });
    sock.on('QnAResult',credentials=>{
        console.log(question);
        // var creds={
        //     name:credentials.myName,
        //     Answer:credentials.textAns
        // };
        // mongo.connect(url,function(err,db){
        //     asert.equal(null,err);
        //     db.collection(`${credentials.q}`).insertOne(creds,function(err,result){
        //         asert.equal(null,err);
        //         console.log('item inserted');
        //         db.close();
        //     });
        // });
        var desc = new Student({  
            name:`${credentials.myName}`,  
            Answer: `${credentials.textAns}`
        });
        desc.save((err,student) => {    
            if(err){     
                console.log('Something went wrong!');     
            }    
            else {      
                console.log("You added: " + student);      
            }      
        });
        console.log(credentials);
    });
    
});
io.on('connection', socket1=>{
    socket1.on('chartWindow',yo=>{
        console.log('its a frustration now');
        socket1.emit('sentToChart',{countNo,countYes,question});
    });
});

const PORT = process.env.PORT||3020;

server.listen(PORT, () => console.log(`server running on ${PORT}`));

 
