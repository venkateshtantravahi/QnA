mongoose.connect('mongod://localhost:27017/students', { useNewUrlParser: true });  
var studentSchema = new mongoose.Schema({  
    name: String,  
    age:Number,  
    country:String  
});

var Student = mongoose.model("Student", studentSchema);  
var shashank = new Student({  
    name:"Shashank",  
    age:"21",  
    country:"India"  
});    

shashank.save((err,student) => {    
    if(err){     
        console.log('Something went wrong!');     
    }    
    else {      
        console.log("You added: " + student);      
    }      
});
// this is a redundant file not used in the project