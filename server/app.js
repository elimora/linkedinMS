const express=require('express'); 
const bodyParser = require('body-parser');
const mongoose=require('mongoose'); 
const morgan=require('morgan'); 
const cors=require('cors')
require('./model/Employee'); 


const productsRoutes=require('./routes/products.routes'); 
const authRoutes=require('./routes/auth.routes');
const micreateRoles = require('./libs/initialSetup');
const userRoutes=require('./routes/user.routes')


const app=express();

micreateRoles.createRoles; 




//inpoprtar variables de entorno 

app.use(cors())
app.use(express.json())
app.use(morgan('dev'));  

const Employee=mongoose.model("employee");


const mongoUri="mongodb+srv://cnq:6vnkYRVn1Ag20WC8@cluster0.d7l3l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}); 
let i =1; 
mongoose.connection.on("connected",()=>{
    console.log("Conectado a mongo beibi", i++)
})

mongoose.connection.on("error",(err)=>{
    console.log("Error de connmexion =( ", err)
})



app.get('/',async(req,res)=>{
    try {
        const allEmployees= await Employee.find({});
        console.log(allEmployees); 
        res.send(allEmployees); 
    } catch (error) {
        console.log('Se pretesento un error al traer a todos los empleados',error)
    }
}); 
app.post('/send-data', async(req,res)=>{

    try {
        const{ name,email,phone,picture,salary,position}=req.body
        const employee= new Employee({
            name,email,phone,picture,salary,position
        }) 
        const saveEmployee= await employee.save(); 
        console.log(saveEmployee); 
        res.send(saveEmployee); 
    } catch (error) {
        console.log('Se prtesento el siguiente error al agragar',error)
    }
});   

app.post('/delete',async (req,res)=>{
    try {
       const{id}=req.body; 
       const deleteEmployee= await Employee.findByIdAndRemove(id);
       console.log(deleteEmployee); 
       res.send(deleteEmployee); 
    } catch (error) {
        console.log('Se prtesento el siguiente error al borrar',error)
    }
}); 

app.post('/update', async(req,res)=>{
    try {
        const{id, name,email,phone,picture,salary,position}=req.body
   
       const updateEmployee= await Employee.findByIdAndUpdate(id,
          { name,email,phone,picture,salary,position}
       );
       console.log(updateEmployee); 
       res.send(updateEmployee);  
        
    } catch (error) {
        console.log('Se prtesento el siguiente error al actualizar',error)
    }
}); 

// seccion de rutas para la autenticacion y companias****
app.use('/api/products',productsRoutes); 
app.use('/api/auth',authRoutes); 
app.use('/api/users',userRoutes); 
// seccion de rutas para la autenticacion****

app.set('port',process.env.PORT || 3000)
app.listen(app.get('port'),()=>{
    console.log(`servidor en el puerto ${app.get('port')}`)
})

