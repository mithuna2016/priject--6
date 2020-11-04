const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const sauces = require('./models/sauces');
const userRoutes = require('./routes/user');
const { response } = require("express");
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
  //app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  
  //get all sauces
  app.get('/api/sauces',(req,res,next)=>{
    sauces.find().then(
      (result) => {
        res.status(200).json(result);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );

  });
 


//get the sauces by id 

  app.get('/api/sauces/:id',(req,res,next)=>{
    sauces.findOne({
      _id: req.params.id
    }).then(
      (object) => {
        res.status(200).json(object);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );

  });

 
//add the new sauces
  
  app.post('/api/sauces',(req,res,next)=>{
    const sauce = new sauces({
      userId:req.body.userId,
      name: req.body.name,
      manufacturer:  req.body.manufacturer,
      description: req.body.description ,
      mainPepper: req.body. mainPepper ,
      imageUrl:  req.body.imageUrl,
      heat: req.body.heat,
      likes: req.body.likes,
      dislikes:req.body.dislikes,
      usersLikes: req.body.usersLikes,
      usersDislikes:req.body.usersDislikes,
      
      });
      /*res.status(201).json({
        message: sauce.name
      });*/
      sauce.save().then(
        () => {
          res.status(201).json({
            message: 'Post saved successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
  
  });

  //edit the sauces

  app.put('/api/sauces/:id',(req,res,next)=>{
    const sauce = new sauces({
      name: req.body.name,
      manufacturer:  req.body.manufacturer,
      description: req.body.description ,
      mainPepper: req.body. mainPepper ,
      imageUrl:  req.body.imageUrl
      
      });
    sauce.updateOne({_id: req.params.id}, thing).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );

  });

//delete the sauces

  app.delete('/api/sauces/:id',(req,res,next)=>{
    s.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

 
  
  app.post('/api/sauces/:id/like',(req,res,next)=>{

  });

  



  
  app.use('/api/auth', userRoutes);

module.exports=app;