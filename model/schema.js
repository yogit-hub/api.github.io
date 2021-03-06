const mongoose = require("mongoose");
//const validator = require("validator");

const employeeschema = mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'

        
        

    },
    email: {
        type: String


       
    },
    phone: {
        type: Number
        

    },
    city: {
        type: String
       
    },
    image:{
       
        type: String,
        required:'This field is required'
    }
})



employeeschema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');







const Employee=mongoose.model("Employee",employeeschema);

module.exports=Employee;