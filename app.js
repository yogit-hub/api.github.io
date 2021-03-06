require("./model/connection");
const express =require("express");
const path=require("path");
const exphbs=require("express-handlebars");
const controller=require("./controller/controller");
const Employee=require("./model/schema"); 

const app=express();
const PORT = process.env.PORT || 3600;
app.use(express.urlencoded({ extended: false }))


const staticpath = path.join(__dirname, "./uploads");
app.use(express.static(staticpath));




app.use(controller);
app.set('views', path.join(__dirname, '/views/employee'));

app.engine('hbs', exphbs({ extname: 'hbs', helpers:__dirname +'/views/employee', defaultLayout: 'mainlayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');




app.listen(PORT,() =>{
console.log("server run  on port " +PORT);
})