const express = require('express');
const app = express();

// const todoRoutes = require('./routes/todo.routes');

// const port = 3000 ;

// app.use(express.json());

// app.use('/todo',todoRoutes);

// app.get('/',(req,res)=>{
//     res.send('Welcome , But this is the Boiler Plate place only , use propoer routes!')
// });

// app.use((req,res)=>{
//     res.status(404).send('Path not found!');
// })

// app.listen(port,()=>{
//     console.log(`Todo app listening on ${port}!`);
// });

const port = 8080;

app.get('/',(req,res)=>{
    res.send('Welcome!');
})

app.listen(port,()=>{
    'Sever started!'
})