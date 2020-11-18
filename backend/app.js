const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const { response } = require("express");
const path = require('path');
const app = express();

// connect with mongoose

mongoose.connect('mongodb+srv://mithunap-6:Sarasvin23@cluster0.jpm7k.mongodb.net/project-6?retryWrites=true&w=majority')
.then(()=>{
    console.log('successfully connected to mongo db atlass')
})
.catch((erro)=>{
    console.log('enable to connect to mongo db');
});

//to prevent CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
//connect with image folder
  app.use('/images', express.static(path.join(__dirname, 'images')));
 // app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  
 /* app.post('/api/sauces/:id/like',(req,res,next)=>{
    const like ={
      userId:req.body.userId,
      like:req.body.like

    }
  });
*/

  app.use('/api/sauces',saucesRoutes)
  app.use('/api/auth', userRoutes);

module.exports=app;