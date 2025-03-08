const express = require('express');
const app = express();

const todoRoutes = require('./routes/todo.routes');

const port = 3000 ;

app.use(express.json());

app.use('/todo',todoRoutes);

app.get('/',(req,res)=>{
    res.send('Welcome , But this is the Boiler Plate place only , use propoer routes!')
});

app.listen(port,()=>{
    console.log(`Todo app listening on ${port}!`);
});