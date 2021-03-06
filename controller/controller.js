const express=require("express");
const multer=require("multer");
const path=require("path");
const Employee=require("../model/schema"); 

const router=express.Router();






router.get('/',(req ,res )=>{
    res.render("add", {
        viewTitle: "Insert Employee"
    })


})
Storage = multer.diskStorage({
   
    destination: function (req, file, cb) {
        cb(null, './uploads')
      },
     filename: function (req, file, cb) {
       
        console.log(file.fieldname)
      cb(null, file.originalname+'_' + Date.now()+path.extname(file.originalname));
    }
    
  })
var upload = multer({ storage: Storage })
router.post('/employee',upload.single('avatar'),(req, res) => {
    
    if (req.body._id == '')
    
    insertRecord(req, res);
    else
    updateRecord(req, res);
})

 
  




function insertRecord(req, res) {
    var employee = new Employee();
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.phone = req.body.phone;
    employee.city = req.body.city;
    console.log(req.file)
    if(req.file)
    {
        console.log(req.file.filename)
        employee.image=req.file.filename;
    }
    else{
        employee.image=req.file; 
    }
   
        
    
    
    employee.save((err, doc) => {
        console.log(doc);
        
        if (!err)
            res.redirect('/Elist');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("add", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}
/*function insertRecord(req, res) {
    var em = new Employee(req.body);
    
    em.save(function(err)  {
        console.log(err);
        if (!err){
            res.redirect('/Elist');
        }
            
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("add", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}*/
  



function updateRecord(req, res) {
    console.log(req.body);
    Employee.findOneAndUpdate({ _id: req.body._id },  req.body,   { runValidators:true },   (err, doc) => {  
        if (!err) 
         { 
             res.redirect("/Elist")
          }
        else {
            if (err.name == 'ValidationError') {
                
                handleValidationError(err, req.body);
                res.render("add", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
            {
                console.log('Error during record update : ' + err);
      
            }
        }
    });
}

function handleValidationError(err, body) {
  
    
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameerror'] = err.errors[field].message;
                break;
            case 'email':
                body['emailerror'] = err.errors[field].message;
                break;

            case'image':
                body['imageeroor']=err.errors[field].message;
                break;
            default:
                 
                break;
        }
    }
  }

router.get('/update/:id',(req ,res )=>{
   
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("add", {
                viewTitle: "Update Employee",
                employee: doc
            })
        }
    }).lean()
  
  
})
  


router.get('/Elist',(req ,res )=>{
    
  Employee.find((err, doc) => {
      
    if (!err) {
        res.render("list", {
            list: doc
        });
    }
    else {
        console.log('Error in retrieving employee list :' + err);
    }
}).lean()


})

router.get("/delete/:id",(req,res)=>{

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/Elist');
        }
        else { console.log('Error in employee delete :' + err); }
    });

})













module.exports=router;