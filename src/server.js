const express = require('express');
const app = express();
const cors = require('cors');

const todoRoutes = require('./routes/todo.routes');

const port = 3000 ;

app.use(cors());
app.use(express.json());

app.use('/todo',todoRoutes);

app.get('/',(req,res)=>{
    res.send('Welcome , But this is the Boiler Plate place only , use propoer routes!')
});

app.use((req,res)=>{
    res.status(404).send('Path not found!');
})

app.listen(port,()=>{
    console.log(`Todo app listening on ${port}!`);
});