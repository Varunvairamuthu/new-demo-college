const mongoose= require('mongoose');

const schoolSchema = new mongoose.Schema({
    name :{
        type:String,
        unique:[true],
        required:true,
        maxlength:[50]
    },
    rollno:{
        type:Number,
        required:true
    },
    dept:{
        type:String,
        required:true,
        enum:[
            'Mechanical',
            'Chemical',
            'electrical',
            'computer science',
            'electronics'
        ]
    },
    Subjectpass:{
        type:String,
        required:true
    },
    Subjectfail:{
        type:String,
        required:true
    },
    arrers:{
        type:String,
        required:true
    },
    sportsmarks:{
        type:Number,
        required:true
    },
    achademicmarks:{
        type:Number,
        required:true
    },
    bloodcategory:{
        type:String,
        required:true
    },
    Photo:{
        type:String,
        Default:'no-photo.jpg'
    },
    nativetown:{
        type:String,
        Default:false
    },
    place:{
        type:String,
        Default:false
    },
    phnumber:{
        type:String,
        Default:false
    },
    parentnumber:{
        type:String,
        Default:false
    },
   

},{timestamps:true});

module.exports= mongoose.model('school',schoolSchema);