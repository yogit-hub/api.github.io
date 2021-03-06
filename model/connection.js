const mongoose=require("mongoose");

mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost:27017/dbemployee",{
useCreateIndex:true,
useNewUrlParser:true,
useUnifiedTopology:true
}).then(()=>{

console.log('Connection successful')

}).catch((error) =>{

console.log(error)

})